Plotly.newPlot("plotArea", [{ x: [1, 2, 3], y: [10, 20, 30] }]);

// Create a bar chart
var trace = {
  x: ["burrito", "pizza", "chicken"],
  y: [10, 18, 5],
  type: "bar",
};

var layout = {
  title: "Luncheon Survey",
  xaxis: { title: "Food Option" },
  yaxis: { title: "Number of Respondents" },
};

Plotly.newPlot("plotArea", [trace], layout);

// Bar Chart of non-alcoholic beverages
var trace = {
  x: [
    "nonalcoholic beer",
    "nonalcoholic wine",
    "nonalcoholic martini",
    "nonalcoholic margarita",
    "ice tea",
    "nonalcoholic rum & coke",
    "nonalcoholic mai tai",
    "nonalcoholic gin & tonic",
  ],
  y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
  type: "bar",
};
var data = [trace];
var layout = {
  title: "'Bar' Chart",
  xaxis: { title: "Drinks" },
  yaxis: { title: "% of Drinks Ordered" },
};
Plotly.newPlot("plotArea", data, layout);

// Pie chart
var trace = {
  labels: [
    "nonalcoholic beer",
    "nonalcoholic wine",
    "nonalcoholic martini",
    "nonalcoholic margarita",
    "ice tea",
    "nonalcoholic rum & coke",
    "nonalcoholic mai tai",
    "nonalcoholic gin & tonic",
  ],
  values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
  type: "pie",
};
var data = [trace];
var layout = {
  title: "'Pie' Chart",
};
Plotly.newPlot("plotArea", data, layout);

// Read the data
d3.json("samples.json").then(function (data) {
  console.log(data);
});

// Delete null values from the sorted array of wfreq
d3.json("samples.json").then(function (data) {
  wfreq = data.metadata.map((person) => person.wfreq).sort((a, b) => b - a);
  filteredWfreq = wfreq.filter((element) => element != null);
  console.log(filteredWfreq);
});

// Display the metadata of first individual from the dataset
d3.json("samples.json").then(function (data) {
  firstPerson = data.metadata[0];
  Object.entries(firstPerson).forEach(([key, value]) => {
    console.log(key + ": " + value);
  });
});

// CORS stands for Cross-Origin Resource Sharing. In short, browsers by default do not permit reading of resources
// from multiple sources. This restriction is in place because of security concerns.
