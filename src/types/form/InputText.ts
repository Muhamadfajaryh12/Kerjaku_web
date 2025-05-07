import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export default interface InputTextProps<T extends FieldValues> {
  name: Path<T>;
  type: "text" | "password" | "email" | "number" | "date";
  required: boolean;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
}
