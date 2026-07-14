import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <App />
        <Toaster position="bottom-right" richColors closeButton />
      </BrowserRouter>
    </StrictMode>
  </Provider>,
);
