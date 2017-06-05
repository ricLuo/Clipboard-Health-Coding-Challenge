import React from 'react';
import * as d3 from 'd3';
import Main from '../../app/layouts/Main';
// import ReactDom from 'react-dom';
// import axios from 'axios';
// import topojson from 'topojson';
var topojson = require('topojson');
// import "../formatted.json";
// import d3Wrap from 'react-d3-wrap';
// import usTopo from '../usTopo';

const url_1 = "https://d3js.org/us-10m.v1.json";

const getStateCenter = (usMap, stateCenter, path)=>{
  for(let key in usMap.features){
    if(usMap.features.hasOwnProperty(key)){
      // console.log(key);
      let val = usMap.features[key];
      // console.log("val "+key, val);
      // console.log("key", path.centroid(val));
      // let center = path.centroid(val);
      stateCenter.push(path.centroid(val));
    }
  }
};

const getMapCoords = (usMap,usMapCoords)=>{
  for(var ftKey in usMap.features){
    var ft = usMap.features[ftKey];
    // console.log("ft",ft);
    for(var coordsArrayKey in ft.geometry.coordinates){
      var coordsArray = ft.geometry.coordinates[coordsArrayKey];
      // console.log("coordsArray",coordsArray);
      for(var coordKey in coordsArray){
        var coord = coordsArray[coordKey];
        // console.log("coord",coord);
        usMapCoords.push(coord);
      }
    }
  }
};


class MapUs extends React.Component{

  constructor(props){
    super(props);
    // console.log(props);
    this.state = {
      url: url_1,
      data: null,
      error: null,
      record: this.props.record,
      location:this.props.location,
      salary:this.props.salary
    };
    // console.log("location",this.state.location);
    // console.log("salary",this.state.salary);
    // console.log("record",this.state.record);
    // ES do not support "this" method. Need to manually bind it.
    this.loadMap = this.loadMap.bind(this);
    this.dataLoaded = this.dataLoaded.bind(this);
    // this.handleHover = this.handleHover.bind(this);
    this.renderCircle = this.renderCircle.bind(this);
  }

  //when html is loaded already, update state to compute the json map data.
  componentDidMount(){
    this.loadMap();

  }

  loadMap (){
    d3.json(this.state.url, this.dataLoaded);
    // console.log("data",this.state.data);
  }

  dataLoaded(err, data){
    if(err){
      this.setState({error:err});
      // console.log('error', err);
    }
    this.setState({data:data});
    // console.log("data",this.state.data);
  }

  //handle hover on map. Currently unavailable since we use a topojson of whole
  // united states other than groups of states topojson
  // handleHover(){
  //   // red for hover
  //   if(this.state.fillColor==='none'){
  //     return this.setState({fillColor:'red'});
  //   }
  //   this.setState({fillColor:'none'});
  // }

  // given coordinates, map the coords to html circle elements and return.
  renderCircle(props){
    // console.log("render props",props);
     let test =  (coords, index)=>{
      //  console.log(coords+"  "+index);
       const circleProps = {
         cx: coords[0],
         cy: coords[1],
         r: 5,
         key: index
       };
       return <circle {...circleProps} fill="steelblue"/>;
     };
    //  console.log("render result",test);
     return test;
  }




  render(){
    if(this.state.error){
      return (
          <div>
            <h1>Error Loading Page</h1>
          </div>
      );
    }
    //  when data is not loaded, show loading page.
    //  to avoid asynchronous ajax and re-render problems
    if(!this.state.data || !this.state.location || !this.state.salary){
      return (
          <div>
            <h1>Loading Data</h1>
          </div>
      );
    }
// ----------------will not compute the following logic until componentDidMount() implemented
// ----------------Otherwise data would be null

    // console.log("location",this.state.location);
    // console.log("salary",this.state.salary);
    // console.log("record",this.state.record);

    const topoMap = this.state.data;
    // console.log("topoMap",topoMap);
    const usMap = topojson.feature(topoMap, topoMap.objects.counties);
    // const usStates = Array.apply(null, {length:51}).map(()=>[usMap.features.)
    console.log("usMap", usMap);

    // var projection = d3.geoMercator();
    // console.log("projection",projection(this.state.location[0]));

    var path = d3.geoPath()
      .projection(null);

    // iterate each state in Uniteds States Json Map. Find the Center of each states
    // Using d3.geoPath.centroid
    var stateCenter = [];
    getStateCenter(usMap, stateCenter, path);
    // console.log("stateCenter", stateCenter);

    // retrieve the the map coordinates from geojson we obtained out of topojson
    var usMapCoords = [];
    getMapCoords(usMap,usMapCoords);

    // find the max and min coordinates of the united map
    var maplngMax = d3.max(usMapCoords, (d)=>d[0]);
    var maplngMin = d3.min(usMapCoords, (d)=>d[0]);
    var maplatMax = d3.max(usMapCoords, (d)=>d[1]);
    var maplatMin = d3.min(usMapCoords, (d)=>d[1]);

    // console.log("maplngMax","maplngMin","maplatMax","maplatMin",maplngMax,maplngMin,maplatMax,maplatMin);

    // find the max and min coordinates of the Nurse locations
    var locLngMax = d3.max(this.state.location, (d)=>d[0]);
    var locLngMin = d3.min(this.state.location, (d)=>d[0]);
    var locLatMax = d3.max(this.state.location, (d)=>d[1]);
    var locLatMin = d3.min(this.state.location, (d)=>d[1]);

    // console.log("locLngMax","locLngMin","locLatMax","locLatMin",locLngMax,locLngMin,locLatMax,locLatMin);

    // scale the nurse locations to us map
    const xScale = d3.scaleLinear()
                    .domain([locLngMin, locLngMax])
                    .range([maplngMin+80, maplngMax-80]);

    const yScale = d3.scaleLinear()
                    .domain([locLatMax, locLatMin])
                    .range([maplatMin+80, maplatMax-80]);

    var location = this.state.location;

    location = location.map((d)=>[xScale(d[0]),yScale(d[1])]);

    // us state border geojson
    const border = topojson.mesh(topoMap, topoMap.objects.states, function(a, b) { return a !== b; });

    // us counties geojson
    const counties = topojson.mesh(topoMap, topoMap.objects.counties, function(a, b) { return a !== b; });

    // console.log("scaled location",location);




    // {stateCenter.map()}
    return (

      // need to transform the scale to integrate with scatter plog

      <svg width="1000" height="600" ref="svg">
        <path d={path(usMap)} className="states" id="states" ></path>
        <path d={path(border)} className="state-borders" ></path>
        <path d={path(counties)} className="county-borders" ></path>
        <g>{location.map(this.renderCircle(location))}</g>
      </svg>
    );
  }
}


export default MapUs;
