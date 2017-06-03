import * as d3 from 'd3';

export default class d3Chart{

  create = function(el) {
    var svg = d3.select(el).append('svg')
        .attr('class', 'd3')
        .attr('width', props.width)
        .attr('height', props.height);

    svg.append('g')
        .attr('class', 'd3-points');

    // this.update(el);
  };

  update = function(el) {
    // Re-compute the scales, and render the data points
    var scales = this._scales(el);
    this._drawPoints(el, scales);
  };

  destroy = function(el) {
    // Any clean-up would go here
    // in this example there is nothing to do
  };
}
