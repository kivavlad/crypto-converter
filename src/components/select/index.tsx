import cls from "./style.module.scss";

interface IProps {
  options: string[];
  value: string;
  label?: string;
  error?: boolean;
  theme: 'big' | 'small';
  onChange: (value: string) => void;
}

export const Select: React.FC<IProps> = ({ options, theme, label, error, value, onChange }) => {
  return (
    <div className={cls.wrap}>
      {label && (
        <label>{label}</label>
      )}
      <select
        className={`
          ${cls.select} 
          ${theme === 'big' ? cls.big : cls.small}
          ${error ? cls.error : ''}
        `}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((item, index) => (
          <option key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}