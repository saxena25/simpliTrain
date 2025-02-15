import { useId } from "react";
import clsx from "clsx";

export default function DropDownField({
  label,
  className,
  name,
  prifix = null,
  options = [],
  ...props
}) {
  let id = props.id ? props.id : name;
  let placeholder = props.placeholder ? props.placeholder : "";
  let error = props.error ? props.error : null;
  // dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-500

  // dark:text-gray-400 peer-focus:dark:text-blue-500
  return (
    <div className="relative mb-3">
      <div className="flex bg-input-background rounded-lg overflow-hidden">
        <span className="relative inline-flex items-center bg-transparent after:border-r after:absolute after:border-r-text a after:h-5 after:w-2 after:right-0 after:bottom-3.5">
          {prifix}
        </span>
        {/* <input {...props} type={type} id={id} name={name} className="block h-16 px-4 pb-2.5 pt-7 w-full text-base text-input-text placeholder-transparent bg-input-background border-0 appearance-none  focus:outline-none focus:ring-0 focus:border-0 peer" placeholder={placeholder} /> */}
        {/* <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label> */}
        <select
          {...props}
          id={id}
          name={name}
          className={`${
            props.value
              ? "h-16 px-4 text-input-text pt-7"
              : "h-16 px-2.5 text-input-placeholder"
          } block pb-2.5 w-full text-base placeholder-transparent bg-input-background border-0 appearance-none  focus:outline-none focus:ring-0 focus:border-0 peer`}>
          <option value={""}>{placeholder}</option>
          {options.map((op, idx) => (
            <option value={op.key} key={idx}>{op.value}</option>
          ))}
        </select>
        {
          props.value ? (
            <label
              htmlFor={id}
              className="absolute text-base text-input-placeholder duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-4 peer-focus:text-input-placeholder peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              {label}
            </label>
          ) : null

          // <label htmlFor={id} className="absolute text-[18px] text-input-placeholder duration-300 transform -translate-y-4 scale-75 top-8 z-10 origin-[0] start-4 peer-focus:text-input-placeholder peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{placeholder}</label>
        }
      </div>
      {error && (
        <p className="text-sm font-medium w-full px-4 py-2.5 text-left text-error-text">
          {error}
        </p>
      )}
    </div>
    //

    // <div className={className}>
    //   {label && <Label id={id}>{label}</Label>}
    //   <input id={id} type={type} {...props} className={formClasses} />
    // </div>
  );
}
