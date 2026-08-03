import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";

document
  .querySelectorAll("[data-react-section]")
  .forEach((element) => {
    const config = JSON.parse(element.dataset.config);
    window.selectedCountry = config.settings.country;

    createRoot(element).render(
      <App config={config} />
    );
  });