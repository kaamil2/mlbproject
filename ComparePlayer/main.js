// Define the CSV file location
let csvFilePath = 'mlbdata.csv';
let csvFilePath2 = 'mlb_player_name.csv'

const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 700;
const MARGINS = {left: 70, right: 70, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// Add frame
const FRAME1 = 
d3.select("#plot1")
  .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

// Add frame
const FRAME2 = 
d3.select("#plot2")
  .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

// add dropdown
d3.csv(csvFilePath2).then((data) => {

  console.log(data)

  dropdown1 = document.getElementById("name_dropdown1")
  dropdown2 = document.getElementById("name_dropdown2")

  // Extract the "Name" column from the data
  const names = data.map(row => row.Name);
  console.log(names)

  names.forEach(name => {
    const option = document.createElement("option");
    option.text = name;
    option.value = name;
    dropdown2.appendChild(option);
  });

  names.forEach(name => {
    const option = document.createElement("option");
    option.text = name;
    option.value = name;
    dropdown1.appendChild(option);
  });

});


d3.csv(csvFilePath).then((data) => {

  console.log(data)

  // scale input x and y
  const MAX_X1 = d3.max(data, (d) => {
                return parseInt(d.Year);
              });
  const MAX_Y1 = d3.max(data, (d) => {
                return parseInt(d.Player1);
              });
  const MAX_Y2 = d3.max(data, (d) => {
                return parseInt(d.Player2);
              });

  //define couple of linear scales
  const xScale1 = d3.scaleLinear()
              .domain([0, MAX_X1]) //d3.extent captures the min. & max from a set of values
                .range([0, VIS_WIDTH]); // map the sepalLength values in dataset to full width of;
  const yScale1 = d3.scaleLinear()
               .domain([0, MAX_Y1])  
               .range([VIS_HEIGHT, 0]); // map the petalLength values in dataset to full height of svg

  const yScale2 = d3.scaleLinear()
               .domain([0, MAX_Y2])  
               .range([VIS_HEIGHT, 0]); 

  const tooltip1 = d3.select('body')
                            .append("div")
                                .attr("class", "tooltip")
                                .style("fill", "steelblue")
                                .style("opacity", 0);

  const tooltip2 = d3.select('body')
                            .append("div")
                                .attr("class", "tooltip")
                                .style("fill", "steelblue")
                                .style("opacity", 0);

  const tooltipcircle1 = FRAME1.append("circle")
                              .attr("class", "circle")
                              .attr("id", "circle1")
                              .attr("cx", 300)
                              .attr("cy", 300)
                              .attr("r", 5)
                              .attr("fill", "black")
                              .attr("opacity", 0)

  const tooltipcircle2 = FRAME1.append("circle")
                              .attr("class", "circle")
                              .attr("id", "circle2")
                              .attr("cx", 350)
                              .attr("cy", 350)
                              .attr("r", 5)
                              .attr("fill", "black")
                              .attr("opacity", 0)

  var focus = FRAME1.append("line")
    .attr("stroke-dasharray", "3,7")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("x1", MARGINS.left)
    .attr("y1", MARGINS.top)
    .attr("x2", MARGINS.left)
    .attr("y2", VIS_HEIGHT)
    .style("visibility", "hidden");      
      
  // Add the line
  var vis1_p1 = FRAME1.append("path")  // Change here
    .datum(data)  // Change here: Using datum for entire data
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", d3.line().curve(d3.curveStepAfter)
        .x(d => (xScale1(d.Year) + MARGINS.left))
        .y(d => (yScale1(d.Player1) + MARGINS.top))
    );

    // Add the line
  var vis1_p2 = FRAME1.append("path")  // Change here
    .datum(data)  // Change here: Using datum for entire data
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", 2)
    .attr("d", d3.line().curve(d3.curveStepAfter)
        .x(d => (xScale1(d.Year) + MARGINS.left))
        .y(d => (yScale1(d.Player2) + MARGINS.top))
    );

  // add x-axis and y-axis
  var xaxis = FRAME1.append("g")
        .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.bottom) + ")")
        .call(d3.axisBottom(xScale1));

  var yaxis = FRAME1.append("g")
        .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
        .call(d3.axisLeft(yScale1))

  var yaxis_label = yaxis.append("text")
    .attr("x", -VIS_HEIGHT / 2)  // Adjust this value as needed to move the label further to the left
    .attr("y", -50)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Predicted Risk")
    .style("fill", "black")
    .style("font-size", "15px");

  var xaxis_label = xaxis.append("text")
    .attr("x", 250)  // Adjust this value as needed to move the label further to the left
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .text("Year")
    .style("fill", "black")
    .style("font-size", "15px");

  // build legend
  FRAME1.append("circle").attr("cx",100).attr("cy",80).attr("r", 6).style("fill", "steelblue")
  FRAME1.append("circle").attr("cx",100).attr("cy",110).attr("r", 6).style("fill", "orange")
  FRAME1.append("text").attr("x", 120).attr("y", 80).text("Player1").style("font-size", "15px").attr("alignment-baseline","middle")
  FRAME1.append("text").attr("x", 120).attr("y", 110).text("Player2").style("font-size", "15px").attr("alignment-baseline","middle")


  data.forEach(function(d) {
    //x mark (may be deleted)

    console.log(d.rea_player1)
    console.log(d.rea_player2)

    if (d.Year === d.rea_player1){
      const xMark1 = FRAME1.append("g")
      .attr("class", "x-mark");
            
      xMark1.append("line")
                    .attr("x1", -5)
                    .attr("y1", -5)
                    .attr("x2", 5)
                    .attr("y2", 5)
                    .attr("stroke", "red")
                    .attr("stroke-width", 2);
                  
      xMark1.append("line")
                    .attr("x1", 5)
                    .attr("y1", -5)
                    .attr("x2", -5)
                    .attr("y2", 5)
                    .attr("stroke", "red")
                    .attr("stroke-width", 2);
                  
      // Position the "X" mark at the specified x and y positions
      xMark1.attr("transform", `translate(${xScale1(d.Year) + MARGINS.left}, ${yScale1(d.Player1) + MARGINS.top})`);
          };

    if (d.Year === d.rea_player2){
            const xMark2 = FRAME1.append("g")
            .attr("class", "x-mark");
                  
            xMark2.append("line")
                          .attr("x1", -5)
                          .attr("y1", -5)
                          .attr("x2", 5)
                          .attr("y2", 5)
                          .attr("stroke", "red")
                          .attr("stroke-width", 2);
                        
            xMark2.append("line")
                          .attr("x1", 5)
                          .attr("y1", -5)
                          .attr("x2", -5)
                          .attr("y2", 5)
                          .attr("stroke", "red")
                          .attr("stroke-width", 2);
                        
            // Position the "X" mark at the specified x and y positions
            xMark2.attr("transform", `translate(${xScale1(d.Year) + MARGINS.left}, ${yScale2(d.Player2) + MARGINS.top})`);
                };
});


  function onMouseMove() {
    const mousePosition = d3.pointer(event);
    const x_mouse = mousePosition[0] - MARGINS.left;
    const y_mouse = mousePosition[1] - MARGINS.top;

    const act_x = xScale1.invert(x_mouse);
    const act_y = yScale1.invert(y_mouse);

    // trace back to the actual data
    const closestIndex = d3.scan(data, (a, b) => Math.abs(a.Year - act_x) - Math.abs(b.Year - act_x));
    const act_year = data[closestIndex].Year;
    const act_p1 = data[closestIndex].Player1
    const act_p2 = data[closestIndex].Player2


    console.log("close", act_year, act_p1)

    console.log(x_mouse, y_mouse);
    console.log(mousePosition[0]);

    tooltip1.style("opacity", 0.7); 
    tooltip1.html("Year:" + act_year + ", Risk:" + act_p1).style("left", (xScale1(act_year) + MARGINS.left) + "px") //add offset from mouse
                    .style("top", (yScale1(act_p1) + 400) + "px");

    tooltipcircle1.attr("cx", xScale1(act_year) + MARGINS.left)
                          .attr("cy", yScale1(act_p1) + MARGINS.top)
                          .attr("opacity", 0.7);

    tooltip2.style("opacity", 0.7); 
    tooltip2.html("Year:" + act_year + ", Risk:" + act_p2).style("left", (xScale1(act_year) + MARGINS.left) + "px") //add offset from mouse
                    .style("top", (yScale2(act_p2) + 400) + "px");

    tooltipcircle2.attr("cx", xScale1(act_year) + MARGINS.left)
                    .attr("cy", yScale1(act_p2) + MARGINS.top)
                    .attr("opacity", 0.7);

    focus.style("visibility", "visible")
                .attr("x1", xScale1(act_year) + MARGINS.left)
                .attr("y1", MARGINS.top)
                .attr("x2", xScale1(act_year) + MARGINS.left)
                .attr("y2", FRAME_HEIGHT - MARGINS.bottom);
                

  };

  function onMouseLeave() {
    tooltip1.style("opacity", 0);
    tooltip2.style("opacity", 0);
    //tooltipCircle.style("opacity", 0);
  };


  const listeningRect = FRAME1.append("rect")
  .attr("class", "listening-rect")
  .attr("width", VIS_WIDTH + MARGINS.left)
  .attr("height", VIS_HEIGHT + MARGINS.bottom)
  .on("mousemove", onMouseMove)
  .on("mouseleave", onMouseLeave);

 ///////////////////////////////////////////////////////////////////////////////////

  // scale input x and y
