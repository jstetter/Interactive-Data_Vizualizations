function getPlots(id) {
        d3.json("samples.json").then (sampledata =>{
            var ids = sampledata.samples[0].otu_ids;
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            
            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
            var OTU_id = OTU_top.map(d => "OTU " + d);
           
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            
            var data = [trace];
    
    
            var layout = {
                
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 100
                }
            };
    
            
        Plotly.newPlot("bar", data, layout);
            // The bubble chart
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
            // set the layout for the bubble plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 400,
                width: 800
            };
    
            // creating data variable 
            var data1 = [trace1];
    
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  



    // get data
    function getDemoInfo(id) {
    // read the json file to get data
        d3.json("samples.json").then((data)=> {
            var metadata = data.metadata;
            var result = metadata.filter(meta => meta.id.toString() === id)[0];
            var demographicInfo = d3.select("#sample-metadata");
            demographicInfo.html("");
            Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }

    // change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    function init() {
        var dropdown = d3.select("#selDataset");
        d3.json("samples.json").then((data)=> {

            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");

            });

            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();

