import MessageDB from "./messageDB";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";
import loadingMessage from "./loadingMessages";
import { notifyPartialMessage } from "./messageNotifier";
import { getLLM } from "../model";
import { getOllamaHost } from "../ollama";
import { searchExcerpts } from "../documents";

const sendMessage = async (
  courseId: string,
  chatId: string,
  message: string
) => {
  const messageDB = MessageDB.getInstance(courseId, chatId);
  messageDB.addMessage(message, "human");
  loadingMessage.addLoadingMessageChat(courseId, chatId);

  const chatHistory = messageDB
    .getMessages()
    .map((message) =>
      message.sender === "human"
        ? new HumanMessage(sanitize(message.content))
        : new AIMessage(sanitize(message.content))
    );
  const model = await getLLM();
  const llm = new ChatOllama({
    model,
    baseUrl: getOllamaHost(),
  });

  let contextualizedQuestion = message;
  if (chatHistory.length > 0)
    contextualizedQuestion = await contextualizeQuestion(
      sanitize(contextualizedQuestion),
      chatHistory,
      llm
    );

  const excerpts = await searchExcerpts(contextualizedQuestion, courseId);

  const stream = await respondToQuestion(
    sanitize(message),
    excerpts.map((excerpt) => sanitize(excerpt.text)),
    chatHistory,
    llm
  );

  let answer = "";
  for await (const chunk of stream) {
    answer += chunk;
    notifyPartialMessage(courseId, chatId, answer);
  }
  notifyPartialMessage(courseId, chatId, "");
  messageDB.addMessage(
    answer,
    "bot",
    excerpts.map((excerpt) => ({
      text: excerpt.text,
      documentTitle: excerpt.documentTitle,
    }))
  );
  loadingMessage.removeLoadingMessageChat(courseId, chatId);
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
  const systemPrompt =
    documents.length > 0 ? promptWithContext : promptWithoutContext;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    new MessagesPlaceholder("chatHistory"),
    ["human", question],
  ]);

  const chain = prompt.pipe(llm).pipe(new StringOutputParser());

  const data =
    documents.length > 0
      ? { question, chatHistory, context: documents.join("\n") }
      : { question, chatHistory };

  return chain.stream(data);
};

export default sendMessage;

const promptWithContext = `You're name is 'Dahih Al-Dofaa' which is arabic for
the smartest student in class. You are an A+ student at the university and you are so smart
you can answer any university related. question. You are given a conversation between you and
one of your classmates related to university topics. You extracted the following context from
your professor's lecture notes. You should answer your classmate's question from this context.
Keep your answer clear, concise, and to the point.

Context:
{context}`;

const promptWithoutContext = `You're name is 'Dahih Al-Dofaa' which is arabic for
the smartest student in class. You are an A+ student at the university and you are so smart
you can answer any university related. question. You are given a conversation between you and
one of your classmates related to university topics. You should answer your classmate's question
as best as you can. Keep your answer clear, concise, and to the point.`;

const sanitize = (text: string) => {
  return text.replace(/{/g, "{{").replace(/}/g, "}}");
};
