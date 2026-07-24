import { useState } from "react";
import { handleDownloadImage } from "./utils/handleDownloadImage";
import "highlight.js/styles/github.css";
import Actions from "./Actions";
import HighlightedCode from "./HighlightedCode";
import "sensorario-design-system/style/index.css";
import Button from "sensorario-design-system/Button";
import { QuadratoHeader } from "@sensorario/sg-components";
import { Footer } from "./storybook-components/index.ts";

const footerLinks = [
  { label: "guitar", href: "https://guitar.simonegentili.com" },
  { label: "tome", href: "https://tome.simonegentili.com" },
  { label: "quadrato", href: "https://quadrato.simonegentili.com" },
  { label: "gantt", href: "https://gantt.simonegentili.com" },
  { label: "code2image", href: "https://code2image.simonegentili.com" },
];

const languages = ["javascript", "bash", "css", "php"] as const;

// Cookie condiviso su .simonegentili.com: un utente già autenticato su un
// altro prodotto della famiglia (es. quadrato) risulta loggato anche qui.
const AUTH_URL = "https://api.simonegentili.com/quadrato/authenticate";
const COOKIE_NAME = "simonegentili.com-access-token";
const USERNAME_KEY = "simonegentili.com-username";

function setAuthCookie(token: string): void {
  document.cookie = `${COOKIE_NAME}=${token}; path=/; domain=.simonegentili.com; secure; samesite=strict`;
}

function clearAuthCookie(): void {
  document.cookie = `${COOKIE_NAME}=; path=/; domain=.simonegentili.com; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict`;
}

const App = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [username, setUsername] = useState<string | null>(() =>
    localStorage.getItem(USERNAME_KEY)
  );

  const handleLogin = async (loginUsername: string, password: string): Promise<void> => {
    const res = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: loginUsername, password }),
    });
    if (!res.ok) {
      throw new Error("Authentication failed");
    }
    const { token } = await res.json();
    localStorage.setItem(USERNAME_KEY, loginUsername);
    setAuthCookie(token);
    setUsername(loginUsername);
  };

  const handleLogout = (): void => {
    clearAuthCookie();
    localStorage.removeItem(USERNAME_KEY);
    setUsername(null);
  };

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
      <QuadratoHeader
        title="code2image - snippet to image conversion"
        username={username}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
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
