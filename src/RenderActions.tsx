type handleDownloadImageProp = {
  handler: React.MouseEventHandler;
};

export const RenderActions = ({ handler }: handleDownloadImageProp) => {
  return (
    <div className="render-actions">
      <button onClick={handler}>download code</button>
    </div>
  );
};

export default RenderActions;
