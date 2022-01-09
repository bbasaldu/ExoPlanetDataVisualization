import React from "react";
/*
ChartContainer component used as a generic chart wrapper 
so i dont have to rewrite this in the individual charts, keeps it modular 
*/
const ChartContainer = React.forwardRef((props, ref) => {

  return <div ref={ref} {...props}></div>;
});
export default ChartContainer;