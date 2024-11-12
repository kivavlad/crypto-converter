import cls from "./style.module.scss";

interface IProps {
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  error?: string | null;
  value: string;
  onChange: (value: string) => void;
}

export const Input: React.FC<IProps> = ({ type, placeholder, error, value, onChange }) => {
  return (
    <div className={`${cls.input_wrapper} ${error ? cls.error : ''}`}>
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}