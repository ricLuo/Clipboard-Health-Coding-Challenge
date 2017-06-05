import React from 'react';
import * as d3 from 'd3';
import d3Tip from "d3-tip";

d3.tip = d3Tip;

export default class D3Chart extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data:this.props.data,
    };
  }

  componentDidMount(){
    var svg = d3.select("#d3charSvg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
    var data = this.state.data;

    data = data.map((d)=>[data.indexOf(d),d]);

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    console.log("mapped data",data);

    var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    console.log("max y",d3.max(data, (d)=>d[1]));

    x.domain(data.map((d)=>d[0]));
    y.domain([0, d3.max(data, (d)=>d[1])]);

    // added tool tip label to show the salary of each bar
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Salary:</strong> <span style='color:red'>" + d[1] + "</span>";
      });

    svg.call(tip);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(20))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Salary");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d){return x(d[0]);})
        .attr("y", function(d){return y(d[1]);})
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[1]); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

  }



  render(){


    return (
      <svg id="d3charSvg" width="960" height="500"></svg>
    );
  }
}
