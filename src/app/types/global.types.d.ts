export type TFormSubmitHandler = (e?: React.BaseSyntheticEvent) => void;

export type TFieldType = 'text' | 'email' | 'password' | 'select' | 'checkbox' | 'radio';

export interface TFormField<T> {
  name: keyof T;
  label: string;
  type: TFieldType;
  placeholder?: string;
  className?: string;
  options?: { value: string; label: string }[]; // For select, checkbox, radio
}

export type TFormStructure<T> = TFormField<T>[];
