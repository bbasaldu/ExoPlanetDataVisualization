import { useEffect, useRef } from "react";
import ChartContainer from "../ChartContainer";
import { renderChart } from "./histogram";
import cls from "./Histogram.module.css";
/*
Histogram Component renders chart using d3 script in useEffect
The first useEffect does the inital render and the second binds a resize event
to make it responsive
*/
const Histogram = (props) => {
  const { field, data, fill } = props;
  const containerRef = useRef();
  useEffect(() => {
    renderChart({ fill, field, data, containerRef: containerRef.current });
  }, [field, data, fill]);
  useEffect(() => {
    window.addEventListener("resize", () =>
      renderChart({ fill, field, data, containerRef: containerRef.current })
    );
  }, [field, data, fill]);
  return (
    <ChartContainer ref={containerRef} className={cls.histogramContainer} />
  );
};
export default Histogram;