const MAX_X1_re = d3.max(data, (d) => {
    return parseInt(d.Year);
  });
const MAX_Y1_re = d3.max(data, (d) => {
    return parseInt(d.Player1_re);
  });
const MAX_Y2_re = d3.max(data, (d) => {
    return parseInt(d.Player2_re);
  });

//define couple of linear scales
const xScale1_re = d3.scaleLinear()
  .domain([0, MAX_X1_re]) //d3.extent captures the min. & max from a set of values
    .range([0, VIS_WIDTH]); // map the sepalLength values in dataset to full width of;
const yScale1_re = d3.scaleLinear()
   .domain([0, MAX_Y1_re])  
   .range([VIS_HEIGHT, 0]); // map the petalLength values in dataset to full height of svg

const yScale2_re = d3.scaleLinear()
   .domain([0, MAX_Y2_re])  
   .range([VIS_HEIGHT, 0]); 

const tooltip1_re = d3.select('body')
                .append("div")
                    .attr("class", "tooltip")
                    .style("fill", "steelblue")
                    .style("opacity", 0);

const tooltip2_re = d3.select('body')
                .append("div")
                    .attr("class", "tooltip")
                    .style("fill", "steelblue")
                    .style("opacity", 0);

const tooltipcircle1_re = FRAME2.append("circle")
                  .attr("class", "circle")
                  .attr("id", "circle1")
                  .attr("cx", 300)
                  .attr("cy", 300)
                  .attr("r", 5)
                  .attr("fill", "black")
                  .attr("opacity", 0)

