// Pulled in data

function SettingMetaData(sample) {
    d3.json("../data/samples.json").then((data) => {
        var metadata= data.metadata;
        var results_array= metadata.filter(sample_object => 
            sample_object.id == sample);
        var results= results_array[0]
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(results).forEach(([key, value]) => { 
             panel.append("h6").text(`${key}: ${value}`);
      });
    });
}


// Use `d3.json` to fetch the sample data for the plots

function ChartBuilder(sample) {

    d3.json("../data/samples.json").then((data) => {
      var cultures = data.samples;
      var results_array= cultures.filter(sampleobject => sampleobject.id == sample);
      var results= results_array[0]
    // chart components
      var ids = results.otu_ids;
      var labels = results.otu_labels;
      var values = results.sample_values;



// title and dimentions of bar graph
      var bar_layout = {
        title: "The top 10 Cultures of Bacteria Found", margin: { t: 40, l: 170 }     
    };

//actual makeup of the bar graph     

      var bar_graph_data = [
          {
              x: values.slice(0,15).reverse(),
              y: ids.slice(0,15).map(otuID => `OTU ${otuID}`).reverse(),
              orientation: "h",
              text:labels.slice(0,15).reverse(),
              type:"bar"
          }
      ];

//set the bar graph
    Plotly.newPlot("bar" , bar_graph_data , bar_layout);


//dimentions of the bubble chart
    var Bubble_chart_Layout = {
        xaxis: { title: "OTU ID" },
        margin: { t: 0 },
        hovermode: "closest",
        };
    
//makeup of the bubble chart         
    var Bubble_chart_data = [
           {
            y: values,
            x: ids,
            text: labels,
            mode: "markers",
            marker: {
                size: values, color: ids
           }
    }];

//call the bubble chart
    Plotly.newPlot("bubble", Bubble_chart_data, Bubble_chart_Layout); 
})};

    
//Activate functions 
function init() {
    
    // refrencing dropdown select element
    var selector = d3.select("#selDataset");

    //call data wihin the function 
    d3.json("../data/samples.json").then((data) => {
        var samplenames = data.names;
        samplenames.forEach((sample) => {
          selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });

    //call previous functions into this one 
    const StartSample = samplenames[0];
    ChartBuilder(StartSample); SettingMetaData(StartSample); });
    
}

     // refresh data for new calls 

    function FreshData(FreshSample) {
    ChartBuilder(FreshSample); SettingMetaData(FreshSample);
     }
    
    //Run Function 
      init();