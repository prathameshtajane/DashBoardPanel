(function () {
    var	margin = {top: -100, right: 40, bottom: 70, left: 50},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var ROOT_SVG_WIDTH=1200;
    var ROOT_SVG_HEIGHT=800;

    /*Setting constants for Panel Dash Board*/
    var displayTransX = 0;
    var displayTransY = 20;
    var displayBoardBGColor="pink";
    var DASHBOARD_WIDTH=200;
    var DASHBOARD_HEIGHT=200;
    var PANEL1_COLOR="red";
    var PANEL2_COLOR="black";
    var PANEL3_COLOR="blue";
    var PANEL4_COLOR="green";

    /*Setting constants for Control Panel Board*/
    var buttonSVGWidth=100 + margin.left + margin.right;
    var buttonSVGHeight=300 + margin.left + margin.right;
    var controlPanelBGColor="black";
    var CPBUTTON_WIDTH=20;
    var CPBUTTON_HEIGHT=20;


    /* Implementation of DRAG behavior for Dashboard Panel*/
    var drag = d3.behavior.drag()
        .origin(function() {
            var t = d3.select(this);
            return {x: t.attr("x") + d3.transform(t.attr("transform")).translate[0],
                y: t.attr("y") + d3.transform(t.attr("transform")).translate[1]};
        })
        .on("drag", function(d,i) {
            d3.select(this).attr("transform", function(d,i){
                return "translate(" + [ d3.event.x,d3.event.y ] + ")"
            })
        });

    var	svgButtons = d3.select("body")
        .append("svg")
        .attr("width", buttonSVGWidth)
        .attr("height", buttonSVGHeight)
        .append("g");

    svgButtons.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", controlPanelBGColor)
        .style("stroke", d3.scale.category20c())
        .style('stroke-width', 5);

    var svgBody = d3.select("body").append("svg")
        .attr("width", ROOT_SVG_WIDTH)
        .attr("height", ROOT_SVG_HEIGHT);

    var	svgDisplay = svgBody.append("svg:g")
        .append("svg")
        .append("g")
        .attr("id", "svgDisplay")
        .attr("transform",
            "translate(" + displayTransX + "," + displayTransY + ")")

    svgDisplay.call(drag);

    /* Setting BG Color of Display Board */
    svgDisplay.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", displayBoardBGColor)
        .style("stroke", d3.scale.category20c())
        .style('stroke-width', 5);

    /* Setting Panel Parameters and location on Display Board */
    /* Panel 1 */
    svgDisplay.append("rect")
        .attr("x", 120)
        .attr("y", 120)
        .attr("width", DASHBOARD_WIDTH)
        .attr("height", DASHBOARD_HEIGHT)
        .attr("id", "panel1")
        .attr("fill",PANEL1_COLOR);

    /* Panel 2 */
    svgDisplay.append("rect")
        .attr("x", 360)
        .attr("y", 120)
        .attr("width", DASHBOARD_WIDTH)
        .attr("height", DASHBOARD_HEIGHT)
        .attr("id", "panel2");

    /* Panel 3 */
    svgDisplay.append("rect")
        .attr("x", 120)
        .attr("y", 360)
        .attr("width", DASHBOARD_WIDTH)
        .attr("height", DASHBOARD_HEIGHT)
        .attr("id", "panel3")
        .attr("fill",PANEL3_COLOR);

    /* Panel 4 */
    svgDisplay.append("rect")
        .attr("x", 360)
        .attr("y", 360)
        .attr("width", DASHBOARD_WIDTH)
        .attr("height", DASHBOARD_HEIGHT)
        .attr("id", "panel4")
        .attr("fill",PANEL4_COLOR);

    /* Implemention of Toggle function for Panels */
    var togglePanel = function(panelName){
        // Determine if current rectangle is visible
        console.log(String("#"+panelName));
        var rectNameCurr = d3.select(String("#"+panelName))[0][0];
        var active   = rectNameCurr.active  ? false : true ,
            newOpacity = active ? 0 : 1;
        // Hide or show the elements
        d3.select(String("#"+panelName)).style("opacity", newOpacity);
        // Update whether or not the elements are active
        rectNameCurr.active = active;
    };

    /* Setting Button Parameters and location on Control Panel*/

    /* Control Panel Button 1 */
    svgButtons.append("rect")
        .attr("x", 85)
        .attr("y", height + margin.top)
        .attr("width", CPBUTTON_WIDTH)
        .attr("height", CPBUTTON_HEIGHT)
        .style("fill", PANEL1_COLOR)
        .on("click", function () {
            togglePanel('panel1')
        });

    /* Control Panel Button 2 */
    svgButtons.append("rect")
        .attr("x", 85)
        .attr("y", height + margin.top - 40)
        .attr("width", CPBUTTON_WIDTH)
        .attr("height", CPBUTTON_HEIGHT)
        .style("fill", PANEL2_COLOR)
        .style("stroke","white")
        .style('stroke-width', 1)
        .on("click", function(){
            togglePanel('panel2')
        })

    /* Control Panel Button 3 */
    svgButtons.append("rect")
        .attr("x", 85)
        .attr("y", height + margin.top - 80)
        .attr("width", CPBUTTON_WIDTH)
        .attr("height", CPBUTTON_HEIGHT)
        .style("fill", PANEL3_COLOR)
        .on("click", function(){
            togglePanel('panel3')
        })

    /* Control Panel Button 4 */
    svgButtons.append("rect")
        .attr("x", 85)
        .attr("y", height + margin.top - 120)
        .attr("width", CPBUTTON_WIDTH)
        .attr("height", CPBUTTON_HEIGHT)
        .style("fill", PANEL4_COLOR)
        .on("click", function(){
            togglePanel('panel4')
        })

})();

