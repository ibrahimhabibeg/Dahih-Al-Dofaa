import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomeLayout from "./HomeLayout";
import GetStartedPage from "./GetStartedPage";
import DocumentsPage from "./Documents/DocumentsPage";
import Chat from "./Chat/Chat";
import Settings from "./Settings/Settings";
import LLMSelection from "./Settings/modelSelection/LLMSelection";
import EmbeddingsSelection from "./Settings/modelSelection/EmbeddingsSelection";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<HomeLayout />}>
      <Route path="/main_window" element={<GetStartedPage />} />
      <Route path="/documents/:courseId" element={<DocumentsPage />} />
      <Route path="/chat/:courseId/:chatId" element={<Chat />} />
      <Route path="/settings/llm" element={<LLMSelection />} />
      <Route path="/settings/embeddings" element={<EmbeddingsSelection />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/main_window" replace={true} />} />
    </Route>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
