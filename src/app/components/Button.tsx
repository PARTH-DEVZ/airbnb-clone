import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`relative w-full rounded-md transition hover:opacity-80 
                        ${disabled ? 'opacity-70 cursor-not-allowed' : ''} 
                        ${outline ? 'border-2 border-black text-black' : 'bg-rose-500 text-white'} 
                        ${small ? 'text-sm py-3 border-[1px]' : 'text-md py-2 font-semibold'}`}
        >
            {Icon && <Icon size={24} className="absolute left-4 top-3" />}
            {label}
        </button>
    );
};

export default Button;
