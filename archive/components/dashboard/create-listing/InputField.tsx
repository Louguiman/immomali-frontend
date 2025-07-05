import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  ...props
}) => {
  return (
    <div className="col-lg-6 col-xl-4">
      <div className="my_profile_setting_input form-group">
        <label htmlFor={id}>{label}</label>
        <input type={type} className="form-control" id={id} {...props} />
      </div>
    </div>
  );
};

export default InputField;
