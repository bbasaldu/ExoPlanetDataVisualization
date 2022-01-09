import * as d3 from "d3";
import { getLongestTick, getTextBBox } from "../../utility";
/*
  renderChart for Histrogram component
  uses a single field to grab from data.
  Uses ref of parent container for responsive sizing
*/
export const renderChart = (vars) => {
  const { field, data, containerRef, fill, animate } = vars;
  const container = d3.select(containerRef);
  const width = parseFloat(container.style("width"));
  const height = parseFloat(container.style("height"));
  //so that when we resize we essentially just 'clear the canvas and redraw'
  container.selectAll("svg").remove();
  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  //20 for every 1000
  const bins = 60;
  //use + for string to number conversion
  const xMin = d3.min(data, (d) => +d[field]);
  const xMax = d3.max(data, (d) => +d[field]);

  const xScale = d3.scaleLinear().domain([xMin, xMax]);
  // .range([margin.left, width - margin.right])
  // .nice();

  //create bins from d[field] values
  //and using xScale domain
  //and number of bins to 'bins'
  const bin = d3
    .bin()
    .value((d) => +d[field])
    .domain(xScale.domain())
    .thresholds(bins);
  const binData = bin(data);

  const yMin = 0;
  //bin with greatest amount of items in it
  const yMax = d3.max(binData, (d) => d.length);

  const yScale = d3.scaleLinear().domain([yMin, yMax]);
  // .range([height - margin.bottom, margin.top])
  // .nice();

  //Get dimensions for tick labels
  const longestXTick = getLongestTick(xScale.ticks());
  const longestYTick = getLongestTick(yScale.ticks());
  const xTickBox = getTextBBox(svg, longestXTick);
  const yTickBox = getTextBBox(svg, longestYTick);
  //use dimensions of ticks for margins for responsive sizing
  //6 is the default tick size in d3, and then i added some additional spacing
  const margin = {
    left: yTickBox.width + 6 + 5,
    right: xTickBox.width / 2,
    top: 10,
    bottom: xTickBox.height + 6,
  };
  xScale.range([margin.left, width - margin.right]).nice();
  yScale.range([height - margin.bottom, margin.top]).nice();

  //x-Axis
  //add some logic for responsiveness and shortening tick labels
  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(
      d3
        .axisBottom(xScale)
        .tickFormat((d) =>
          +d >= 10000 || +d <= -10000 ? d3.format(".2s")(d) : d
        )
        .ticks(width > 400 ? 10 : 5)
    );

  //y-Axis
  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale).ticks(4));

  //group for bars in histogram
  if (animate) {
    svg
      .append("g")
      .selectAll("rect")
      .data(binData)
      .enter()
      .append("rect")
        .attr("x", (d) => xScale(d.x0) + 1)
        .attr("width", (d) => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
        .attr("y", (d) => yScale(0))
        .attr("height", (d) => 0)
        .attr("fill", fill)
      .transition()
      .duration(1000)
        .attr("y", (d) => yScale(d.length))
        .attr("height", (d) => yScale(0) - yScale(d.length));
  } else {
    svg
      .append("g")
      .selectAll("rect")
      .data(binData)
      .enter()
      .append("rect")
        .attr("x", (d) => xScale(d.x0) + 1)
        .attr("width", (d) => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
        .attr("y", (d) => yScale(d.length))
        .attr("height", (d) => yScale(0) - yScale(d.length))
        .attr("fill", fill);
  }
};
