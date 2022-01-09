import * as d3 from "d3";
import { getLongestTick, getTextBBox } from "../../utility";
export const renderChart = (vars) => {
  const { fill,xField,yField,  data, containerRef } = vars;
  const container = d3.select(containerRef);
  const width = parseFloat(container.style("width"));
  const height = parseFloat(container.style("height"));
  container.selectAll("svg").remove();
  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);


  const xMin = d3.min(data, (d) => +d[xField]);
  const xMax = d3.max(data, (d) => +d[xField]);

  const xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    //.range([margin.left, width - margin.right])
    //.nice();
  
  const yMin = d3.min(data, (d) => +d[yField]);
  const yMax = d3.max(data, (d) => +d[yField]);

  const yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    //.range([height - margin.bottom, margin.top])
    //.nice();
  
  //Get dimensions for tick labels
  const longestXTick = getLongestTick(xScale.ticks())
  const longestYTick = getLongestTick(yScale.ticks())
  const xTickBox = getTextBBox(svg, longestXTick)
  const yTickBox = getTextBBox(svg, longestYTick)
  //use dimensions of ticks for margins for responsive sizing
  //6 is the default tick size in d3, and then i added some additional spacing
  const margin = {
    left: yTickBox.width + 6 + 5,
    right: xTickBox.width / 2,
    top: 10,
    bottom: xTickBox.height + 6,
  };
  xScale
    .range([margin.left, width - margin.right])
    .nice();
  yScale
    .range([height - margin.bottom, margin.top])
    .nice();

  //x-Axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(
      d3
        .axisBottom(xScale)
        .tickFormat((d) =>
          +d >= 10000 || +d <= -10000 ? d3.format(".2s")(d) : d
        )
        .ticks(width>400?10:5)
    )

    //y-Axis
  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));

    //radius
    const r = 2
    //group of scatter plot points
    svg.append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
            .attr('cx', d => xScale(+d[xField]))
            .attr('cy', d => yScale(+d[yField]))
            .attr('r', r)
            .attr('fill', fill)


};