import clsx from 'clsx';

export default function CenteredLayout({children, className, ...props}) {
  return <div className={clsx("flex flex-1 flex-col max-w-[1024px]", className)} {...props}>{children}</div>
}