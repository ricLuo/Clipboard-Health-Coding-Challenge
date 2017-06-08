import React from 'react';
import * as d3 from 'd3';
import Main from '../../app/layouts/Main';
import Graph from './Graph';
import MapUs from './MapUs';
import axios from 'axios';
import DashboardNavbar from './DashboardNavbar';
import DashboardChartWrapper from './DashboardChartWrapper';
import BarChart from './BarChart';
import D3Chart from './D3Chart';

class myComponent extends React.Component{
  constructor(){
    super();
    this.state = {
      error: null,
      record: null,
      location:null,
      salary:null
    };
    // ES do not support "this" method. Need to manually bind it.
    this.loadMongo = this.loadMongo.bind(this);
    this.handleData = this.handleData.bind(this);
  }
  //when html is loaded already, update state to compute the json map data.
  componentDidMount(){
    this.loadMongo();
  }

  //load record data from mongo
  loadMongo(){
    axios.get("/api/myRecords")
      .then(res=>{
        const record=res;
        this.handleData(record);

      })
      .catch((err)=>{
        console.log(err);
        this.setState({error:err});
      });
  }

  //store data in record into react state
  handleData(record){
    const location=[];
    const salary=[];
    var path = d3.geoPath()
    .projection(null);
    for(var key in record.data){
      if(record.data.hasOwnProperty(key)){
        // console.log(key);
        var lat = record.data[key].lat;
        var lng = record.data[key].lng;
        // console.log("lat lng", lat, lng);
        if(record.data[key].salary>0){
          salary.push(record.data[key].salary);
        }
        else {
          salary.push(0);
        }
        if(lat!=null && lng!=null){
          // remove bad data
          if(lat<60 && lat>10 && lng<-70 && lng>-140){
            location.push([lng,lat]);
          }
        }
      }
    }
    this.setState({
                  location:location,
                    salary:salary,
                    record:record,
                  });
    // console.log("location",this.state.location);
    // console.log("salary",this.state.salary);
    // console.log("record",this.state.record);
  }



  render(){
    if(this.state.error){
      return (
          <div>
            <h1>Error Loading Page</h1>
          </div>
      );
    }

    // we probably will not want to update props in children component
    // because of re-render and life cycle issues
    // so we'll not load children component until data in state has been loaded
    if(!this.state.record || !this.state.location || !this.state.salary){
      return (
        <Main>
          <div className="application">
            <DashboardNavbar/>
            <div className="row">
              <DashboardChartWrapper
                width="col-sm-8"
                notes="The reason that accuracy is not high is because we manually transform the coordinates to scale of the Map.\
                For further enhancement, we could generate the map using States Topojson seperately instead of data as a whole"
                title="Address Location Distribution">
              </DashboardChartWrapper>
              <DashboardChartWrapper
                width="col-sm-4"
                notes="Notes about this chart"
                title="Salary Charts">
              </DashboardChartWrapper>
            </div>
          </div>
        </Main>
      );
    }
    return (
      <Main>
        <div className="application">
          <DashboardNavbar/>
          <div className="row">
            <div className="col-sm-8">
              <div className="chart-wrapper">
                <div className="chart-title">
                  Address Location Distribution
                </div>
                <div className="chart-stage">
                  <div id="grid-1-1">
                    <div className="col-sm-12">
                      <MapUs {...this.state}></MapUs>
                    </div>
                  </div>
                </div>
                <div className="chart-notes">
                The reason that accuracy is not high is because we manually transform the coordinates to scale of the Map.
                For further enhancement, we could generate the map using States Topojson seperately instead of data as a whole
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="chart-wrapper">
                <div className="chart-title">
                  Salary Charts
                </div>
                <div className="chart-stage">
                  <div id="grid-1-1">
                    <div className="col-sm-12">
                      <BarChart data={this.state.salary}/>
                    </div>
                  </div>
                </div>
                <div className="chart-notes">
                  <span>Notes about this chart</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8">
              <div className="chart-wrapper">
                <div className="chart-title">
                  Salary Charts
                </div>
                <div className="chart-stage">
                  <div id="grid-1-1">
                    <div className="col-sm-12">
                      <D3Chart data={this.state.salary}/>
                    </div>
                  </div>
                </div>
                <div className="chart-notes">
                  <span>Miss Bar values are the samples that have bad data.
                  When we clean it using python, we save the bad data value as -1</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="chart-wrapper">
                <div className="chart-title">
                  Scatter Plot
                </div>
                <div className="chart-stage">
                  <div id="grid-1-1">
                    <div className="col-sm-12">
                      <Graph/>
                    </div>
                  </div>
                </div>
                <div className="chart-notes">
                  <span>Notes about this chart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
    );
  }
}

  // <BarChart salary={this.state.salary}/>



export default myComponent;
