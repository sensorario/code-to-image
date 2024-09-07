import React, { ChangeEventHandler } from "react";

type RendereInputCodeProp = {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  rawCode: string;
};

export const RendereInputCode = ({
  onChange,
  rawCode,
}: RendereInputCodeProp) => {
  return (
    <div className="the-code">
      <textarea
        onChange={onChange}
        value={rawCode}
        placeholder="Write your code here..."
        rows={10}
      />
    </div>
  );
};

export default RendereInputCode;
