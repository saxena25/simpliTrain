import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'


export default function Notification({...props}) {
  const { open, delay, autoClose = true, type = '', notification = {}, action } = props;
  const [show, setShow] = useState(open);
  let timeout = 3000;
  
  
  useEffect(()=>{
    if(delay){
      timeout = delay;
    }
    
    setTimeout(() => {
      if(autoClose){
        setShow(false);
      }
    }, timeout);
  },[]);
  
  return (
    <Transition show={show}>
      {
        type == 'info_with_action'?
          <div className="fixed top-24 right-8  pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-3xl ring-1 ring-black/5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
            <div className="w-0 flex-1 p-4">
              <div className="flex items-start">
                {
                  notification?.icon?
                    <div className="shrink-0 pt-0.5">
                      <img
                        alt=""
                        src={notification?.icon}
                        className="size-10 rounded-full"
                      />
                    </div>
                  :null
                }
                {/* notification */}
                
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{notification?.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{notification?.subtext}</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                type="button"
                onClick={() => {
                  action()
                }}
                className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Reply
              </button>
            </div>
          </div>
        :<div className="fixed top-24 right-8 pointer-events-auto w-full max-w-md overflow-hidden rounded-lg bg-white shadow-3xl ring-1 ring-black/5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
          <div className="p-4">
            <div className="flex items-start">
              <div className="shrink-0">
                <CheckCircleIcon aria-hidden="true" className="size-6 text-green-400" />
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">Successfully saved!</p>
                <p className="mt-1 text-sm text-gray-500">Anyone with a link can now view this file.</p>
              </div>
              <div className="ml-4 flex shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setShow(false)
                  }}
                  className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      
    </Transition>
  )
}

