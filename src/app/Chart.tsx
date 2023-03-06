'use client';

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.scss'

import * as React from "react";
import * as d3 from "d3";

import io from 'socket.io-client'
let socket

function drawChart(svgRef: React.RefObject<SVGSVGElement>, inputData: string) {
  if (!inputData) return null;
  // const dataOrig = [12, 5, 6, 6, 9, 10];
  const height = 500;
  const width = 800;
  const svg = d3.select(svgRef.current);

  // let gradient = document.createElement('dev');
  // gradient.setAttribute('id', 'gradient');

  const margin = ({top: 40, right: 40, bottom: 40, left: 60})

  // console.log(`inputData: ${inputData?.length}`);

  // const csvData = "date,value\n";
  // const csvData = "date,value\n2023-03-05T00:00:00,CPM:18\n2023-03-05T00:00:01,CPM:36\n2023-03-05T00:00:02,CPM:100";
  // const csvData = "date,value\n2023-03-05T00:00:00; CPM:18\n2023-03-05T00:00:01; CPM:36\n2023-03-05T00:00:02; CPM:100";

  // const psv = d3.dsvFormat("; ");
  // const tmpData = psv.parse(inputData);

  const tmpData = d3.csvParse(inputData, d3.autoType);
  // console.log(tmpData);

  let data = Object.assign(tmpData.map(({date, value}) => {
    return {
      date: date,//date.toString().indexOf('+') >= 0 ? date.toString().split('+').shift() : date,
      value: value ? parseInt(value.split(':').pop()) : 0
    }
  }), {title: "Counts per minute CPM", y: " CPM"})

  // console.log(d3.csvParse(csvData, d3.autoType));
  // console.log(d3.csvParse(csvData, d3.autoType).map(({date, value}) => ({date, value: value})));
  console.log(data);

  let x = d3.scaleUtc()
  .domain(d3.extent(data, d => new Date(d.date)))
  .range([margin.left, width - margin.right])

  let y = d3.scaleLinear()
  .domain(d3.extent(data, d => d.value)).nice()
  .range([height - margin.bottom, margin.top])

  // let color = d3.scaleSequential(y.domain(), d3.interpolateTurbo)

  const xAxis = g => g
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
  .call(g => g.select(".domain").remove())

  const yAxis = g => g
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(y))
  .call(g => g.select(".domain").remove())
  .call(g => g.select(".tick:last-of-type text").append("tspan").text(data.y))

  let line = d3.line()
  .curve(d3.curveStep)
  .defined(d => !isNaN(d.value))
  .x(d => x(d.date))
  .y(d => y(d.value))

  let color = d3.scaleSequential(y.domain(), d3.interpolateTurbo)

  svg
    .attr("width", width)
    .attr("height", height)
    .style("margin-top", 50)
    .style("margin-left", 50);

  svg.append("g")
    .call(xAxis);
  
  svg.append("g")
    .call(yAxis);

  svg.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", height - margin.bottom)
      .attr("x2", 0)
      .attr("y2", margin.top)
    .selectAll("stop")
      .data(d3.ticks(0, 1, 10))
    .join("stop")
      .attr("offset", d => d)
      .attr("stop-color", color.interpolator());

  // d3.selectAll('path').remove()

  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);
}

// const inter = Inter({ subsets: ['latin'] })

const Chart: React.FunctionComponent = () => {
  const svg = React.useRef<SVGSVGElement>(null);

  const [data, setData] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    fetch('/api/prime')
      .then((res) => res.text())
      .then((res) => {
        setData(res)
        setLoading(false)
      })
  }, [])

  React.useEffect(() => {
    drawChart(svg, data);
  }, [data]);

  // setTimeout(() => {
  //   fetch('/api/feed')
  //     .then((res) => res.text())
  //     .then((res) => {
  //       const newData = `${data}${res}`
  //       setData(newData)
  //     })
  // }, 1000);

  // React.useEffect(() => socketInitializer(), [])

  // const socketInitializer = async () => {
  //   await fetch('/api/socket')
  //   socket = io()

  //   socket.on('connect', () => {
  //     console.log('connected')
  //   })
  // }

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return (
    <div id="chart">
      <svg ref={svg} />
    </div>
  );
}

export default Chart;
