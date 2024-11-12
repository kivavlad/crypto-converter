import cls from "./style.module.scss";

interface IProps {
  type: 'button' | 'reset' | 'submit';
  active?: boolean;
  title: string;
  onClick?: () => void;
}

export const Button: React.FC<IProps> = ({ type, title, active, onClick }) => {
  return (
    <button 
      type={type}
      className={`${cls.btn} ${!active ? cls.unactive : ''}`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}