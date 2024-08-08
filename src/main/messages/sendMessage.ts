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
import Logger from "electron-log";

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
    )
    .slice(-8);
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
    excerpts,
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
  Logger.info(`Contextualizing question: ${question}`);
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
  const start = Date.now();
  const contextualizedQuestion = await chain.invoke({
    chatHistory,
    question,
  });
  const end = Date.now();
  Logger.info(`Contextualization took ${end - start}ms`);
  Logger.info(`Contextualized question: ${contextualizedQuestion}`);
  Logger.info();
  return contextualizedQuestion;
};

const respondToQuestion = async (
  question: string,
  excerpts: Excerpt[],
  chatHistory: (HumanMessage | AIMessage)[],
  llm: ChatOllama
) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    new MessagesPlaceholder("chatHistory"),
    ["human", question],
  ]);

  const chain = prompt.pipe(llm).pipe(new StringOutputParser());
  const context = excerpts
    .map(
      (excerpt) =>
        `Document Title: ${excerpt.documentTitle}\nExcerpt:${excerpt.text}`
    )
    .join("\n\n");

  return chain.stream({
    question: sanitize(question),
    chatHistory,
    context: sanitize(context),
  });
};

export default sendMessage;

const systemPrompt = `You're name is 'Dahih Al-Dofaa' which is arabic for
the smartest student in class. You are given a conversation between you and
one of your classmates related to university studies. Your classmate provided you
with multiple documents prior to the conversation which he may refrence. Your task 
is to answer the questions asked by your classmate based on the conversation and the documents.
You won't be given the full documents, but you will be given important excerpts 
from the documents to help you answer the questions. If you find the excerpts irrelevant,
you can ignore them. Your answers should be concise and to the point. 
If you don't know the answer, say you don't know.

Excerpts:
{context}`;

const sanitize = (text: string) => {
  return text.replace(/{/g, "{{").replace(/}/g, "}}");
};
