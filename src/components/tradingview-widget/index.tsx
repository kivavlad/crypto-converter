import { useEffect, useRef } from "react";
import cls from "./style.module.scss";

interface IProps {
  currentSymbol: string;
}

export const TradingviewWidget: React.FC<IProps> = ({ currentSymbol }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const symbol = currentSymbol.toUpperCase();

  useEffect(() => {
    const widget = containerRef.current;

    if (widget) {
      widget.innerHTML = '';
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: `BINANCE:${symbol}USD`,
        interval: "D",
        timezone: `${currentTimezone}`,
        theme: "dark",
        style: "1",
        locale: "en",
        backgroundColor: "rgba(0, 0, 0, 1)",
        hide_legend: true,
        allow_symbol_change: false,
        save_image: false,
        calendar: false,
        support_host: "https://www.tradingview.com",
      });
      widget.appendChild(script);
    }

    return () => {
      if (widget) {
        widget.innerHTML = '';
      }
    }
  }, [symbol])

  return (
    <div 
      ref={containerRef}
      className={cls.tradingview_widget}
    />
  )
}