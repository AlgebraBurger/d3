(function(){
    
     var canvas = d3.select("#canvas")
                .append("svg")
                .attr("width",1000)
                .attr("height",1000);

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
                                                                               

})();