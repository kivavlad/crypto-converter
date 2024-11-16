import { ReloadSvg } from "../svg/reload";
import { LogoutSvg } from "../svg/logout";
import cls from "./style.module.scss";

interface IProps {
  title: string;
  onReload?: () => void;
  onLogout: () => void;
}

export const Head: React.FC<IProps> = ({ title, onReload, onLogout }) => {
  return (
    <div className={cls.head}>
      <div className={cls.content}>
        {onReload && (
          <button onClick={onReload}>
            <ReloadSvg/>
          </button>
        )}
        <h3>{title}</h3>
        <button onClick={onLogout}>
          <LogoutSvg/>
        </button>
      </div>
    </div>
  )
}