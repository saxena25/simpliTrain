import { useId } from 'react'
import clsx from 'clsx'

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-gray-50 focus:outline-none focus:ring-blue-500 sm:text-sm'

function Label({ id, children }) {
  return (
    <label
      htmlFor={id}
      className="mb-3 block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  )
}

export default function SearchField({
  label,
  type = 'text',
  icon,
  className,
  ...props
}) {
  let id = useId()

  return (
    <div className={className}>
      {icon?icon:null}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  )
}