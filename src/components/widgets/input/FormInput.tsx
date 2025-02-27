// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import Input, { Props as InputProp } from "./Input";

type Props = {
  label?: string;
  errors?: string;
  touched?: boolean;
} & InputProp;

const FormInput = ({ id, label, errors, touched, required, ...rest }: Props) => {
  const error = touched !== undefined;

  return (
    <div className="space-y-2">
      {label !== undefined && (
        <label htmlFor={id} className="block text-lg text-gray-200">
          {label} {required ? "*" : ""}
        </label>
      )}

      <Input
        {...rest}
        className={`${
          error
            ? "border-blue text-red text-lg font-bold placeholder:text-red"
            : " text-lg maxLength-10"
        } w-full`}
      />

      {error ? <p className="text-red text-base">{errors}</p> : ""}
    </div>
  );
};

export default FormInput;
