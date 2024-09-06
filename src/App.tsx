import { useEffect, useState } from "react";
import { HtmlToReact } from "./utils/html2canvas";
import { handleDownloadImage } from "./utils/download";

import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const App = () => {
  const [rawCode, setCode] = useState("");
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    const stringa = hljs.highlight(rawCode, {
      language: "javascript",
    }).value;
    setHighlightedCode(stringa);
  }, [rawCode]);

  const RenderHighlightedCode = (highlightedCode: string) => {
    return (
      highlightedCode && (
        <div className="wrapper">
          <div className="code-output">
            <div className="header">JavaScript</div>
            <pre>
              <code className="language-javascript">
                <HtmlToReact htmlString={highlightedCode} />
              </code>
            </pre>
            <div className="tag">
              https://github.com/sensorario/code-to-image
            </div>
          </div>
        </div>
      )
    );
  };

  const renderInputCode = () => {
    return (
      <div className="the-code">
        <textarea
          onChange={(event) => {
            setCode(event.target.value);
          }}
          value={rawCode}
          placeholder="Write your code here..."
          rows={10}
        />
      </div>
    );
  };

  const renderActions = () => {
    return (
      <div className="render-actions">
        <button onClick={handleDownloadImage}>download code</button>
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
          {renderInputCode()}
          {RenderHighlightedCode(highlightedCode)}
          {renderActions()}
        </div>
      </div>
    </div>
  );
};

export default App;
