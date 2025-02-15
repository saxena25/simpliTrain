import { useId } from 'react'
import clsx from 'clsx'

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-gray-50 focus:outline-none focus:ring-blue-500 sm:text-sm'

export default function TextField({
  label,
  type = 'text',
  className,
  name,
  ...props
}) {
  let id = props.id?props.id:name;
  let placeholder = props.placeholder?props.placeholder:'';
  let validation = props.validation?props.validation:null;
  let error = props.error?props.error:null;
  
  return (
    <><div class="relative">
      <input id={id} name={name} type={type} validation class="peer h-16 pl-4 pr-4 w-full bg-input-background border-0 text-input-text placeholder-transparent rounded-xl focus:outline-none focus:border-0 focus:border-transparent focus:shadow-none focus:pt-6" placeholder={placeholder} {...props} />
      <label htmlFor={id} class="absolute left-4 top-5 text-input-placeholder text-sm transition-all peer-placeholder-shown:text-input-placeholder peer-placeholder-shown:text-input-placeholder peer-placeholder-shown:top-5 peer-focus:top-3 peer-focus:text-input-placeholder peer-focus:text-xs">{label?label:placeholder?placeholder:name}</label>
    </div>
     {error && (
      <span className="text-sm text-red-500">{error.message}</span>
      )} 
    </>
// 

    // <div className={className}>
    //   {label && <Label id={id}>{label}</Label>}
    //   <input id={id} type={type} {...props} className={formClasses} />
    // </div>
  )
}