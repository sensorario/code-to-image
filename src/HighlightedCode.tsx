import { ClipboardEvent, FormEvent } from "react";
import { HtmlToReact } from "./HtmlToReact";

type HighlightedCodeProp = {
  code: string;
  rawCode: string;
  title: string;
  onCodeChange: (value: string) => void;
  onTitleChange: (value: string) => void;
};

const HighlightedCode = ({
  code,
  rawCode,
  title,
  onCodeChange,
  onTitleChange,
}: HighlightedCodeProp) => {
  const pasteAsPlainText = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const inputHandler = (event: FormEvent<HTMLDivElement>) => {
    onCodeChange(event.currentTarget.innerText);
  };

  const titleInputHandler = (event: FormEvent<HTMLDivElement>) => {
    onTitleChange(event.currentTarget.innerText);
  };

  return (
    <div className="wrapper">
      <div className="code-output">
        <div
          className="header editable-title"
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          onInput={titleInputHandler}
          onPaste={pasteAsPlainText}
          data-placeholder="Inserisci un titolo..."
        >
          {title}
        </div>
        <pre>
          <div
            className="editable-code"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onInput={inputHandler}
            onPaste={pasteAsPlainText}
          >
            {code ? <HtmlToReact htmlString={code} /> : rawCode || "Incolla o scrivi qui il codice..."}
          </div>
        </pre>
        <div className="tag">https://code2image.simonegentili.com/</div>
      </div>
    </div>
  );
};

export default HighlightedCode;
