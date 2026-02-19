import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    required,
    register,
    errors,
}) => {
    return (
        <div className="relative w-full">
            {formatPrice && (
                <BiDollar
                    size={24}
                    className="text-neutral-700 absolute top-5 left-2"
                />
            )}

            <input
                id={id}
                {...register(id, { required })}
                placeholder=" "
                type={type}
                disabled={disabled}
                className={`peer w-full pt-6 font-light bg-white border-2 rounded-md outline-none transition 
            ${disabled ? "opacity-70 cursor-not-allowed" : ""}
            ${formatPrice ? "pl-10" : "pl-4"} 
            ${errors[id] ? "border-rose-500" : "border-neutral-300"}
            focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
            />
            <label
                htmlFor={id}
                className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[top] 
                 ${formatPrice ? "left-9" : "left-4"} 
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                  peer-focus:scale-75 peer-focus:-translate-y-4 
                 ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
            >
                {label}
            </label>

        </div>
    );
};

export default Input;
