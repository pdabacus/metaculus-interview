import React, {Component} from "react";
import * as d3 from "d3";

export interface ChartData {
    x: Array<number>,
    y: Array<number>,
}

export interface ChartProps {
    name: string;
    chart_id: string;
    data: ChartData;
}

class Chart extends Component<ChartProps, {}> {
    constructor(props: ChartProps) {
        super(props)
    }

    componentDidMount() {
        const margin = {top: 10, right: 10, bottom: 30, left: 30};
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;
        const mainsvg:any = d3.select(`#${this.props.chart_id}`);
        mainsvg.attr("width", width + margin.left + margin.right);
        mainsvg.attr("height", height + margin.top + margin.bottom);
        const svg = mainsvg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x_axis = d3.scaleLinear()
            .domain([Math.min(...this.props.data.x), Math.max(...this.props.data.x)])
            .range([0,width]);
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x_axis));

        const min_y = Math.min(...this.props.data.y);
        const max_y = Math.max(...this.props.data.y);
        const range_extension = (max_y - min_y) * 0.10;
        const y_axis = d3.scaleLinear()
            .domain([min_y - range_extension, max_y + range_extension])
            .range([height,0]);
        svg.append("g")
            .call(d3.axisLeft(y_axis));
        
        const zip = (a:Array<number>, b:Array<number>) => a.map((k, i) => [k, b[i]]);
        svg.append("g")
            .selectAll("anything")
            .data(zip(this.props.data.x, this.props.data.y))
            .enter()
            .append("circle")
            .attr("cx", (pt:number[])=>{return x_axis(pt[0])})
            .attr("cy", (pt:number[])=>{return y_axis(pt[1])})
            .attr("r", 4);
    }

    render() {
        return (
            <div>
                <h3>{this.props.name}</h3>
                <svg id={this.props.chart_id}></svg>
            </div>
        );
    }
}

export default Chart;