import clsx from 'clsx'

export default function BodyText({ className, children, ...props }) {
  return <p className={clsx('m-0 p-0', className)} {...props} >{children}</p>
}
