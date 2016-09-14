(function(){

 // start: automatic pie drawing


    var width = 600;
    var height = 360;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;
    var legendRectSize = 18;                                  // NEW
    var legendSpacing = 4;                                    // NEW
    var color = d3.scaleOrdinal(d3.schemeCategory20b);

   

    var pieData = [{
                label: 'kulafu',
                count: 100 
            },{
                label: 'sultan',
                count: 50
            },{
                label: 'datu',
                count: 75
            }]

     var svg = d3.select("#piecanvas")
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);

    var pie = d3.pie()
          .value(function (d) { return d.count; })
          .sort(null);

     var path = svg.selectAll('path')
          .data(pie(pieData))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function (d, i) {
              return color(d.data.label);
          });                   

          // start: pie legend

          var legend = svg.selectAll('.legend')                      
          .data(color.domain())                                    
          .enter()                                                 
          .append('g')                                             
          .attr('class', 'legend')                                 
          .attr('transform', function (d, i) {                     
              var height = legendRectSize + legendSpacing;         
              var offset = height * color.domain().length / 2;

              // center align     
              //var horz = -2 * legendRectSize; 
              //var vert = i * height - offset;
              
              var horz = 200;                  
              var vert = (i * height) - 180;    
                                    
              return 'translate(' + horz + ',' + vert + ')';       
          });                                                      

        legend.append('rect')                                      
          .attr('width', legendRectSize)                           
          .attr('height', legendRectSize)                          
          .style('fill', color)                                    
          .style('stroke', color);                                 

        legend.append('text')                                      
          .attr('x', legendRectSize + legendSpacing)               
          .attr('y', legendRectSize - legendSpacing)               
          .text(function (d) { return d; });                       

          // end: pie legend
          
    // end: automatic pie drawing
    
})();