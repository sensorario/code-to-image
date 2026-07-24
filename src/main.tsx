import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "sensorario-design-system/style/index.css";
import "../node_modules/@sensorario/sg-components/dist/sg-components.css";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
