import { useState, useEffect } from "react";
import cls from "./style.module.scss";

interface IProps {
  total: number;
  limit: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination: React.FC<IProps> = ({ total, limit, currentPage, setCurrentPage }) => {
  const [pages, setPages] = useState<(number | string)[]>([]);
  const pageNumbers: number[] = [];

  for (let i = 1; i < Math.ceil(total / limit) + 1; i++) {
    pageNumbers.push(i);
  }

  const loadPage = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
    }
  }

  useEffect(() => {
    let tempNumberOfPages: (number | string)[] = [...pageNumbers];

    if (pageNumbers.length > 5) {
      if (currentPage >= 1 && currentPage <= 2) {
        tempNumberOfPages = [1, 2, 3, '...', pageNumbers.length];
      } else if (currentPage === 3) {
        const sliced = pageNumbers.slice(0, 4);
        tempNumberOfPages = [...sliced, '...', pageNumbers.length];
      } else if (currentPage > 3 && currentPage < pageNumbers.length - 2) {
        const sliced1 = pageNumbers.slice(currentPage - 2, currentPage);
        const sliced2 = pageNumbers.slice(currentPage, currentPage + 1);
        tempNumberOfPages = [1, '...', ...sliced1, ...sliced2, '...', pageNumbers.length];
      } else if (currentPage > pageNumbers.length - 3) {
        const sliced = pageNumbers.slice(pageNumbers.length - 4);
        tempNumberOfPages = [1, '...', ...sliced];
      }
    }
    
    setPages(tempNumberOfPages);
  }, [currentPage, total, limit])

  return (
    <div className={cls.pagination}>
      {pages.map((page, index) => (
        <button 
          key={index} 
          className={`
            ${typeof page === 'number' ? cls.btn : cls.dots} 
              ${currentPage === page ? cls.active : ''}
            `} 
          onClick={() => loadPage(page)}
          disabled={typeof page === 'string'}
        >
          {page}
        </button>
      ))}
    </div>
  )
}