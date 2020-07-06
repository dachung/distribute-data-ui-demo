<template>
  <div class="graph">
    <div class="graph-area" ref="graphArea" style="height:200px"></div>
  </div>
</template>

<script>
const data = {
  name: "A",
  children: [
    {
      name: "Broker 1",
      children: [
        {
          name: "Sale 1",
          value: 123
        },
        {
          name: "Sale 2",
          value: 123
        }
      ]
    },
    {
      name: "Broker 2"
    },
    {
      name: "Broker 3"
    }
  ]
};

const d3 = require("d3");

const width = 954;
const tree = data => {
  const root2 = d3.hierarchy(data);
  root2.dx = 20;
  root2.dy = width / (root2.height + 1);
  return d3.tree().nodeSize([root2.dx, root2.dy])(root2);
};

export default {
  mounted() {
    const root = tree(data);
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });

    let graphHtml = this.$d3.select(".graph-area");

    let svg = graphHtml.append("svg").attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);;

    const g = svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

    const link = g
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x(d => d.y)
          .y(d => d.x)
      );

    const node = g
      .append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("g")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.y},${d.x})`);

    node
      .append("circle")
      .attr("fill", d => (d.children ? "#555" : "#999"))
      .attr("r", 5);

    node
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", d => (d.children ? -6 : 6))
      .attr("text-anchor", d => (d.children ? "end" : "start"))
      .text(d => d.data.name)
      .clone(true)
      .lower()
      .attr("stroke", "white");

    // return svg.node();
  }
};
</script>
