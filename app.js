(function(){
    
     var canvas = d3.select("#canvas")
                .append("svg")
                .attr("width",1000)
                .attr("height",500);

    var data = [
        {x1:10,y1:25,x2:30,y2:50},
        {x1:30,y1:50,x2:40,y2:80},
        {x1:40,y1:80,x2:60,y2:10},
        {x1:60,y1:10,x2:100,y2:90},
        {x1:100,y1:90,x2:120,y2:50},
        ];

    for(var d of data){
        
        canvas.append("line")                
                 .attr("x1",d.x1 * 5)
                 .attr("y1",d.y1 * 5)
                 .attr("x2",d.x2 * 5)
                 .attr("y2",d.y2 * 5)                 
                 .attr("stroke","green")
                 .attr("stroke-width",2);

    }

    for(var d of data){
        
        canvas.append("circle")                
                 .attr("cx",d.x1 * 5)
                 .attr("cy",d.y1 * 5)
                 .attr("r",5)
                 .attr("fill","green");

        canvas.append("circle")                
                 .attr("cx",d.x2 * 5)
                 .attr("cy",d.y2 * 5)
                 .attr("r",5)
                 .attr("fill","green");                 

    }                                       

     var data = [
        {x1:10,y1:28,x2:30,y2:80},
        {x1:30,y1:80,x2:40,y2:20},
        {x1:40,y1:20,x2:60,y2:75},
        {x1:60,y1:75,x2:100,y2:20},
        {x1:100,y1:20,x2:120,y2:67},
        ];
       
  /* --- 2 color ---- */

  
    for(var d of data){
        
        canvas.append("line")                
                 .attr("x1",d.x1 * 5)
                 .attr("y1",d.y1 * 5)
                 .attr("x2",d.x2 * 5)
                 .attr("y2",d.y2 * 5)                 
                 .attr("stroke","gold")
                 .attr("stroke-width",2);

    }

    for(var d of data){
        
        canvas.append("circle")                
                 .attr("cx",d.x1 * 5)
                 .attr("cy",d.y1 * 5)
                 .attr("r",5)
                 .attr("fill","gold");

        canvas.append("circle")                
                 .attr("cx",d.x2 * 5)
                 .attr("cy",d.y2 * 5)
                 .attr("r",5)
                 .attr("fill","gold");                 

    }     
    
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