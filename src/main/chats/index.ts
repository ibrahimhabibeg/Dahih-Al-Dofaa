import { ipcMain } from "electron";
import ChatsManager from "./chatsManager";
import ChatDB from "./chatDB";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";
import { getHost } from "../ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";
import VectorDB from "../documents/vectorDB";

ipcMain.handle("chat:get", async (event, courseId: string) => {
  const chatManager = ChatsManager.getInistance(courseId);
  return chatManager.getChats();
});

ipcMain.handle(
  "chat:add",
  async (event, courseId: string, chatName?: string) => {
    const chatManager = ChatsManager.getInistance(courseId);
    return chatManager.addChat(chatName);
  }
);

ipcMain.handle(
  "chat:remove",
  async (event, courseId: string, chatId: string) => {
    const chatManager = ChatsManager.getInistance(courseId);
    return chatManager.removeChat(chatId);
  }
);

ipcMain.handle(
  "chat:getMessages",
  async (event, courseId: string, chatId: string) => {
    const chatDB = ChatDB.getInstance(courseId, chatId);
    return chatDB.getMessages();
  }
);

ipcMain.handle(
  "chat:message",
  async (event, courseId: string, chatId: string, question: string) => {
    const chatDB = ChatDB.getInstance(courseId, chatId);
    const chatHistory = chatDB
      .getMessages()
      .map((message) =>
        message.sender === "human"
          ? new HumanMessage(message.content)
          : new AIMessage(message.content)
      );
    const llm = new ChatOllama({
      model: "llama3",
      baseUrl: getHost(),
    });
    
    let contextualizedQuestion = question;
    if (chatHistory.length > 0)
      contextualizedQuestion = await contextualizeQuestion(
        contextualizedQuestion,
        chatHistory,
        llm
      );

    const vectorDB = await VectorDB.getInstance(courseId);
    const documents = await vectorDB.search(contextualizedQuestion);

    const answer = await respondToQuestion(
      question,
      documents.map((doc) => doc.text),
      chatHistory,
      llm
    );

    chatDB.addMessage(question, "human");
    chatDB.addMessage(answer, "bot");
    return answer;
  }
);

const contextualizeQuestion = async (
  question: string,
  chatHistory: (HumanMessage | AIMessage)[],
  llm: ChatOllama
): Promise<string> => {
  const systemPrompt = `Given a chat history and the latest user question
which might reference context in the chat history, formulate a standalone question
which can be understood without the chat history. Do NOT answer the question,
just reformulate it if needed and otherwise return it as is.`;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    new MessagesPlaceholder("chatHistory"),
    ["human", question],
  ]);

  const chain = prompt.pipe(llm).pipe(new StringOutputParser());

  return chain.invoke({
    chatHistory,
    question,
  });
};

const respondToQuestion = async (
  question: string,
  documents: string[],
  chatHistory: (HumanMessage | AIMessage)[],
  llm: ChatOllama
) => {
  const systemPrompt = `You are an assistant for question-answering tasks.
  Use the following pieces of retrieved context to answer the question.
  If you don't know the answer, just say that you don't know.
  Use three sentences maximum and keep the answer concise.

  {context}`;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    new MessagesPlaceholder("chatHistory"),
    ["human", question],
  ]);

  const chain = prompt.pipe(llm).pipe(new StringOutputParser());

  return chain.invoke({
    question,
    context: documents.join("\n\n"),
    chatHistory,
  });
};
