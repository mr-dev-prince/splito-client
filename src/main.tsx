import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CLERK_PUBLISHABLE_KEY } from "./lib/env-exports.ts";
import { ClerkProvider } from "@clerk/clerk-react";
import { ClerkTokenProvider } from "./lib/token-provider.ts";
import { store } from "./redux/store";
import { Provider } from "react-redux";

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ClerkTokenProvider>
        <App />
      </ClerkTokenProvider>
    </ClerkProvider>
  </Provider>,
);
