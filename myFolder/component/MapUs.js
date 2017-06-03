import React from 'react';
import * as d3 from 'd3';
import Main from '../../app/layouts/Main';
import ReactDom from 'react-dom';
import axios from 'axios';
// import topojson from 'topojson';
var topojson = require('topojson');
// import "../formatted.json";
// import d3Wrap from 'react-d3-wrap';
// import usTopo from '../usTopo';

const url_1 = "https://d3js.org/us-10m.v1.json";


class MapUs extends React.Component{

  constructor(){
    super();
    this.state = {
      url: url_1,
      data: null,
      error: null,
      fillColor:'none',
      record: null,
      location:null,
    };
    this.recordLoaded = false;
    this.record = null;
    this.location = null,
    // ES do not support "this" method. Need to manually bind it.
    this.loadData = this.loadData.bind(this);
    this.dataLoaded = this.dataLoaded.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.renderCircle = this.renderCircle.bind(this);
    this.loadMongo = this.loadMongo.bind(this);
  }

  //when html is loaded already, update state to compute the json map data.
  componentDidMount(){
    this.loadData();
    // this.serverRequest =()=>{
    this.loadMongo();
      // };
  }

  loadMongo(){
    // fetch("/api/myRecords",{
    //   method:'GET'
    // })
    axios.get("/api/myRecords")
      .then(res=>{
        const record=res;
        const location=[];
        this.setState({record:record});
        // console.log("record", this.state.record);
        var path = d3.geoPath();
        // .projection(null);
        for(var key in record.data){
          if(record.data.hasOwnProperty(key)){
            // console.log(key);
            var lat = record.data[key].lat;
            var lng = record.data[key].lng;
            // console.log(key, path.centroid(val));
            // let center = path.centroid(val);
            if(lat!=null && lng!=null){
              location.push([lng,lat]);
            }
          }
        }
        // var obj = {};
        // obj.type = "MultiPoint";
        // obj.coordinates = location;
        // // const topoMap = this.state.data;
        //
        // // geojson to topojson transform
        // // https://github.com/topojson/topojson-client/blob/master/src/transform.js
        // var xxx = {
        //     "type": "Point",
        //     "coordinates": [
        //         -105.01621,
        //         39.57422
        //     ]
        // };
        //
        //
        //
        // const ppp = topojson.transform(xxx.transform);
        //
        // console.log("obj", obj);
        // console.log("ppp",ppp);
        this.setState({location:location});
        // console.log("location",this.state.location);
        // console.log("lat lng path",path(location));
      })
      .catch((err)=>{
        console.log(err);
        this.setState({error:err});
      });
  }

  loadData (){
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
  handleHover(){
    // red for hover
    if(this.state.fillColor==='none'){
      return this.setState({fillColor:'red'});
    }
    this.setState({fillColor:'none'});
  }

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
     console.log("render result",test);
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
    if(!this.state.data || !this.state.record || !this.state.location){
      return (
          <div>
            <h1>Loading Data</h1>
          </div>
      );
    }
    //  will not compute the following logic until componentDidMount() implemented
    //  Otherwise data would be null
    const topoMap = this.state.data;
    // console.log("topoMap",topoMap);
    const usMap = topojson.feature(topoMap, topoMap.objects.counties);
    // const usStates = Array.apply(null, {length:51}).map(()=>[usMap.features.)
    console.log("usMap", usMap);


    // var projection = d3.geoMercator();
    //
    // console.log("projection",projection(this.state.location[0]));


    var path = d3.geoPath()
      .projection(null);

    // iterate each state in Uniteds States Json Map. Find the Center of each states
    // Using d3.geoPath.centroid
    const stateCenter = new Array();
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
    // console.log("stateCenter", stateCenter);
    // console.log("path",path(usMap));
    const border = topojson.mesh(topoMap, topoMap.objects.states, function(a, b) { return a !== b; });

    const counties = topojson.mesh(topoMap, topoMap.objects.counties, function(a, b) { return a !== b; });



    var usMapCoords = [];

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
    var maplngMax = d3.max(usMapCoords, (d)=>d[0]);
    var maplngMin = d3.min(usMapCoords, (d)=>d[0]);
    var maplatMax = d3.max(usMapCoords, (d)=>d[1]);
    var maplatMin = d3.min(usMapCoords, (d)=>d[1]);

    console.log("maplngMax","maplngMin","maplatMax","maplatMin",maplngMax,maplngMin,maplatMax,maplatMin);

    var locLngMax = d3.max(this.state.location, (d)=>d[0]);
    var locLngMin = d3.min(this.state.location, (d)=>d[0]);
    var locLatMax = d3.max(this.state.location, (d)=>d[1]);
    var locLatMin = d3.min(this.state.location, (d)=>d[1]);

    console.log("locLngMax","locLngMin","locLatMax","locLatMin",locLngMax,locLngMin,locLatMax,locLatMin);

    const xScale = d3.scaleLinear()
                    .domain([locLngMin, locLngMax])
                    .range([maplngMin, maplngMax]);

    const yScale = d3.scaleLinear()
                    .domain([locLatMax, locLatMin])
                    .range([maplatMin, maplatMax]);

    var location = this.state.location;

    location = location.map((d)=>[xScale(d[0]),yScale(d[1])]);

    console.log("scaled location",location);


    // {stateCenter.map()}
    return (

      // need to transform the scale to integrate with scatter plog

      <svg width="1000" height="700" ref="svg">
        <path d={path(usMap)} className="states" id="states" ></path>
        <path d={path(border)} className="state-borders" ></path>
        <path d={path(counties)} className="county-borders" ></path>
        <g>{location.map(this.renderCircle(location))}</g>
      </svg>
    );
  }
}




// const geoJSON = {
//     "type": "FeatureCollection",
//     "features":[
//         {
//             "type":"Feature",
//             "geometry":{
//                 "type":"Polygon",
//                 "coordinates":[Your list of coordinates]
//             },
//             "properties":{
//                 Any associated attributes
//             }
//         }
//     ]
// };

// const MyChart = d3Wrap({
//   initialize (svg, data, options) {
//     // Optional initialize method called once when component mounts
//   },
//
//   update (svg, data, options) {
//     // setup container, root svg element passed in along with data and options
//       d3.select(svg)
//                   .attr("width", 500)
//                   .attr("height", 500);
//
//       let path = d3.geoPath();
//
//       // console.log(topojson.feature(us, us.objects.states).features);
//       // console.log(path);
//       var url = "https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/us.json";
//       d3.json(url, function(error, topology) {
//       // if(error) throw error;
//
//       console.log("topojson", topology);
//       var geojson = topojson.feature(topology, topology.objects.counties);
//       console.log("geojson", geojson);
//
//       d3.select(svg).selectAll("path")
//         .data(geojson.features)
//       .enter().append("path")
//         .attr("d", path);
//     });
//
//
//       // d3.select('g')
//       //     .attr("class", "states")
//       //   .selectAll("path")
//       //   .data(topojson.feature(us, us.objects.usStates).features)
//       //   .enter().append("path")
//       //     .attr("d", path);
//       //
//       // svg.append("path")
//       //     .attr("class", "state-borders")
//       //     .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
//       // });
//     // continue your d3 implementation as usual...
//   },
//
//   destroy () {
//     // Optional clean up when a component is being unmounted...
//   }
// });

 // var url = "https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/us.json";



export default MapUs;
