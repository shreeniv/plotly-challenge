/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

// Define a function that will create metadata for given sample
function buildMetadata(sample) {
    var panelBody = d3.select("#sample-metadata");
    panelBody.html("");
    // Read the json data
    d3.json("samples.json").then((sampleData)=>{
        var metaData = sampleData.metadata;
        var resultData = metaData.filter(object=>object.id==sample);
        resultData = resultData[0]
        console.log(resultData);
        //console.log(metaData);
        Object.entries(resultData).forEach(([key, value])=>{
            panelBody.append("h6").text(`${key} ${value}`);

        });
    });
        // Parse and filter the data to get the sample's metadata

        // Specify the location of the metadata and update it

}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data
    d3.json("samples.json").then((sampleData)=>{
        var samples = sampleData.samples;
        //console.log(samples);
        var matchData = samples.filter(object=>object.id==sample);
        matchData = matchData[0]
        console.log(matchData);
        var otuId = matchData.otu_ids;
        var otuLables = matchData.otu_labels;
        var sampleValues = matchData.sample_values;
        var bubbleData = [{
            x: otuId,
            y: sampleValues,
            text: otuLables,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuId,
                colorscale: "Earth"
            }
        }];
        Plotly.newPlot("bubble", bubbleData);
    
        // Parse and filter the data to get the sample's OTU data
        // Pay attention to what data is required for each chart
        
        // Create bar chart in correct location
        var barChart = [{
            x: sampleValues.slice(0,10).reverse(),
            y: otuId.slice(0,10).map(otuId=>`OTU ${otuId}`).reverse(),
            text: otuLables.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
          }
        ];
         
        Plotly.newPlot("bar", barChart);
        // Create bubble chart in correct location
    })
}

// Define function that will run on page load
function init() {
    var dropDown = d3.select("#selDataset");
    // Read json data
    d3.json("samples.json").then((sampleData)=>{
        var sampleIds = sampleData.names;
        console.log(sampleIds);
        sampleIds.forEach ((data)=>{
            dropDown.append("option")
            .text(data)
            .property("value",data);
        });
        var sampleValue = sampleIds[0];
        buildMetadata(sampleValue);
        buildCharts(sampleValue);
    });
        // Parse and filter data to get sample names

        // Add dropdown option for each sample

    // Use first sample to build metadata and initial plots

}

function optionChanged(newSample){
    buildMetadata(newSample);
    buildCharts(newSample);

    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

