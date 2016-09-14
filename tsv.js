(function(){

   function renderLineChart(tsvfile,identifier) {

        var svg = d3.select(identifier),
        margin = { top: 20, right: 80, bottom: 30, left: 50 },
        width = svg.attr("width") - margin.left - margin.right,
        height = svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

       

        var parseTime = d3.timeParse("%Y%m%d");

        var x = d3.scaleTime().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            z = d3.scaleOrdinal(d3.schemeCategory10);

        var line = d3.line()
            .curve(d3.curveBasis)
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y(d.counter); });

        var url = window.location.href;
        var arr = url.split("/");
        var currenturl = arr[0] + "//" + arr[2]
      
        var legendRectSize = 18;                                  // NEW
        var legendSpacing = 4;                                    // NEW
       

        d3.tsv(currenturl + "/" + tsvfile, type, function (error, data) {

            var legendRectSize = 18;                                  // legend
            var legendSpacing = 4;                                    // legend

            if (error) throw error;

            var orders = data.columns.slice(1).map(function (id) {
                return {
                    id: id,
                    values: data.map(function (d) {
                        return { date: d.date, counter: d[id] };
                    })
                };
            });

            x.domain(d3.extent(data, function (d) { return d.date; }));

            y.domain([
              d3.min(orders, function (c) { return d3.min(c.values, function (d) { return d.counter; }); }),
              d3.max(orders, function (c) { return d3.max(c.values, function (d) { return d.counter; }); })
            ]);

            z.domain(orders.map(function (c) { return c.id; }));

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y))              
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("fill", "#000")
                .text("Orders");

            var order = g.selectAll(".order")
                .data(orders)
                .enter()
                .append("g").attr("class", "order");

            order.append("path")
                .attr("class", "line")
                .attr("d", function (d) { return line(d.values); })
                .style("stroke", function (d) { return z(d.id); });

         
            // + legend here

            var legend = g.selectAll('.legend')
                 .data(z.domain())
                 .enter()
                 .append('g')
                 .attr('class', 'legend')
                .attr('transform', function (d, i) {
                    
                    var height = legendRectSize + legendSpacing;
                    var offset = height * z.domain().length / 2;
                    var horz = 2 * legendRectSize;
                    var vert = (i * height - offset) + 120;
                    return 'translate(' + horz + ',' + vert + ')';

                });


            legend.append('rect')
                  .attr('width', legendRectSize)
                  .attr('height', legendRectSize)
                  .style('fill', z)
                  .style('stroke', z);

            legend.append('text')
              .attr('x', legendRectSize + legendSpacing)
              .attr('y', legendRectSize - legendSpacing)
              .text(function (d) { return d; });

            // - legend
           
        });

        function type(d, _, columns) {
            d.date = parseTime(d.date);
            for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
            return d;
        }

       

    }
    renderLineChart("data.tsv", "#linechart");

})();