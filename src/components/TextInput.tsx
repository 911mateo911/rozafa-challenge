import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export const TextInput = ({
  className,
  ...inputProps
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return (
    <input
      className={classNames(
        'font-roboto text-input-text leading-6 text-xl font-bold rounded-lg-xl w-full px-6 py-3.5 bg-input-bg',
        'placeholder:text-input-text placeholder:font-normal',
        'focus:shadow-input-focused focus:outline-none',
        className
      )}
      {...inputProps}
    />
  )
}