const tooltipcircle2_re = FRAME2.append("circle")
                  .attr("class", "circle")
                  .attr("id", "circle2")
                  .attr("cx", 350)
                  .attr("cy", 350)
                  .attr("r", 5)
                  .attr("fill", "black")
                  .attr("opacity", 0)

var focus_re = FRAME2.append("line")
.attr("stroke-dasharray", "3,7")
.attr("stroke", "black")
.attr("stroke-width", 2)
.attr("x1", MARGINS.left)
.attr("y1", MARGINS.top)
.attr("x2", MARGINS.left)
.attr("y2", VIS_HEIGHT)
.style("visibility", "hidden");      

// Add the line
var vis1_p1_re = FRAME2.append("path")  // Change here
.datum(data)  // Change here: Using datum for entire data
.attr("fill", "none")
.attr("stroke", "steelblue")
.attr("stroke-width", 2)
.attr("d", d3.line().curve(d3.curveStepAfter)
.x(d => (xScale1(d.Year) + MARGINS.left))
.y(d => (yScale1(d.Player1_re) + MARGINS.top))
);

// Add the line
var vis1_p2_re = FRAME2.append("path")  // Change here
.datum(data)  // Change here: Using datum for entire data
.attr("fill", "none")
.attr("stroke", "orange")
.attr("stroke-width", 2)
.attr("d", d3.line().curve(d3.curveStepAfter)
.x(d => (xScale1(d.Year) + MARGINS.left))
.y(d => (yScale1(d.Player2_re) + MARGINS.top))
);

// add x-axis and y-axis
const xaxis_re = FRAME2.append("g")
.attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.bottom) + ")")
.call(d3.axisBottom(xScale1_re));

const yaxis_re = FRAME2.append("g")
.attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
.call(d3.axisLeft(yScale1));

// Handmade legend
FRAME2.append("circle").attr("cx",100).attr("cy",80).attr("r", 6).style("fill", "steelblue")
FRAME2.append("circle").attr("cx",100).attr("cy",110).attr("r", 6).style("fill", "orange")
FRAME2.append("text").attr("x", 120).attr("y", 80).text("Player1").style("font-size", "15px").attr("alignment-baseline","middle")
FRAME2.append("text").attr("x", 120).attr("y", 110).text("Player2").style("font-size", "15px").attr("alignment-baseline","middle")


var yaxis_label_re = yaxis_re.append("text")
  .attr("x", -VIS_HEIGHT / 2)  // Adjust this value as needed to move the label further to the left
  .attr("y", -50)
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Predicted Risk")
  .style("fill", "black")
  .style("font-size", "15px");

var xaxis_label_re = xaxis_re.append("text")
.attr("x", 250)  // Adjust this value as needed to move the label further to the left
.attr("y", 50)
.attr("text-anchor", "middle")
.text("Year")
.style("fill", "black")
.style("font-size", "15px");

