import { createRoot } from "react-dom/client";

import AdminPanelGate from "./components/AdminPanelGate";
import { ContentProvider } from "./content/store";
import "./styles.css";

const rootElement = document.getElementById("admin-root");

if (!rootElement) {
  throw new Error("Admin root element was not found");
}

createRoot(rootElement).render(
  <ContentProvider>
    <AdminPanelGate />
  </ContentProvider>,
);