import clsx from 'clsx'

export default function Heading({ className, children, ...props }) {
  switch (props.as) {
    case 'heading1':
      return <h1 className={clsx('m-0 p-0', className)} {...props} >{children}</h1>
      break;
    case 'heading2':
      return <h2 className={clsx('m-0 p-0', className)} {...props} >{children}</h2>
      break;
    case 'heading3':
      return <h3 className={clsx('m-0 p-0', className)} {...props} >{children}</h3>
      break;
    case 'heading4':
      return <h4 className={clsx('m-0 p-0', className)} {...props} >{children}</h4>
      break;
    default:
      <p className={clsx('m-0 p-0', className)} {...props} >{children}</p>
      break;
  }
  return 
}
