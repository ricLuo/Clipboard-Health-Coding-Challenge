import React from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
// import

import Main from '../layouts/Main';

const Index = () => (
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

export default Index;
