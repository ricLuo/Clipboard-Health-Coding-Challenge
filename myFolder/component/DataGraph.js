import React from 'react';
import * as d3 from 'd3';

const renderCircle = (props) => {
  //  console.log(props);
    let test =  (coords, index)=>{
      // console.log(coords+"  "+index);
      const circleProps = {
        cx: props.xScale(coords[0]),
        cy: props.yScale(coords[1]),
        r: 8,
        key: index
      };
      return <circle {...circleProps} fill="red"/>;
    };
    // console.log(test);
    return test;
  };


class DataGraph extends React.Component{
  constructor(props){
    super(props);
    // console.log(props);
    this.state = {
      data: props.data,
      xScale: props.xScale,
      yScale: props.yScale
    };
  }

  render(){
    // map the data list to list of <circl> tags
    // renerCicle(this.state) is a function (coord, index) that map the data.
    // a function to apply to each data in this.state.data
    return (
      <g>{this.state.data.map(renderCircle(this.state))}</g>
    );
  }

}

export default DataGraph;
