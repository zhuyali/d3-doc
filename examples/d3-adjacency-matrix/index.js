'use strict';

var data = {
  "nodes": [{
    "id": 0,
    "name": "bus0",
    "x": 446,
    "y": 292
  }, {
    "id": 1,
    "name": "bus1",
    "x": 444,
    "y": 366
  }, {
    "id": 2,
    "name": "bus2",
    "x": 538,
    "y": 274
  }, {
    "id": 3,
    "name": "bus3",
    "x": 517,
    "y": 364
  }, {
    "id": 4,
    "name": "bus4",
    "x": 494,
    "y": 440
  }, {
    "id": 5,
    "name": "bus5",
    "x": 490,
    "y": 213
  }, {
    "id": 6,
    "name": "bus6",
    "x": 370,
    "y": 293
  }, {
    "id": 7,
    "name": "bus7",
    "x": 427,
    "y": 208
  }],
  "edges": [{
    "source": 0,
    "target": 1
  }, {
    "source": 2,
    "target": 3
  }, {
    "source": 0,
    "target": 3
  }, {
    "source": 1,
    "target": 4
  }, {
    "source": 4,
    "target": 3
  }, {
    "source": 2,
    "target": 5
  }, {
    "source": 0,
    "target": 6
  }, {
    "source": 1,
    "target": 6
  }, {
    "source": 5,
    "target": 7
  }, {
    "source": 7,
    "target": 6
  }]
};

var svg = d3.select('svg');
var width = +svg.attr('width');
var height = +svg.attr('height');

var link = svg.append('g')
  .attr('class', 'links')
  .selectAll('line')
  .data(data.edges)
  .enter()
  .append('line')
  .attr("x1", function (d) { return data.nodes[d.source].x; })
  .attr("y1", function (d) { return data.nodes[d.source].y; })
  .attr("x2", function (d) { return data.nodes[d.target].x; })
  .attr("y2", function (d) { return data.nodes[d.target].y; });

var node = svg.append('g')
  .attr('class', 'nodes')
  .selectAll('circle')
  .data(data.nodes)
  .enter()
  .append('circle')
  .attr("cx", function (d) { return d.x; })
  .attr("cy", function (d) { return d.y; })
  .attr("r", 3);