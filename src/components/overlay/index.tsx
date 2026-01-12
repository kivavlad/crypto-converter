import { createPortal } from "react-dom";
import cls from "./style.module.scss";

interface IProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Overlay: React.FC<IProps> = ({ children, onClose }) => {
  return createPortal(
    <div className={cls.overlay} 
      onClick={onClose}
    >
      <div className={cls.content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}