import { ChangeEvent, useEffect, useState } from "react";
import { handleDownloadImage } from "./utils/handleDownloadImage";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import Actions from "./Actions";
import HighlightedCode from "./HighlightedCode";
import UserInput from "./UserInput";

const languages = ["javascript", "bash", "css"] as const;

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
              <button
                key={languageOption}
                type="button"
                className={language === languageOption ? "is-active" : ""}
                onClick={() => languageSelectionHandler(languageOption)}
              >
                {languageOption}
              </button>
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
