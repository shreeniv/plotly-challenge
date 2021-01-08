// Define a function that will create metadata for given sample
function buildMetadata(sample) {
    var panelBody = d3.select("#sample-metadata");
    panelBody.html("");
    // Read the json data
    d3.json("samples.json").then((sampleData)=>{
        var metaData = sampleData.metadata;
        var resultData = metaData.filter(object=>object.id==sample);
      // Parse and filter the data to get the sample's metadata
        resultData = resultData[0]
        console.log(resultData);
        //console.log(metaData);
        // Specify the location of the metadata and update it
        Object.entries(resultData).forEach(([key, value])=>{
            panelBody.append("h6").text(`${key} ${value}`);
        });
        gaugeChart(resultData.wfreq);
    });
      
}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data
    d3.json("samples.json").then((sampleData)=>{
        var samples = sampleData.samples;
        //console.log(samples);
        var matchData = samples.filter(object=>object.id==sample);
       // Parse and filter the data to get the sample's OTU data
        matchData = matchData[0]
        console.log(matchData);
        // Pay attention to what data is required for each chart
        var otuId = matchData.otu_ids;
        var otuLables = matchData.otu_labels;
        var sampleValues = matchData.sample_values;
        
        // Create bubble chart in correct location
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
        
    })
}

// Define function that will run on page load
function init() {
    var dropDown = d3.select("#selDataset");
    // Read json data
    d3.json("samples.json").then((sampleData)=>{
        // Parse and filter data to get sample names
        var sampleIds = sampleData.names;
        console.log(sampleIds);
        // Add dropdown option for each sample
        sampleIds.forEach ((data)=>{
            dropDown.append("option")
            .text(data)
            .property("value",data);
        });
        // Use first sample to build metadata and initial plots
        var sampleValue = sampleIds[0];
        buildMetadata(sampleValue);
        buildCharts(sampleValue);
    });

}

function optionChanged(newSample){
    // Update metadata with newly selected sample
    buildMetadata(newSample);
    // Update charts with newly selected sample
    buildCharts(newSample);
    
}

// Initialize dashboard on page load
init();

