/* eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable  @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line @typescript-eslint/no-floating-promises
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.css";
// eslint-disable-next-line @typescript-eslint/no-floating-promises

// eslint-disable-next-line
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
