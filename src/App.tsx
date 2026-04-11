import { useState } from "react";
import { handleDownloadImage } from "./utils/handleDownloadImage";
import "highlight.js/styles/github.css";
import Actions from "./Actions";
import HighlightedCode from "./HighlightedCode";
import "sensorario-design-system/style/index.css";
import Button from "sensorario-design-system/Button";

const languages = ["javascript", "bash", "css"] as const;

const App = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [rawCode, setCode] = useState("");

  const codeChangeHandler = (value: string): void => {
    setCode(value);
  };

  const titleChangeHandler = (value: string): void => {
    setTitle(value);
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
          <HighlightedCode
            rawCode={rawCode}
            title={title}
            onCodeChange={codeChangeHandler}
            onTitleChange={titleChangeHandler}
          />
          <Actions handler={handleDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default App;
