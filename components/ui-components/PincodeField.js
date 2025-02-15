import { useId, useRef } from 'react'
import clsx from 'clsx'

const pinCSS =
  'block w-14 h-14 py-3 text-center text-base text-input-text placeholder-transparent bg-input-background border-0 appearance-none  focus:outline-none focus:ring-0 focus:border-0 rounded-lg'

export default function PincodeField({
  label,
  type = 'text',
  className,
  name,
  ...props
}) {
  const inputRefs = useRef({});
  let id = props.id?props.id:name;
  let placeholder = props.placeholder?props.placeholder:'';
  let validation = props.validation?props.validation:null;
  let error = props.error?props.error:null;
  

  
  const handleKeyDown = (e) => {
    const currentInput = e.target.getAttribute('data-focus-input-init');
    const prevInput = e.target.getAttribute('data-focus-input-prev');
    const nextInput = e.target.getAttribute('data-focus-input-next');
    if (e.target.value) {
        if (nextInput && inputRefs.current[nextInput]) {
            e.preventDefault();
            inputRefs.current[nextInput].focus();
        }
    }else{
      if (prevInput && inputRefs.current[prevInput]) {
        e.preventDefault();
        inputRefs.current[prevInput].focus();
      }
    }
    // console.log('sasass', document.getElementById('code1').value);
    const val = document.getElementById('code1').value + document.getElementById('code2').value + document.getElementById('code3').value + document.getElementById('code4').value + document.getElementById('code5').value + document.getElementById('code6').value;
    console.log('sasaasa', props.name, val);
    props.onChange(val);
  };

  return (
    <><div className="relative">
      <div className="flex  mb-2 justify-between">
        <input type="tel" maxLength="1" ref={(el) => (inputRefs.current['code1'] = el)} onKeyUp={handleKeyDown} data-focus-input-init="code1" data-focus-input-next="code2" id="code1"  className={pinCSS} />
        <input type="tel" maxLength="1" ref={(el) => (inputRefs.current['code2'] = el)} onKeyUp={handleKeyDown} data-focus-input-init="code2" data-focus-input-prev="code1" data-focus-input-next="code3" id="code2"  className={pinCSS} />
        <input type="tel" maxLength="1" ref={(el) => (inputRefs.current['code3'] = el)} onKeyUp={handleKeyDown} data-focus-input-init="code3" data-focus-input-prev="code2" data-focus-input-next="code4" id="code3"  className={pinCSS} />
        <input type="tel" maxLength="1" ref={(el) => (inputRefs.current['code4'] = el)} onKeyUp={handleKeyDown} data-focus-input-init="code4" data-focus-input-prev="code3" data-focus-input-next="code5" id="code4"  className={pinCSS} />
        <input type="tel" maxLength="1" ref={(el) => (inputRefs.current['code5'] = el)} onKeyUp={handleKeyDown} data-focus-input-init="code5" data-focus-input-prev="code4" data-focus-input-next="code6" id="code5"  className={pinCSS} />
        <input type="tel" maxLength="1" ref={(el) => (inputRefs.current['code6'] = el)} onKeyUp={handleKeyDown} data-focus-input-init="code6" data-focus-input-prev="code5" id="code6"  className={pinCSS} />
        {/* <label for={id} className="absolute left-4 top-5 text-input-placeholder text-sm transition-all peer-placeholder-shown:text-input-placeholder peer-placeholder-shown:text-input-placeholder peer-placeholder-shown:top-5 peer-focus:top-3 peer-focus:text-input-placeholder peer-focus:text-xs">{label?label:placeholder?placeholder:name}</label> */}
      </div>
    </div>
     {error && (
      <p className="text-sm font-medium w-full px-0 py-2.5 text-left text-error-text">{error}</p>
      )} 
    </>
// 

    // <div className={className}>
    //   {label && <Label id={id}>{label}</Label>}
    //   <input id={id} type={type} {...props} className={formClasses} />
    // </div>
  )
}