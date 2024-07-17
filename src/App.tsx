import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Puoi scegliere altri stili disponibili

const App = () => {
  const [code, setCode] = useState("");
  const printRef = React.useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  useEffect(() => {
    hljs.highlightBlock(printRef.current);
  }, [code]);

  return (
    <div className="sensorario-container light">
      <h1>code2image</h1>
      <div className="the-code">
        <textarea
          onChange={(event) => {
            setCode(event.target.value);
          }}
          value={code}
          placeholder="Write your code here..."
          rows={10}
          cols={50}
        />
      </div>
      <div className="code-output">
        <pre>
          <code ref={printRef} className="language-javascript">
            {code}
          </code>
        </pre>
      </div>
      <button onClick={handleDownloadImage}>press me</button>
    </div>
  );
};

export default App;
