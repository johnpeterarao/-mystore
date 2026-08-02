import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.jsx";


const rootElement = document.getElementById(
  "lookbook-root"
);

if (rootElement) {
  createRoot(rootElement)
    .render(
      <App />
    );
}