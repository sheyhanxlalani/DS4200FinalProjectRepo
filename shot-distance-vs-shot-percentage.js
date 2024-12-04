// load data
const percentages = d3.csv("nba-late-game-shots-with-shooting-percentage.csv");

// plot shot distance vs shot percentage data
percentages.then(function(data) {
    
    // convert string values to numbers
    data.forEach(function(d) {
        d.SHOT_DISTANCE = +d.SHOT_DISTANCE;
        d.SHOOTING_PERCENTAGE = +d.SHOOTING_PERCENTAGE;
    });

    // define dimensions + margins for svg
    const width = 600, height = 400;
    const margin = {top: 30, bottom: 30, left: 30, right: 30};

    // create the SVG container
    const svg = d3.select("#scatterplot")
      .attr("width", width)
      .attr("height", height)
      .style('background', '#ede1d1');
      
    // set up scales for x and y axes
    const x = d3.scaleLinear()
        .domain([d3.min(data, d => d.SHOT_DISTANCE), d3.max(data, d => d.SHOT_DISTANCE)+5])
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([d3.min(data, d => d.SHOOTING_PERCENTAGE), d3.max(data, d => d.SHOOTING_PERCENTAGE)+5])
        .range([height - margin.bottom, margin.top]);

    // add scales     

    svg.append('g')
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom().scale(x));
        
    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(y));


    // add data points
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => x(d.SHOT_DISTANCE))
        .attr("cy", d => y(d.SHOOTING_PERCENTAGE))
        .attr("r", 5)
        .style("fill", "#f88158")
        .style("opacity", 0.6);
    
});
