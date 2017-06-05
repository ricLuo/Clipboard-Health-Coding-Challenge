import React from 'react';

export default class DashboardNavbar extends React.Component{
  constructor(){
    super();
    this.state = {

    };
  }

  render(){
    return (
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
              <li><a href="">Support</a></li>
              <li className="pull-right"><a href="">By Richard Luo</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
