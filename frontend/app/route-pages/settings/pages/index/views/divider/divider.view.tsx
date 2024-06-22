import { classNames } from '~/common/utils/class-names.util'

export type DividerProps = {
  className?: string
}

export const Divider = ({ className }: DividerProps) => {
  return (
    <div
      className={classNames([
        'border-t border-[#ccc] border-dotted',
        className,
      ])}
      aria-hidden={true}
    />
  )
}
