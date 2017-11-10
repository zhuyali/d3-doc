'use strict';

//数据准备
var nodes = [
  { "id": 1, "name": "bus1" },
  { "id": 2, "name": "bus2" },
  { "id": 3, "name": "bus3" },
  { "id": 4, "name": "bus4" },
  { "id": 5, "name": "bus5" },
  { "id": 6, "name": "bus6" },
  { "id": 7, "name": "bus7" },
  { "id": 8, "name": "bus8" },
  { "id": 9, "name": "bus9" },
  { "id": 10, "name": "bus10" }
];

var links = [
  { "source": 1, "target": 2 },
  { "source": 2, "target": 5 },
  { "source": 1, "target": 7 },
  { "source": 4, "target": 2 },
  { "source": 6, "target": 1 },
  { "source": 2, "target": 9 },
  { "source": 7, "target": 8 },
  { "source": 3, "target": 6 },
  { "source": 4, "target": 9 },
  { "source": 10, "target": 6 },
  { "source": 5, "target": 9 },
  { "source": 3, "target": 1 },
  { "source": 4, "target": 3 },
  { "source": 2, "target": 6 },
  { "source": 1, "target": 4 },
  { "source": 8, "target": 3 },
  { "source": 8, "target": 6 },
  { "source": 9, "target": 3 },
  { "source": 5, "target": 4 },
  { "source": 7, "target": 2 }
];

var svg = d3.select('svg');
var width = +svg.attr('width');
var height = +svg.attr('height');

var link = svg.append('g')
  .attr('class', 'links')
  .selectAll('line')
  .data(links)
  .enter()
  .append('line');

var node = svg.append('g')
  .attr('class', 'nodes')
  .selectAll('circle')
  .data(nodes)
  .enter()
  .append('circle')
  .attr("r", 5)
  .call(d3.drag()
    .on('start', start)
    .on('drag', dragging)
    .on("end", end));

node.append('title')
  .text(function (d) { return d.name; })

var simulation = d3.forceSimulation(nodes)
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('linking', d3.forceLink(links).id(function (d) { return d.id; }))
  .force("charge", d3.forceManyBody().strength(-500))
  .on("tick", ticked);

function ticked() {
  link
    .attr("x1", function (d) { return d.source.x; })
    .attr("y1", function (d) { return d.source.y; })
    .attr("x2", function (d) { return d.target.x; })
    .attr("y2", function (d) { return d.target.y; });

  node
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; });
}

function start(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragging(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function end(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}