import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "./HomeLayout";
import GetStartedPage from "./GetStartedPage";
import DocumentsPage from "./Documents/DocumentsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<HomeLayout />}>
      <Route path="/main_window" element={<GetStartedPage />} />
      <Route path="/documents/:courseId" element={<DocumentsPage />} />
    </Route>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
