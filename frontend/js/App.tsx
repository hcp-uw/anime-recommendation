import * as Sentry from "@sentry/react";
import cookie from "cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { OpenAPI } from "./api";
import Layout from "./Layout";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";

OpenAPI.interceptors.request.use((request) => {
  const { csrftoken } = cookie.parse(document.cookie);
  if (request.headers && csrftoken) {
    request.headers["X-CSRFTOKEN"] = csrftoken;
  }
  return request;
});

const App = () => (
  <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} index />
          <Route element={<Recommendations />} path="recs" />
          <Route element={<AboutUs />} path="about" />
        </Route>
      </Routes>
    </BrowserRouter>
  </Sentry.ErrorBoundary>
);

export default App;
