import React from 'react';
import * as d3 from 'd3';
import DataGragh from './DataGraph';
import MapUs from './MapUs';

const numDataPoints = 50;

const randomNumber = ()=> Math.floor(Math.random()*100);

const randomDataSet = ()=>{
  return Array.apply(null, {length: numDataPoints})
  .map(()=>[randomNumber(),randomNumber()]);
}

// find max data in x axis
const xMax = (data)=> d3.max(data, (d)=>d[0]);

// find max data in y axis
const yMax = (data) => d3.max(data, (d)=>d[1]);

// set x scale with range 0-500
const xScale = (props) =>{
  return d3.scaleLinear()
  .domain([0, xMax(props.data)])
  .range([0,500]);
};

// set y scale with range 0-500
const yScale = (props) =>{
  return d3.scaleLinear()
  .domain([0, yMax(props.data)])
  .range([0,500]);
};


class Graph extends React.Component {
  constructor(){
    super();
    this.state = {
      data: randomDataSet()
    }
  }

  randomizeData(){
    this.setState({data: randomDataSet()});
  }

  getMongoData(){

    transformData();
  }

  transformData(){

  }

  render(){


    const scale = {
      xScale:xScale(this.state),
      yScale:yScale(this.state)
    };

    // console.log(scale);
    // console.log(this.state);

    return (
      <svg width="1000" height="700">
        <DataGragh {...this.state} {...scale}/>
      </svg>
    );
  }
}

// Graph.propTypes = {
//   data: React.PropTypes.String,
//   domain: React.PropTypes.object
// }

export default Graph;
