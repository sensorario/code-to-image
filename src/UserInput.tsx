import { ChangeEventHandler } from "react";

type UserInputProp = {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  rawCode: string;
};

export const UserInput = ({ onChange, rawCode }: UserInputProp) => {
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

export default UserInput;
