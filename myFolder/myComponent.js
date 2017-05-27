import React from 'react';
import * as d3 from 'd3';
import Main from '../app/layouts/Main';

class myComponent extends React.Component{
  render(){
    return (
      <Main>
        <div className="container">
          <div className="row">
            <div className="col-sm-12" id="index">
              <h1> Hello World </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-7" id="index">
              <h1> Hello World </h1>
            </div>
            <div className="col-sm-5" id="index">
              <h1> Hello World </h1>
            </div>
          </div>
        </div>
      </Main>
    );
  }
}

class graph extends React.Component {
  render(){
    return (

    );
  }
}

export default myComponent;
