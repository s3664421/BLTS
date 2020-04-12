/* eslint no-shadow: off */
/* eslint no-console: off */
import React, { Component } from 'react'
import { select } from 'd3-selection'
import { scaleLinear, scaleUtc, scaleSequential } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { extent, ticks } from 'd3-array'
import { interpolateTurbo } from 'd3-scale-chromatic'
import { line, curveStep } from 'd3-shape'

export class LineGraph extends Component {

    constructor(props){
        super(props)
        this.createLineGraph = this.createLineGraph.bind(this)
    }

    componentDidMount() {
        this.createLineGraph(this.props)
     }
  
     componentDidUpdate() {
        this.createLineGraph(this.props)
     }

    createLineGraph(props) {
        console.log("props: ", props);
        const node = this.node;

        const x = scaleUtc()
            .domain(extent(props.data, d => Date.parse(d.time)))
            .range([props.margin[0], props.size[0] - props.margin[2]]);

        const y = scaleLinear()
            .domain(extent(props.data, d => d.value))
            .range([props.size[1] - props.margin[3], props.margin[1]]);

        const colour = scaleSequential(y.domain(), interpolateTurbo);

        const xAxis = g => g
            .attr("transform", `translate(0,${props.size[1] - props.margin[3]})`)
            .call(axisBottom(x).ticks(props.size[0] / 80).tickSizeOuter(0))
            .call(g => g.select(".domain").remove());

        const yAxis = g => g
            .attr("transform", `translate(${props.margin[0]}, 0)`)
            .call(axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").append("tspan").text(props.data.y));

        const dataLine = line()
            .curve(curveStep)
            .defined(d => !isNaN(d.value))
            .x(d => x(Date.parse(d.time)))
            .y(d => y(d.value));

        select(node).append("g").call(xAxis);
        select(node).append("g").call(yAxis);

        select(node).append("linearGradient")
            .attr("id", "gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("y1", props.size[1] - props.margin[3])
            .attr("x2", 0)
            .attr("y2", props.margin[1])
        .selectAll("stop")
            .data(ticks(0, 1, 10))
        .join("stop")
            .attr("offset", d => d)
            .attr("stop-color", colour.interpolator());

        select(node).append("path")
            .datum(props.data)
            .attr("fill", "none")
            .attr("stroke", "url(#gradient)")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", dataLine);
    }
    

    render() {
        return <svg ref={node => this.node = node}
        width={this.props.size[0]} height={this.props.size[1]}></svg>
    }
}
