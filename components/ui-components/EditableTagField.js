import { useEffect, useId, useRef } from 'react'
import clsx from 'clsx'

export default function EditableTagField({
  className,
  name,
  placeholder = '',
  values,
  onChange,
  ...props
}) {
  const inputRefs = useRef(null);
  let id = props.id?props.id:name;
  let error = props.error?props.error:null;
  let oldValues = Array.isArray(values) && values.length > 0 ?values:[];


  const handleKeyDown = (e) => {
    const currentInput = e.target.getAttribute('data-focus-input-init');
    if (e.key === 'Enter' || e.keyCode === 13) {
      onChange([...oldValues, e.target.value]);
      e.preventDefault();
      inputRefs.current.focus();
      console.log('currentInput', currentInput);
      document.getElementById(currentInput).value = '';
      // .value = '';
    }

  }

  useEffect(()=>{
    // if(inputRefs){
    //   inputRefs.current.focus();
    // }
  },[])


  return (
    <><div class="relative flex flex-row flex-wrap gap-2 text-lg rounded-lg p-4 bg-gray-100 border-none shadow-sm min-h-28">
      {/* value */}
      {
        values.map((tag)=>(
          <button className="bg-white border border-gray-300 px-4 py-1 rounded-3xl font-semibold text-sm h-[40px]">
            {tag}
          </button>
        ))
      }
      <input id={id} ref={inputRefs} name={name} data-focus-input-init={id}  type={'text'} validation onKeyUp={handleKeyDown}  classNames="bg-transparent focus:bg-transparent text-text text-sm min-max-w-xs border-0  focus:outline-none focus:border-0" placeholder={placeholder} {...props} style={{border:0, borderColor:'transparent', height:40, background:'transparent'}} />  
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