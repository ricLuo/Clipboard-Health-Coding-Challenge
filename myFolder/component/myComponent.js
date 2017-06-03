import React from 'react';
import * as d3 from 'd3';
import Main from '../../app/layouts/Main';
import ReactDom from 'react-dom';
import Graph from './Graph';
import MapUs from './MapUs';

class myComponent extends React.Component{
  constructor(){
    super();
  }
  componentDidMount(){
    console.log(ReactDom.findDOMNode(this));
  }
  render(){
    return (
      <Main>
        <div className="application">
          <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="../">
                  <span className="glyphicon glyphicon-chevron-left"></span>
                </a>
                <a className="navbar-brand" href="./">Clipboard &raquo; Nurse Information</a>
              </div>
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-left">
                  <li><a href="">Home</a></li>
                  <li><a href="">Team</a></li>
                  <li><a href="">Source</a></li>
                  <li><a href="">Community</a></li><li><a href="">Technical Support</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8">
              <div className="chart-wrapper">
                <div className="chart-title">
                  Address Location Distribution
                </div>
                <div className="chart-stage">
                  <div id="grid-1-1">
                    <div className="col-sm-12">
                      <MapUs></MapUs>
                    </div>
                  </div>
                </div>
                <div className="chart-notes">
                  This is a map of Uniteds States which show the location distribution of the nurses. As per the map,
                  most of the nurses located near the west coast.
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="chart-wrapper">
                <div className="chart-title">
                  Cell Title
                </div>
                <div className="chart-stage">
                  <img />
                </div>
                <div className="chart-notes">
                  Notes about "this" chart
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12" id="index">
              <h1> Hello World </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-7" id="graph">
              <Graph></Graph>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <MapUs></MapUs>
            </div>
          </div>
        </div>
      </Main>
    );
  }
}




export default myComponent;
