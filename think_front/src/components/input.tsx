interface InputProps {
    placeholder: string;
    reference?: React.Ref<HTMLInputElement>;
    className?: string;
    type?: string;
    disabled?:boolean
}

export function Input({ placeholder, reference,disabled, className, type = "text" }: InputProps) {
    return (
        <input
            disabled={disabled}
            ref={reference}
            placeholder={placeholder}
            type={type}
            className={`px-4 py-2 border rounded m-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all ${className}`}
        />
    );
}
