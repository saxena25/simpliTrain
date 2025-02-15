import clsx from 'clsx'

export default function MobContainer({
  className,
  ...props
}) {
  return (
    <div
      className={clsx('mx-auto w-full p-5', className)}
      {...props}
    />
  )
}
