function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Demographics Panel
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array.
    var samples = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter((sampleObj) => sampleObj.id === sample);

    // Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var resultArrayMetadata = metadata.filter(
      (sampleobject) => sampleobject.id == sample
    );
    // Create a variable that holds the first sample in the array.
    var resultSample = resultArray[0];
    // Create a variable that holds the first sample in the metadata array.
    var resultMetadata = resultArrayMetadata[0];
    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = resultSample.otu_ids;
    var otu_labels = resultSample.otu_labels;
    var sample_values = resultSample.sample_values;

    // Create a variable that holds the washing frequency.
    var wfreq = resultMetadata.wfreq;
    console.log(wfreq);
    // Create the yticks for the bar chart.
    var yticks = otu_ids
      .slice(0, 10)
      .map((otuID) => `OTU ${otuID}`)
      .reverse();

    var xticks = sample_values.slice(0, 10).reverse();

    // Create the trace for the bar chart.
    var trace = {
      x: xticks,
      y: yticks,
      text: otu_labels,
      type: "bar",
      orientation: "h",
    };
    var barData = [trace];

    // Create the layout for the bar chart.
    var barLayout = {
      title: "Top 10 bacteria cultures found",
    };

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", barData, barLayout);

    // Create a bubble chart
    // Create the trace for the bubble chart.
    var bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        color: otu_ids,
        size: sample_values,
      },
    };
    var bubbleData = [bubbleTrace];

    // Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria cultures per sample",
      xaxis: { title: "OTU ID" },
      hovermode: "closest",
    };

    // Use Plotly to plot the bubble data and layout.    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: "Belly Button Washing Frequency(Scrubs per Week)" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          bar: { color: "black" },
          axis: { range: [null, 10] },
          steps: [
            { range: [0, 2], color: "rgb(255, 0, 0)" },
            { range: [2, 4], color: "rgb(253, 162, 73)" },
            { range: [4, 6], color: "rgb(255, 255, 0)" },
            { range: [6, 8], color: "rgb(50, 205, 50)" },
            { range: [8, 10], color: "rgb(0, 100, 0)" },
          ],
        },
      },
    ];

    // Create the layout for the gauge chart.
    var gaugeLayout = { width: 550, height: 400, margin: { t: 0, b: 0 } };

    // Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
