import cls from "./style.module.scss";

interface IProps {
  active: boolean;
  children: React.ReactNode;
}

export const Spinner: React.FC<IProps> = ({ active, children }) => {
  if (active) {
    return (
      <div className={cls.load}>
        <span className={cls.spinner}/>
      </div>
    )
  } else {
    return children;
  }
}