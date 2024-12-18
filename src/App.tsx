import { useEffect, useState } from "react";
import { handleDownloadImage } from "./utils/handleDownloadImage";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import Actions from "./Actions";
import HighlightedCode from "./HighlightedCode";
import UserInput from "./UserInput";

const App = () => {
  const [title, setTitle] = useState("");
  const [rawCode, setCode] = useState("");
  const [code, setHighlightedCode] = useState<string>("");
  const handler = (event: { target: { value: string } }): void => {
    setCode(event?.target.value);
  };

  useEffect(() => {
    const options = { language: "javascript" };
    const stringa = hljs.highlight(rawCode, options).value;
    setHighlightedCode(stringa);
  }, [rawCode]);

  const theHanler = event => {
    setTitle(event.target.value)
  };

  return (
    <div className="sensorario-container light">
      <div className="title-bar">
        <h1>code2image</h1>
      </div>
      <div className="page">
        <div className="container">
          <input type="text" onChange={theHanler} />
          <UserInput onChange={handler} rawCode={rawCode} />
          <HighlightedCode code={code} title={title} />
          <Actions handler={handleDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default App;
