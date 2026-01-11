export const formatPrice = (price: number) => {
  const roundedPrice = Math.round(price * 100) / 100;
  
  return roundedPrice.toLocaleString('ru-RU', {
    minimumFractionDigits: roundedPrice % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  });
};
