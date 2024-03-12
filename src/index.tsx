import React from "react";
import { createRoot } from "react-dom/client";

import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";

import "./styles/index.scss";
import "@vkontakte/vkui/dist/vkui.css";

import { App } from "./App";
// import "./styles/index.scss";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
