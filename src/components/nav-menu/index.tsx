import cls from "./style.module.scss";

interface IProps {
  children: React.ReactNode;
}

export const NavMenu: React.FC<IProps> = ({ children }) => {
  return (
    <nav className={cls.nav}>
      {children}
    </nav>
  )
}