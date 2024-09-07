import { ChangeEventHandler, useEffect, useState } from "react";
import { handleDownloadImage } from "./utils/download";

import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import RenderActions from "./RenderActions";
import RenderHighlightedCode from "./RenderHighlightedCode";

const App = () => {
  const [rawCode, setCode] = useState("");
  const [code, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    const stringa = hljs.highlight(rawCode, {
      language: "javascript",
    }).value;
    setHighlightedCode(stringa);
  }, [rawCode]);

  type RendereInputCodeProp = {
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
  };

  const RendereInputCode = ({ onChange }: RendereInputCodeProp) => {
    return (
      <div className="the-code">
        <textarea
          onChange={onChange}
          value={rawCode}
          placeholder="Write your code here..."
          rows={10}
        />
      </div>
    );
  };

  return (
    <div className="sensorario-container light">
      <div className="title-bar">
        <h1>code2image</h1>
      </div>
      <div className="page">
        <div className="container">
          <RendereInputCode
            onChange={function (event): void {
              setCode(event?.target.value);
            }}
          />
          <RenderHighlightedCode code={code} />
          <RenderActions handler={handleDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default App;
