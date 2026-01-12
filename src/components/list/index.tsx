import { memo, ReactElement } from "react";
import cls from "./style.module.scss";

interface IProps<T> {
  list: T[];
  renderItems: (item: T) => React.ReactNode;
  onSelect: (item: T) => void;
}

export const List = memo(<T extends { id: string }>(
  { list, renderItems, onSelect }: IProps<T>) => {
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
}) as <T extends { id: string }>(props: IProps<T>) => ReactElement;
