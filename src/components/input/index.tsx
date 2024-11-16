import cls from "./style.module.scss";

interface IProps {
  type: React.HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  error?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<IProps> = ({ type, label, placeholder, error, value, onChange }) => {
  return (
    <div className={cls.wrap}>
      {label && (
        <label>{label}</label>
      )}
      <div className={`${cls.input_wrapper} ${error ? cls.error : ''}`}>
        <input 
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
        />
      </div>
    </div>
  )
}