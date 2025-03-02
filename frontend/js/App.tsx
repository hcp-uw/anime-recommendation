import * as Sentry from "@sentry/react";
import cookie from "cookie";

import { OpenAPI } from "./api";
import { Routes, Route } from 'react-router-dom';

import Navbar from "./components/navbar/Navbar"
import Home from "./pages/Home";

OpenAPI.interceptors.request.use((request) => {
  const { csrftoken } = cookie.parse(document.cookie);
  if (request.headers && csrftoken) {
    request.headers["X-CSRFTOKEN"] = csrftoken;
  }
  return request;
});

const App = () => (
  <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
    <Navbar />
    <Home />
  </Sentry.ErrorBoundary>
);

export default App;
