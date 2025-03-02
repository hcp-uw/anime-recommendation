import * as Sentry from "@sentry/react";
import cookie from "cookie";

import { OpenAPI } from "./api";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from "./Layout";
import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";
import AboutUs from "./pages/AboutUs";

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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recs" element={<Recommendations />} />
          <Route path="about" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Sentry.ErrorBoundary>
);

export default App;
