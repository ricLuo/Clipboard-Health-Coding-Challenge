import React from 'react';


export default class DashboardChartWrapper extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      width : this.props.width,
      notes : this.props.notes,
      title : this.props.title,
    };
  }

  render(){
    return (
      <div className={this.state.width}>
        <div className="chart-wrapper">
          <div className="chart-title">
            {this.state.title}
          </div>
          <div className="chart-stage">
            <div id="grid-1-1">
              <div className="col-sm-12">
              </div>
            </div>
          </div>
          <div className="chart-notes">
            {this.state.notes}
          </div>
        </div>
      </div>
    );
  }

}
