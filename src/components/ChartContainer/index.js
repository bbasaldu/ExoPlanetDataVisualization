import React from "react";
const ChartContainer = React.forwardRef((props, ref) => {

  return <div ref={ref} {...props}></div>;
});
export default ChartContainer;