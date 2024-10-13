import { Input } from "@/components/ui/input";
import React from "react";

export const InputContainer = ({
  type,
  name,
  value,
  onChange,
  label,
  containerClassName = "",
  inputClassName = "",
  placeholder = "Enter",
}: {
  type: string;
  name: string;
  value: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any;
  label: string;
  containerClassName?: string;
  inputClassName?: string;
  placeholder?: string;
}) => {
  return (
    <div className={`flex flex-col gap-[10px] ${containerClassName}`}>
      <label className="text-[12px]">{label}</label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`${inputClassName}`}
        placeholder={placeholder}
      />
    </div>
  );
};
