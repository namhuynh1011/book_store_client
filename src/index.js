import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouterCustom from "./pages/router";
import "./style/style.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ReactSession } from "react-client-session";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

ReactSession.setStoreType("sessionStorage");

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RouterCustom />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
