import React, { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn<string>;
}

interface Props extends InputProps {
  errors: any;
  errorType: string;
}

export default function Input({
  type,
  errors,
  errorType,
  register,
  ...rest
}: Props) {
  return (
    <>
      <input
        type={type}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white pl-2"
        {...register}
        {...rest}
      />
      {errors[errorType] && (
        <p className="text-red-500 text-[0.75rem] w-full mt-1">
          {errors[errorType]?.message}
        </p>
      )}
    </>
  );
}