data.forEach(function(d) {
  //x mark (may be deleted)

  console.log(d.re_player1)
  console.log(d.re_player2)

  if (d.Year === d.re_player1){
    const xMark1_re = FRAME2.append("g")
    .attr("class", "x-mark");
          
    xMark1_re.append("line")
                  .attr("x1", -5)
                  .attr("y1", -5)
                  .attr("x2", 5)
                  .attr("y2", 5)
                  .attr("stroke", "red")
                  .attr("stroke-width", 2);
                
    xMark1_re.append("line")
                  .attr("x1", 5)
                  .attr("y1", -5)
                  .attr("x2", -5)
                  .attr("y2", 5)
                  .attr("stroke", "red")
                  .attr("stroke-width", 2);
                
    // Position the "X" mark at the specified x and y positions
    xMark1_re.attr("transform", `translate(${xScale1(d.Year) + MARGINS.left}, ${yScale1(d.Player1_re) + MARGINS.top})`);
        };

  if (d.Year === d.re_player2){
          const xMark2_re = FRAME2.append("g")
          .attr("class", "x-mark");
                
          xMark2_re.append("line")
                        .attr("x1", -5)
                        .attr("y1", -5)
                        .attr("x2", 5)
                        .attr("y2", 5)
                        .attr("stroke", "red")
                        .attr("stroke-width", 2);
                      
          xMark2_re.append("line")
                        .attr("x1", 5)
                        .attr("y1", -5)
                        .attr("x2", -5)
                        .attr("y2", 5)
                        .attr("stroke", "red")
                        .attr("stroke-width", 2);
                      
          // Position the "X" mark at the specified x and y positions
          xMark2_re.attr("transform", `translate(${xScale1(d.Year) + MARGINS.left}, ${yScale2(d.Player2_re) + MARGINS.top})`);
              };
});


function onMouseMove_re() {
const mousePosition = d3.pointer(event);
const x_mouse = mousePosition[0] - MARGINS.left;
const y_mouse = mousePosition[1] - MARGINS.top;

const act_x = xScale1_re.invert(x_mouse);
const act_y = yScale1_re.invert(y_mouse);

// trace back to the actual data
const closestIndex = d3.scan(data, (a, b) => Math.abs(a.Year - act_x) - Math.abs(b.Year - act_x));
const act_year = data[closestIndex].Year;
const act_p1 = data[closestIndex].Player1_re
const act_p2 = data[closestIndex].Player2_re


console.log("close", act_year, act_p1)

console.log(x_mouse, y_mouse);
console.log(mousePosition[0]);

tooltip1_re.style("opacity", 0.7); 
tooltip1_re.html("Year:" + act_year + ", Risk:" + act_p1).style("left", (xScale1(act_year) + MARGINS.left + 550) + "px") //add offset from mouse
        .style("top", (yScale1(act_p1) + 450) + "px")

tooltipcircle1_re.attr("cx", xScale1(act_year) + MARGINS.left)
              .attr("cy", yScale1(act_p1) + MARGINS.top)
              .attr("opacity", 0.7)

tooltip2_re.style("opacity", 0.7); 
tooltip2_re.html("Year:" + act_year + ", Risk:" + act_p2).style("left", (xScale1(act_year) + MARGINS.left + 550) + "px") //add offset from mouse
        .style("top", (yScale2(act_p2) + 400) + "px")

tooltipcircle2_re.attr("cx", xScale1(act_year) + MARGINS.left)
        .attr("cy", yScale1(act_p2) + MARGINS.top)
        .attr("opacity", 0.7)

focus_re.style("visibility", "visible")
    .attr("x1", xScale1(act_year) + MARGINS.left)
    .attr("y1", MARGINS.top)
    .attr("x2", xScale1(act_year) + MARGINS.left)
    .attr("y2", FRAME_HEIGHT - MARGINS.bottom);

};

function onMouseLeave() {
tooltip1.style("opacity", 0);
tooltip2.style("opacity", 0);
//tooltipCircle.style("opacity", 0);
};


const listeningRect_re = FRAME2.append("rect")
.attr("class", "listening-rect")
.attr("width", VIS_WIDTH + MARGINS.left)
.attr("height", VIS_HEIGHT + MARGINS.bottom)
.on("mousemove", onMouseMove_re)
.on("mouseleave", onMouseLeave);


$("#name_dropdown2").select2({
  tags: true
});

$(document).ready(function() {
  $('#name_dropdown2').select2();
});

$(document).ready(function() {
  $('#name_dropdown1').select2();
});



});
