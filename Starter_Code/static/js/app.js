function plot(id){
    d3.json("samples.json").then(data => {
  
      console.log(data);
  
  var reference = data.samples.filter(sample => sample.id === id)[0];
  
      console.log(reference);
  
      var referencevalues = reference.sample_values.slice(0, 10).reverse();
  
      var otuTopIds = (reference.otu_ids.slice(0, 10)).reverse();
  
      otuId = otuTopIds.map(d => "OTU " + d);
  
      console.log(otuId);
  
  
      
      console.log(referencevalues);
  
      var trace1 = {
          x: referencevalues,
          y: otuId,
  
          marker: {
              color: 'rgb((142,124,195)'},
          type: "bar",
          orientation: "h"
      };
  
      var data = [trace1];
      var layout = {
          title: "Top 10 OTU",
          yaxis:{
              tickmode:"linear",
          },
          margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 30
          }
  
      };
  
      Plotly.newPlot("bar", data, layout);
  
      var trace2 = {
        x: reference.otu_ids,
        y: reference.sample_values,
        mode: "markers",
        marker: {
            size: reference.sample_values,
            color: reference.otu_ids
        },
        // text: labels
        };
  
      var data2 = [trace2];

      var layout2 = {
        xaxis:{title: "OTU ID"},
        height: 600,
        width: 1000
        };
  
      var trace2 = {
          x: reference.otu_ids,
          y: reference.sample_values,
          mode: "markers",
          marker: {
              size: reference.sample_values,
              color: reference.otu_ids
          },
  
      };
  
      Plotly.newPlot("bubble", data2, layout2)
   
  
    });
  };
  
  function metatable(id) {
      d3.json("samples.json").then(data => {
  
          var metadata = data.metadata;
  
          console.log(metadata);
  
          var item = metadata.filter(x => x.id == id)[0];
  
          var panel = d3.select("#sample-metadata");
  
          panel.html("")
  
          Object.entries(item).forEach((key) => {   
              panel.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
          });
  
          
      });
  
  };
  
  function selectionchanged() {
      plot(id);
      metadata(id)
  
  }
  
  function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then(data => {
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        plot(data.names[0]);
        metatable(data.names[0]);

        
      });
          
      }
      


  init();