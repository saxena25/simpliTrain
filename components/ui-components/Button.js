import clsx from 'clsx'

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 gap-2 h-14',
  solidsm:
    'group inline-flex items-center justify-center py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 gap-2 h-10',
  outline:
    'group inline-flex items-center justify-center py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 gap-2 h-14',
  outlinesm:
    'group inline-flex items-center justify-center py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 gap-2 h-10',
}

const variantStyles = {
  solid: {
    primary:
      'bg-primary text-white hover:bg-secondary hover:text-white active:bg-secondary active:text-white focus-visible:outline-primary',
    },
  outline: {
    primary:
      'bg-transparent border border-primary text-primary hover:text-primary hover:text-primary active:bg-transparent active:text-primary focus-visible:outline-primary focus-visible:ring-primary',
  },
}

export default function Button({ className, ...props }) {
  props.variant ??= 'solid'
  props.color ??= 'primary'
  props.rounded ??= "false"
  props.size ??= 'lg'

  className = clsx(
    props.size == 'lg'?
      baseStyles[props.variant]
    :baseStyles[`${props.variant}sm`],
    props.variant === 'outline'
      ? variantStyles.outline[props.color]
      : props.variant === 'solid'
        ? variantStyles.solid[props.color]
        : undefined,
    props.rounded?'rounded-full': 'rounded-lg',
    className,
    'disabled:bg-gray-400 disabled:text-white'
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props}>{props.text?props.text:props.icon}{props.children}</button>
  ) : (
    <a className={className} {...props} />
  )
}
