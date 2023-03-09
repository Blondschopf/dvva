
// Only async functions can use the "await"-keyword to load the data asynchronously
async function drawChart() {

    // ----------------
    // 1. Access Data
    // ----------------
    let dataset = await d3.csv("./data/dataSet.csv");

    // some statistics
    console.log("N = ", dataset.length);
    console.log("X mean = ", d3.mean(dataset, function(dataset){
        return dataset.x
    }));
    console.log("Y mean = ", d3.mean(dataset, function(dataset){
        return dataset.y
    }));
    console.log("X median = ", d3.median(dataset, function(dataset){
        return dataset.x
    }));
    console.log("Y median = ", d3.median(dataset, function(dataset){
        return dataset.y
    }));



    // ----------------
    // 2. Define dimensions
    // ----------------
    const dimensions = {
        width: 700,
        height: 500,
        margin: {top: 20, right: 20, bottom: 35, left:35 },
        circleRadius: 4
    }

    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;


    // ----------------
    // 3. Creatoe SVG
    // ----------------
    const svg = d3.select("#vis")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .append("g")
            .attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)
            .attr("class", "vis");


    
    // ----------------
    // 4. Creatoe scales
    // ----------------
    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, function(dataset){
            return +dataset.x
        }))
        .range([0, dimensions.boundedWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, function(dataset){
            return +dataset.y
        }))
        .range([dimensions.boundedHeight, 0])
        .nice();



    // ----------------
    // 4. Draw Plot
    // ----------------

    const circles = svg.selectAll("circle")
        .data(dataset)
        .join("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 3);
}


drawChart();