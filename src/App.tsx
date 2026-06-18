import { useState } from "react";
import { handleDownloadImage } from "./utils/handleDownloadImage";
import "highlight.js/styles/github.css";
import Actions from "./Actions";
import HighlightedCode from "./HighlightedCode";
import "sensorario-design-system/style/index.css";
import Button from "sensorario-design-system/Button";
import { Footer, Header } from "./storybook-components/index.ts";

const footerLinks = [
  { label: "guitar", href: "https://guitar.simonegentili.com" },
  { label: "quadrato", href: "https://quadrato.simonegentili.com" },
  { label: "gantt", href: "https://gantt.simonegentili.com" },
  { label: "code2image", href: "https://code2image.simonegentili.com" },
];

const languages = ["javascript", "bash", "css", "php"] as const;

const App = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("javascript");

  const codeChangeHandler = (): void => {
    // contenuto gestito direttamente dal DOM (contentEditable non controllato)
  };

  const titleChangeHandler = (value: string): void => {
    setTitle(value);
  };

  const languageSelectionHandler = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    if (selectedLanguage === "bash") setTitle("> Terminale");
    if (selectedLanguage === "javascript") setTitle("JavaScript");
    if (selectedLanguage === "css") setTitle("CSS");
    if (selectedLanguage === "php") setTitle("PHP");
  };

  return (
    <>
      <Header title="code2image - snippet to image conversion" />
      <div className="sensorario-container light">
        <div className="code2image-content">
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
                title={title}
                language={language}
                onCodeChange={codeChangeHandler}
                onTitleChange={titleChangeHandler}
              />
              <Actions handler={handleDownloadImage} />
            </div>
          </div>
        </div>
      </div>
      <Footer
        href="https://simonegentili.com"
        copyright="© 2026 simonegentili.com"
        links={footerLinks}
      />
    </>
  );
};

export default App;
