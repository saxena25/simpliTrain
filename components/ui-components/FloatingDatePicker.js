import { useEffect, useId } from 'react'
import clsx from 'clsx'
import moment from 'moment';
import Datepicker from "react-tailwindcss-datepicker";

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-gray-50 focus:outline-none focus:ring-blue-500 sm:text-sm'

export default function FloatingDatePicker({
  label,
  type = 'text',
  className,
  name,
  onChange,
  prifix = null,
  value,
  direction = 'down',
  rage=false,
  ...props
}) {
  let id = props.id?props.id:name;
  let placeholder = props.placeholder?props.placeholder:'';
  let error = props.error?props.error:null;
  // dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-500
  // console.log('valuevaluevaluevaluevalue ==== ', value);
  
  useEffect(()=>{
    if(props.formKey){
      // console.log('document.getElementById(id).value', document.getElementById(id), moment(new Date(value[props.formKey])).format('DD/MMM/YYYY'));
      document.getElementById(id).value = moment(new Date(value[props.formKey])).format('DD/MMM/YYYY');
    }
  },[value]);

  // dark:text-gray-400 peer-focus:dark:text-blue-500
  return (
    <div className={`relative w-full ${rage?'mb-0':'mb-3'}`}>
      {
        rage?
        <div className={`relative bg-input-background rounded-lg w-full pl-4 py-2 overflow-hidden ${className}`}>
          <label htmlFor={id} className="text-[12px] text-input-placeholder">{label}</label>
          {/* flex bg-input-background w-full rounded-lg */}
          <Datepicker
            useRange={rage}
            readOnly={true}
            inputId={id}
            inputName={name}
            displayFormat="DD/MMM/YYYY"
            // asSingle={true}
            inputClassName="w-0 py-0 px-0 w-full text-base text-input-background placeholder-transparent bg-input-background border-0 appearance-none  focus:outline-none focus:ring-0 focus:border-0"
            // containerClassName={}
            toggleClassName="absolute hidden"
            popoverDirection={direction}
            placeholder={placeholder}
            value={value} 
            onChange={newValue => {
              onChange(newValue, name)
            }}
          />
          {
            props?.formValue?
              <label className='absolute top-8' htmlFor={id}>{moment(new Date(props?.formValue)).format('DD/MMM/YYYY')}</label>
            :null
          }

        </div>
        :<div className={`bg-input-background rounded-lg w-full pl-4 py-2 overflow-hidden ${className}`}>
          <label htmlFor={id} className="text-[12px] text-input-placeholder">{label}</label>
          {/* flex bg-input-background w-full rounded-lg */}
          <Datepicker
            useRange={rage}
            inputId={id}
            inputName={name}
            displayFormat="DD/MMM/YYYY"
            asSingle={!rage}
            inputClassName={`py-0 px-0 w-full h-full text-base text-input-text bg-input-background border-0 appearance-none  focus:outline-none focus:ring-0 focus:border-0 ${label?'placeholder-transparent':'text-input-placeholder'}`}
            popoverDirection={direction}
             toggleClassName="absolute h-full right-2 top-0"
            containerClassName={'h-full'}
            placeholder={placeholder}
            value={value} 
            onChange={newValue => onChange(newValue, name)}
          />
        </div>
      }
      {error && (
      <p className="text-sm font-medium w-full px-4 py-2.5 text-left text-error-text">{error}</p>
      )}
    </div>
// 

    // <div className={className}>
    //   {label && <Label id={id}>{label}</Label>}
    //   <input id={id} type={type} {...props} className={formClasses} />
    // </div>
  )
}