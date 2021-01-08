# plotly-challenge
Interactive dashboard to explore the Belly Button Biodiversity dataset created; 

Input dataset referenced from samples.json

Step 1: Plotly
Populated dropdown menu with all of the Sample ID's - When an option is selected, it updates all of the charts. This function takes the value of each dropdown option. functions are being defined
A horizontal bar chart with a dropdown menu is created to display the top 10 OTUs found in that individual.
otu_ids are the labels for the bar chart.
otu_labels is the hovertext for the chart.

Created a bubble chart that displays each sample using: 
otu_ids for the x values.
sample_values for the y values.
sample_values for the marker size.
otu_ids for the marker colors.
otu_labels for the text values.

Displaying sample metadata, i.e., an individual's demographic information, each key-value pair from the metadata JSON object.

Bonus:
used the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.
modified the example gauge code to account for values ranging from 0 through 9.
added code that updates the chart whenever a new sample is selected.
