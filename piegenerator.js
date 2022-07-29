//Params
const params = {
    "radius": 30,
    "ringStrokeWidth": 8,
    "piegap": 25 // This is in %        
}
let color = d3.scaleOrdinal(d3.schemeCategory10);

export function fillNodes(element){    
    console.log("Running Pie Generator....")
    
    drawRing(element)
    drawPie(element)
}

function drawRing(node){      
    
    node
    .append('circle')
    .attr('id','ring-'+node.data()[0].id)
    .attr('r', params.radius)
    .attr('fill', 'white')
    .attr('stroke', function(d){
        return color(d.id)         
    })
    .attr('stroke-width', params.ringStrokeWidth)      

}

export function drawPie(node, pieColours){

    const nodeData = node.data()[0]
    const nodeID = nodeData.id
    const nodeChildren = nodeData.children
    if(!nodeChildren || nodeChildren.length === 0) return

    let colours = ["pink", "yellow", "green", "grey", "purple"]
    if(pieColours) colours = pieColours
    const radius = params.radius*(1 - params.piegap/100)        
    const perimeter = 2*Math.PI*radius    

    let sumPercentages = 0
    const percentagesCum = []

    nodeChildren.forEach(()=>{
        sumPercentages+=(100/nodeChildren.length)
        percentagesCum.push(sumPercentages)        
    })

    nodeChildren.forEach(function(childID, index){
        
        d3.select("#node-"+nodeID).append('circle')
            .attr('id','pie-'+childID)
            .attr("r", radius/2)
            .attr("fill", "transparent")
            .attr("stroke", colours[colours.length - 1 - index])
            .attr("stroke-width", radius)                
            .attr("stroke-dasharray", (percentagesCum[percentagesCum.length - 1 - index]*perimeter/200)+" "+perimeter/2)
            //.attr("transform", "rotate(-90) translate(-"+document.querySelector("svg").getAttribute("width")+")")
            .on("mouseover", lightenPie)
            .on("mouseout", revertPie)
    
    })    
}

export function colorPies(node){
    
    // Get children of node
    const children = node.data()[0].children
    let pieColors = []
    children.forEach(function(child){
        const strokeColor = d3.select("#ring-"+child).attr("stroke")
        pieColors.push(strokeColor)      
    })

    drawPie(node, pieColors)
    
}

function lightenPie(){
    d3.select(this)
        .style("opacity", 0.8)
        .style("cursor", "pointer")
}
function revertPie(){
    d3.select(this)
        .style("opacity", 1)
}

// export function zoomNode(e,d){    
    
    
//     d3.select(this)
//         .select("circle")
//         .transition()
//         .duration(300)
//         .attr("r", params.radius*2)    

//     if(d.children){
//         const innerRadius = params.radius*(1 - params.piegap/100)
//         d3.select(this)
//             .selectAll("circle")
//             .transition()
//             .duration(300)
//             .attr("r", function(){
//                 if(d3.select(this).attr("id").includes("ring")){
//                     console.log("Ring here")
//                     return d3.select(this).attr("r")*2
//                 }
//                 else return innerRadius*2
//             })
//             .attr("stroke-width", innerRadius*2)      
//             .attr("stroke-dasharray", function(d){
//                 console.log(d.children)
//                 // Convert data to percentages
//                 // var sumData = 0
//                 // var cumPercentage = 0
//                 // d.children.forEach((item)=>{
//                 //     sumData+=item.money
//                 //     console.log("Money: "+item.money)
//                 // })
//                 // const percentages = []
//                 // const percentagesCum = []
//                 // d.children.forEach((item)=>{
//                 //     percentages.push(item.money/sumData) // Generate percentages from data            
//                 // })
//                 // percentages.forEach((d,i)=>{
//                 //     percentagesCum.push(percentages[i]+cumPercentage)
//                 //     cumPercentage+=d
//                 // })
//                 // const newDashArray = (percentagesCum[percentagesCum.length - 1 - index]*perimeter/2)+" "+perimeter/2
//                 return d3.select(this).attr("stroke-dasharray")*2
//             })      
//     }   
    
// }