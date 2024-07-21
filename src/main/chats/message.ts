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
import chatSubscription from "./chatSubscription";

const message = async (
  event: Electron.IpcMainInvokeEvent,
  courseId: string,
  chatId: string,
  question: string
) => {
  chatSubscription.addLoadingMessageChat(chatId);
  const chatDB = ChatDB.getInstance(courseId, chatId);
  chatDB.addMessage(question, "human");

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

  chatDB.addMessage(answer, "bot");
  chatSubscription.removeLoadingMessageChat(chatId);
  chatSubscription.notifyChatMessage(chatId, {
    content: answer,
    sender: "bot",
  });
};

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

export default message;
