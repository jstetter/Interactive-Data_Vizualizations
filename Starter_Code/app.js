function makePlots(id) {
        d3.json("samples.json").then (sample_data =>{

            var ids = sample_data.samples[0].otu_ids;
            var sample_vals =  sample_data.samples[0].sample_values.slice(0,10).reverse();
            var labels =  sample_data.samples[0].otu_labels.slice(0,10);
            var OTU_top = ( sample_data.samples[0].otu_ids.slice(0, 10)).reverse();
            var OTU_id = OTU_top.map(d => "OTU " + d);
            var labels =  sample_data.samples[0].otu_labels.slice(0,10);
            
            var trace = {
                x: sample_vals,
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
                    l: 125,
                    r: 125,
                    t: 125,
                    b: 125
                }
            };
        Plotly.newPlot("bar", data, layout);



            var trace2 = {
                x: sample_data.samples[0].otu_ids,
                y: sample_data.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sample_data.samples[0].sample_values,
                    color: sample_data.samples[0].otu_ids
                },
                text:  sample_data.samples[0].otu_labels
            }
            var layout_2 = {
                height: 400,
                width: 800
            };
            var data2 = [trace2];
        Plotly.newPlot("bubble", data2, layout_2); 
        
        });
    }  


    function get_demographic_info(id) {
        d3.json("samples.json").then((data)=> {
            var metadata = data.metadata;
            var result = metadata.filter(meta => meta.id.toString() === id)[0];
            var demographic_info = d3.select("#sample-metadata");
            demographic_info.html("");
            Object.entries(result).forEach((key) => {   
            demographic_info.append("p").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }

    // change event
    function optionChanged(id) {
        makePlots(id);
        get_demographic_info(id);
    }
    
    // initialize function
    function init() {
        var drop_down = d3.select("#selDataset");
        d3.json("samples.json").then((data)=> {

            data.names.forEach(function(name) {
                drop_down.append("option").text(name).property("value");

            });

            makePlots(data.names[0]);
            get_demographic_info(data.names[0]);
        });
    }
    
    init();

