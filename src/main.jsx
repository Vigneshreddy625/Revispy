import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/Store/Store.js";
import { AuthProvider } from "./authContext/useAuth.jsx";
import { ThemeProvider } from "./components/Darkmode/Theme-provider.jsx";

import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
