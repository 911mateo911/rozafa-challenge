import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export const TextInput = ({
  className,
  ...inputProps
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return (
    <input
      className={classNames(
        'font-roboto text-base-text leading-6 text-xl font-bold rounded-lg-xl w-full px-6 py-3.5 bg-input-bg',
        'placeholder:text-base-text placeholder:font-normal',
        'focus:shadow-input-focused focus:outline-none',
        className
      )}
      {...inputProps}
    />
  )
}
