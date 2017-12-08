var data = {
  "image": "https://avatars1.githubusercontent.com/u/9263023?v=4&s=460",
  "text": "some text",
  "children": [{
    "image": "https://avatars1.githubusercontent.com/u/9263023?v=4&s=460",
    "text": "some text",
    children: []
  }, {
    "image": "https://avatars1.githubusercontent.com/u/9263023?v=4&s=460",
    "text": "some text",
    children: []
  }]
};

var traversal = function (root, layer, maxLayerDepth) {
  if (root.children) {
    root.children.forEach(function (child) {
      maxLayerDepth[layer + 1]++;
      traversal(child, layer + 1, maxLayerDepth);
    });
  }
  return maxLayerDepth;
}

var svg = d3.select("svg");
var width = +svg.attr("width");
var height = +svg.attr("height");
var root = d3.hierarchy(data);
var maxHeight = 150;
var layerDepth = Array(root.height + 1).fill(0);
var maxLayerDepth = traversal(root, 0, layerDepth);
var imageHeight = height / (1.03 * Math.max(...maxLayerDepth)) > maxHeight ? maxHeight : height / (1.03 * Math.max(...maxLayerDepth));
var tree = d3.tree().size([height, width - imageHeight - 100]);
var g = svg.append("g");
tree(root);

var renderTree = function (root) {
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
    .attr("class", "node")
    .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

  node.append("image")
    .attr("xlink:href", function (d) {
      return d.data.image;
    })
    .attr("height", function (d) {
      return imageHeight;
    })
    .attr("transform", function (d) { return `translate(3, ${-imageHeight / 2})`; });

  node.append('text')
    .attr('fill', '#111')
    .text(d => {
      return d.data.text;
    })
    .attr("transform", d => {
      return `translate(${imageHeight + 10}, 0)`;
    })
};

var update = function () {
  var root = d3.hierarchy(data);
  tree(root);
  var transition = g.transition().duration(1000);
  var maxHeight = 150;
  var layerDepth = Array(root.height + 1).fill(0);
  var maxLayerDepth = traversal(root, 0, layerDepth);
  var imageHeight = height / (1.03 * Math.max(...maxLayerDepth)) > maxHeight ? maxHeight : height / (1.03 * Math.max(...maxLayerDepth));
  renderTree(root);
  transition.selectAll(".link")
    .attr("d", function (d) {
      return "M" + d.y + "," + d.x
        + "C" + (d.parent.y + imageHeight + 110) + "," + d.x
        + " " + (d.parent.y + imageHeight + 110) + "," + d.parent.x
        + " " + (d.parent.y + imageHeight + 10) + "," + d.parent.x;
    });
  transition.selectAll(".node")
    .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });
  transition.selectAll("image")
    .attr("height", function (d) {
      return imageHeight;
    })
    .attr("transform", function (d) { return `translate(3, ${-imageHeight / 2})`; });
  transition.selectAll("text")
    .attr("transform", function (d) { return `translate(${imageHeight + 10}, 0)`; });
};

document.querySelector('#append').addEventListener('click', () => {
  data.children[0].children.push({
    "image": "https://avatars1.githubusercontent.com/u/9263023?v=4&s=460",
    "text": "some text"
  });
  update();
}, false);

renderTree(root);
