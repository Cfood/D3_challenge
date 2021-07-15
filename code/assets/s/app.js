// @TODO: YOUR CODE HERE!


//create space for the plot
var svgWidth = 800
var svgHeight = 400

var margin = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 100
  };

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

var svg = d3.select("#scatter")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth);

svg.append("text") 
    .attr("x", 475)
    .attr("y", 390)
    .style("text-anchor", "middle")
    .text("Average Age (Earth Years)");
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y",margin.left - 40)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Smokers (%)");

var scatterGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//import data from csv
d3.csv("../assets/data/data.csv").then(function(stateData) {
    console.log(stateData[8])
    console.log('heji')
    

    stateData.forEach(function(data) {
        data.smokes = +data.smokes
        data.age = +data.age
        data.obesity = + data.obesity
        data.healthcare = +data.healthcare
    })

    //create  x and y scale functions
    var xScale= d3.scaleLinear()
    .domain([d3.min(stateData, d => d.age) -1, d3.max(stateData, d => d.age)])
    .range([0, width]);

    var yScale = d3.scaleLinear()
    .domain([d3.min(stateData, d => d.smokes) -1, d3.max(stateData, d => d.smokes)])
    .range([height,0]);

    //use scaled x and y values to save axes
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    //draw axes
    scatterGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    scatterGroup.append("g")
        .call(leftAxis);

    //create plot point group
    var pointGroup = scatterGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.age))
    .attr("cy",d=> yScale(d.smokes))
    .attr("r", "10")
    .attr("fill", "purple")  
    .attr('opacity', '1')

    scatterGroup.selectAll("text")
    .data(stateData)
    .enter()
    .append('text')
    .text(d=> d.abbr)
    .attr("x", d => xScale(d.age))
    .attr("y", d=> yScale(d.smokes)+5)
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .style('fill','#FFFFFF')



})

