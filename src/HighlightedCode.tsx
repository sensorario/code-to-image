import { ClipboardEvent, useEffect, useRef } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("css", css);

type HighlightedCodeProp = {
  title: string;
  language: string;
  onCodeChange: (value: string) => void;
  onTitleChange: (value: string) => void;
};

const HighlightedCode = ({
  title,
  language,
  onCodeChange,
  onTitleChange,
}: HighlightedCodeProp) => {
  const codeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && document.activeElement !== titleRef.current) {
      titleRef.current.innerText = title;
    }
  }, [title]);

  const applyHighlight = () => {
    if (!codeRef.current) return;
    const text = codeRef.current.innerText;
    if (!text.trim()) return;
    const highlighted = hljs.highlight(text, { language }).value;
    codeRef.current.innerHTML = highlighted;
  };

  const restorePlainText = () => {
    if (!codeRef.current) return;
    const text = codeRef.current.innerText;
    codeRef.current.innerText = text;
    // sposta il cursore alla fine
    const range = document.createRange();
    range.selectNodeContents(codeRef.current);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const pasteAsPlainText = (
    event: ClipboardEvent<HTMLDivElement>,
    onChange: (value: string) => void
  ) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    selection.deleteFromDocument();
    const range = selection.getRangeAt(0);
    range.insertNode(document.createTextNode(text));
    selection.collapseToEnd();
    onChange(event.currentTarget.innerText);
  };

  return (
    <div className="wrapper">
      <div className="code-output">
        <div
          ref={titleRef}
          className="header editable-title"
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          onInput={(e) => onTitleChange(e.currentTarget.innerText)}
          onPaste={(e) => pasteAsPlainText(e, onTitleChange)}
          data-placeholder="Inserisci un titolo..."
        />
        <pre>
          <div
            ref={codeRef}
            className="editable-code"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onInput={(e) => onCodeChange(e.currentTarget.innerText)}
            onPaste={(e) => pasteAsPlainText(e, onCodeChange)}
            onBlur={applyHighlight}
            onFocus={restorePlainText}
            data-placeholder="Incolla o scrivi qui il codice..."
          />
        </pre>
        <div className="tag">https://code2image.simonegentili.com/</div>
      </div>
    </div>
  );
};

export default HighlightedCode;
