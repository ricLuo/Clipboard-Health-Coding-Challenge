import * as d3 from 'd3';

let vis = d3.select('.row')
            .append('svg');

let w = 900;
let h = 400;

vis.attr('width', w);
vis.attr('height', h);

vis.text('The Graph')
   .select('.row');
