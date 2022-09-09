function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    console.log(sampleNames);

    sampleNames.forEach((sample) => {
      // A menu option is appended to the dropdown menu and then given the text(sample)and its property is also assigned sample.
      selector.append("option").text(sample).property("value", sample);
    });
  });
}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);
    var result = resultArray[0];
    console.log(result);
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h5").text(`${key}: ${value}`);
    });
  });
}
