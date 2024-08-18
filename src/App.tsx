import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Puoi scegliere altri stili disponibili

const App = () => {
  const [rawCode, setCode] = useState("");
  const handleDownloadImage = async () => {
    const element: HTMLElement | null = document.querySelector(
      ".language-javascript"
    );

    const canvas = await html2canvas(element!);
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

  const [highlightedCode, setH] = useState<string>("");

  useEffect(() => {
    const stringa = hljs.highlight(rawCode!, {
      language: "javascript",
    }).value;
    setH(stringa);
  }, [rawCode]);

  function HtmlToReact({ htmlString }: { htmlString: string }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  }

  return (
    <div className="sensorario-container light">
      <h1>code2image</h1>
      <div className="container">
        <div className="the-code">
          <textarea
            onChange={(event) => {
              setCode(event.target.value);
            }}
            value={rawCode}
            placeholder="Write your code here..."
            rows={10}
            cols={50}
          />
        </div>
        <div className="code-output">
          <pre>
            <code className="language-javascript">
              <HtmlToReact htmlString={highlightedCode} />
            </code>
          </pre>
        </div>
      </div>
      <button onClick={handleDownloadImage}>press me</button>
    </div>
  );
};

export default App;
