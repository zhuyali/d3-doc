var data = {
  "name": "root",
  "children": [
    {
      "name": "Cain"
    },
    {
      "name": "Seth",
      "children": [
        {
          "name": "Enos"
        },
        {
          "name": "Noam"
        }
      ]
    },
    {
      "name": "Abel"
    },
    {
      "name": "Awan",
      "children": [
        {
          "name": "Enoch"
        }
      ]
    },
    {
      "name": "Azura"
    },
    {
      "name": "Cain"
    },
    {
      "name": "Seth",
      "children": [
        {
          "name": "Enos"
        },
        {
          "name": "Noam"
        }
      ]
    },
    {
      "name": "Abel"
    },
    {
      "name": "Awan",
      "children": [
        {
          "name": "Enoch"
        }
      ]
    },
    {
      "name": "Azura"
    },
    {
      "name": "Cain"
    }
  ]
};

var svg = d3.select("svg");
var width = +svg.attr("width");
var height = +svg.attr("height");
var root = d3.hierarchy(data);
var maxLayerDepth = Array(root.height + 1).fill(0);
var traversal = function(root, layer) {
  if(root.children) {
    root.children.forEach(function(child) {
      maxLayerDepth[layer + 1]++;
      traversal(child, layer + 1);
    });
  }
}
traversal(root, 0);
var imageHeight = height / (1.2 * Math.max(...maxLayerDepth));
var tree = d3.tree().size([height, width - imageHeight - 10]);
var g = svg.append("g");
tree(root);

var link = g.selectAll(".link")
  .data(root.descendants().slice(1))
  .enter()
  .append("path")
  .attr("class", "link")
  .attr("d", function (d) {
    return "M" + d.y + "," + d.x
      + "C" + (d.parent.y + imageHeight + 110) + "," + d.x
      + " " + (d.parent.y + imageHeight + 110) + "," + d.parent.x
      + " " + (d.parent.y + imageHeight + 10) + "," + d.parent.x;
  });

var node = g.selectAll(".node")
  .data(root.descendants())
  .enter().append("g")
  .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

node.append("image")
  .attr("xlink:href", "https://avatars1.githubusercontent.com/u/9263023?v=4&s=460")
  .attr("height", function(d) {
    return imageHeight;
  })
  .attr("transform", function(d) { return `translate(3, ${-imageHeight / 2})`; });