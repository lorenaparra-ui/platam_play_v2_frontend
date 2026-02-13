import { inputVariants } from "@/components/transversal/forms/Input";
import { VariantProps } from "class-variance-authority";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { SectionInformationField } from "./section";


export interface SearchOption {
    id: string | number;
    label: string;
    value: any;
}

export interface Option {
  value: string;
  label: string;
};

export interface FormField<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue" | "size">,
  VariantProps<typeof inputVariants> {
  name: Path<T>
  control: Control<T>
  label: string
  rules?: RegisterOptions<T>
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  options?: Option[];
  optionsName?: string,
  minDate?: Date | string;
  maxDate?: Date | string;
  labelKey?: string;
  valueKey?: string;
  imageKey?: string;
  defaultSelectValue?: string;
  defaultValue?: string | number | Date | Option | Option[];
}

export interface FormStep {
  step: number
  sections: SectionInformationField[]
}
