import { ClipboardEvent, FormEvent } from "react";

type HighlightedCodeProp = {
  rawCode: string;
  title: string;
  onCodeChange: (value: string) => void;
  onTitleChange: (value: string) => void;
};

const HighlightedCode = ({
  rawCode,
  title,
  onCodeChange,
  onTitleChange,
}: HighlightedCodeProp) => {
  const pasteAsPlainText = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    selection.deleteFromDocument();
    const range = selection.getRangeAt(0);
    range.insertNode(document.createTextNode(text));
    selection.collapseToEnd();

    onCodeChange(event.currentTarget.innerText);
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
            data-placeholder="Incolla o scrivi qui il codice..."
          >
            {rawCode}
          </div>
        </pre>
        <div className="tag">https://code2image.simonegentili.com/</div>
      </div>
    </div>
  );
};

export default HighlightedCode;
