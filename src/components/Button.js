import { Link } from 'react-router-dom'

const Button = ({
  className,
  isLink,
  iconLeft = false,
  iconRight = false,
  text = false,
  children,
  ...props
}) => {
  let classNames = `flex items-center rounded-md font-medium outline-none transition-all duration-200 active:will-change-transform active:scale-95`

  // classNames += ` border-neutral-300 bg-neutral-100 text-neutral-900 hover:!bg-valred-100 focus-visible:bg-valred-50 focus-visible:text-valred-900 focus-visible:border-valred-700 focus-visible:ring-valred-700 active:!bg-valred-50`

  if (text) {
    classNames += ` my-1 -ml-1 px-1 text-neutral-500 hover:text-valred-100 focus-visible:text-valred-100 focus-visible:underline decoration-valred-800`
  } else {
    classNames += ` justify-center border py-2 px-3 text-sm border-neutral-800 bg-neutral-900 !text-neutral-50 hover:text-valred-100 focus-visible:text-valred-100 hover:!bg-valred-800 focus-visible:bg-valred-900 active:!bg-valred-900 focus-visible:border-valred-800 hover:!border-valred active:border-valred hover:ring-1 hover:!ring-valred focus-visible:ring-1 focus-visible:ring-valred-800 active:ring-1 active:ring-valred`
  }

  if (className && className.length > 0) {
    classNames += ` ${className}`
  }
  if (iconLeft) {
    classNames += ` pl-[11px] pr-3.5`
  } else if (iconRight) {
    classNames += ` pl-3.5 pr-[11px]`
  }

  if (isLink) {
    return (
      <Link className={classNames} {...props}>
        {children}
      </Link>
    )
  } else {
    return (
      <button className={classNames} {...props}>
        {children}
      </button>
    )
  }
}

export default Button
