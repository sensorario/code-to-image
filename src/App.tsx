import { ChangeEvent, useEffect, useState } from "react";
import { handleDownloadImage } from "./utils/handleDownloadImage";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github.css";
import Actions from "./Actions";
import HighlightedCode from "./HighlightedCode";
import UserInput from "./UserInput";
import Button from "sensorario-design-system/Button";

const languages = ["javascript", "bash", "css"] as const;

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("css", css);

const App = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [rawCode, setCode] = useState("");
  const [code, setHighlightedCode] = useState<string>("");
  const handler = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setCode(event?.target.value);
  };

  useEffect(() => {
    const options = { language };
    const stringa = hljs.highlight(rawCode, options).value;
    setHighlightedCode(stringa);
  }, [language, rawCode]);

  const headerHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const languageSelectionHandler = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    if (selectedLanguage === "bash") setTitle("> Terminale");
  };

  return (
    <div className="sensorario-container light">
      <div className="title-bar">
        <h1>code2image</h1>
      </div>
      <div className="page">
        <div className="container">
          <div className="selection">
            {languages.map((languageOption) => (
              <Button
                key={languageOption}
                type="button"
                className={language === languageOption ? "is-active" : ""}
                onClick={() => languageSelectionHandler(languageOption)}
              >
                {languageOption}
              </Button>
            ))}
          </div>
          <input type="text" onChange={headerHandler} value={title} />
          <UserInput onChange={handler} rawCode={rawCode} />
          <HighlightedCode code={code} title={title} />
          <Actions handler={handleDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default App;
