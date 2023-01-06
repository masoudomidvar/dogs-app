import { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { IFormValues } from "../../dogs/DogsForm";
import "./Select.scss";

const Select = forwardRef<
  HTMLSelectElement,
  {
    label: string;
    options: string[] | number[];
  } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label, options }, ref) => (
  <div className="select">
    <label className="select-label" htmlFor={name}>
      {label}
    </label>
    <select
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      className="select-field"
      id={name}
    >
      {options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
));

export default Select;
