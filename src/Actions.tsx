import Button from "sensorario-design-system/Button";

type handleDownloadImageProp = {
  handler: () => void;
};

export const Actions = ({ handler }: handleDownloadImageProp) => {
  return (
    <div className="render-actions">
      <Button onClick={handler}>download code</Button>
    </div>
  );
};

export default Actions;
