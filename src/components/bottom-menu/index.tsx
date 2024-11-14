import { useLocation, useNavigate } from "react-router-dom";
import { DollarSvg } from "../svg/dollar";
import { Arrows } from "../svg/arrows";
import cls from "./style.module.scss";

export const BottomMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    {title: 'Rates', path: "/", icon: <DollarSvg/>},
    {title: 'Convert', path: "/convert", icon: <Arrows/>},
  ]

  return (
    <div className={cls.wrap}>
      <div className={cls.menu}>
        {menu.map((item, index) => (
          <button 
            key={index}
            className={`${cls.menu_item} ${location.pathname === item.path ? cls.active : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}