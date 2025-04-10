import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme/theme.js";
import { Notifications } from "@mantine/notifications";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    <Notifications />
    <Analytics />
    <App />
  </MantineProvider>
);
