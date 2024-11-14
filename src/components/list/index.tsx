import { memo } from "react";
import { IRate } from "../../store/rates/types/rates-types";
import cls from "./style.module.scss";

interface IProps {
  list: IRate[];
  renderItems: (item: IRate) => React.ReactNode;
  onSelect: (item: IRate) => void;
}

export const List: React.FC<IProps> = memo(({ list, renderItems, onSelect }) => {
  if (!list.length) return null;

  return (
    <div className={cls.list}>
      {list.map(item => (
        <div 
          key={item.id} 
          className={cls.item}
          onClick={() => onSelect(item)}
        >
          {renderItems(item)}
        </div>
      ))}
    </div>
  )
})