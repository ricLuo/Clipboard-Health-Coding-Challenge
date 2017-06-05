import React from 'react';
import * as d3 from 'd3';



const margin = {
  left: 50,
  top: 400
};

const renderRect = (data, index)=>{
  if(data<0)  return ;
  const h = data*2;
  const x = index+margin.left;
  const y = margin.top-h;
  return (
    <rect width="2" height={h}
          x={x}
          y={y}
          fill='steelblue'
          key={index}
          className="bar"/>
  );
};
// stroke='#d6e9c6'
// strokeWidth='1'

export default class BarChart extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data:this.props.data,
    };
    console.log("chart salary", this.props.data);
  }

  componentDidMount(){
    var svg = d3.select('#charSvg');
    var x = d3.scaleBand().rangeRound([0, 70]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([200, 0]);
    y.domain([0, 100]);
    var g = svg.append("g")
    .attr("transform", "translate(" + (margin.left-10) + "," + 200 + ")");
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + 400 + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(20))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");
  }



  render(){


    return (
      <svg id="charSvg" width="400" height="600">
        {this.state.data.map((data, index)=>renderRect(data, index))}
      </svg>
    );
  }
}
