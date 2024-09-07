import { HtmlToReact } from "./utils/html2canvas";

type RenderHighlightedCodeProp = {
  code: string;
};

const RenderHighlightedCode = ({ code }: RenderHighlightedCodeProp) => {
  return (
    code && (
      <div className="wrapper">
        <div className="code-output">
          <div className="header">JavaScript</div>
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

export default RenderHighlightedCode;
