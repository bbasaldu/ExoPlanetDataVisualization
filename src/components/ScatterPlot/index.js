import { useEffect, useRef } from "react";
import ChartContainer from "../ChartContainer";
import { renderChart } from "./scatterplot";
import cls from "./ScatterPlot.module.css";
const ScatterPlot = (props) => {
  const { chartFill, xField, yField, data } = props;
  const containerRef = useRef();
  useEffect(() => {
    renderChart({
      fill: chartFill,
      xField,
      yField,
      data,
      containerRef: containerRef.current,
      animate: true,
    });
  }, [xField, yField, data, chartFill]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      renderChart({
        fill: chartFill,
        xField,
        yField,
        data,
        containerRef: containerRef.current,
        animate: false,
      });
    });
  }, [xField, yField, data, chartFill]);
  return (
    <div className={cls.chartWrapper}>
      <div className={cls.title}>
        <h2>{`${xField} Vs. ${yField}`}</h2>
      </div>
      <ChartContainer ref={containerRef} className={cls.scatterContainer} />
    </div>
  );
};
export default ScatterPlot;
