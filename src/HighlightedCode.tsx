import { HtmlToReact } from "./HtmlToReact";

type HighlightedCodeProp = {
  code: string;
  title: string;
};

const HighlightedCode = ({ code, title }: HighlightedCodeProp) => {
  return (
    code && (
      <div className="wrapper">
        <div className="code-output">
          <div className="header">{title}</div>
          <pre>
            <code className="language-javascript">
              <HtmlToReact htmlString={code} />
            </code>
          </pre>
          <div className="tag">https://github.com/sensorario/code-to-image</div>
        </div>
      </div>
    )
  );
};

export default HighlightedCode;
