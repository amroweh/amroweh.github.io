import { getNewNodes, getNewLinks } from './serverFunctions.js'
import { fillNodes, colorPies } from './piegenerator.js'

var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height");    

// var a = {id: "a", children: ["b", "c"]},
//     b = {id: "b", children: []},
//     c = {id: "c", children: []},
//     nodes = [a, b, c],
//     links = [{source: a, target: b}];

let root = {id: "0", children: []}
let nodes = [root]
let links = []

var simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-1000))
    .force("link", d3.forceLink(links).distance(200))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .alphaTarget(1)
    .on("tick", ticked);

var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    link = g.append("g").attr("stroke", "#000").attr("stroke-width", 1.5).attr("class", "links").selectAll(".link"),
    node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).attr("class", "nodes").selectAll(".node");

    // Adds links and nodes to html and assigns coordinates
    restart();

function addElements(newnodes, newlinks, parentID){
    
    // Push new nodes to node list
    newnodes.forEach((newnode)=>{
        // Add child id to parent children
        nodes.filter(node => {return node.id === parentID})[0].children.push(newnode.id) 
        // Push new node to node list
        nodes.push(newnode)
    })
    // Push new links to links list
    newlinks.forEach((newlink)=>{      
        const source = simulation.nodes().filter(node => {return node.id === newlink.source})[0]        
        const target = simulation.nodes().filter(node => {return node.id === newlink.target})[0]        
        links.push({source: source, target: target})        
    })
    // Re-assign coordinates
    restart()
    console.log(nodes)
}

function removeNode(nodeIdToRemove){
    // Find all children nodes
    let nodeChildren = []    
    getNodeChildren(nodes, nodeIdToRemove, nodeChildren)    
    // Remove selected node
    for (let index = 0; index < nodes.length; index++) {        
        if(nodes[index].id === nodeIdToRemove) {nodes.splice(index, 1); break;}
    }
    // Remove children nodes
    nodeChildren.forEach((nodeToRemoveID)=>{
        for (let index = 0; index < nodes.length; index++) {        
            if(nodes[index].id === nodeToRemoveID) {nodes.splice(index, 1); break;}
        }
    })
    
    // Look for links shared by node and remove them
    // This was used instead of a for loop because the number of links may change within the iteration
    // if a common link was found, resulting in the index being out of bound
    if(links.length != 0){ // Only perform this if there are still links
        const numberOfLinks = links.length
        let targetedLinks = 0
        for (let index = 0; index < numberOfLinks; index++) {
            if(links[index].source.id === nodeIdToRemove || links[index].target.id === nodeIdToRemove
                || nodeChildren.includes(links[index].source.id) || nodeChildren.includes(links[index].target.id)
                ) 
            {
                targetedLinks++
            }
        }
        
        let index = 0
        while(targetedLinks != 0 || index == numberOfLinks){        
            if(links[index].source.id === nodeIdToRemove || links[index].target.id === nodeIdToRemove
                || nodeChildren.includes(links[index].source.id) || nodeChildren.includes(links[index].target.id)) 
            {
                links.splice(index, 1);
                targetedLinks--            
            }
            else index++                
        }
    }
    
    // Remove node from parent children list
    nodes.forEach((node)=>{
        let children = node.children
        for (let i = 0; i < children.length; i++) {
            if(children[i] === nodeIdToRemove) {
                children.splice(i, 1);
            }                
        }
    })

    restart()
}

function restart() {
    
    // Apply the general update pattern to the nodes.
  node = node.data(nodes, function(d) { return d.id;});
  node.exit().remove();
  node = node.enter()
    .append("g")
    .attr("class", "node") 
    .attr("id", (d)=>{return "node-"+d.id})
    .each(function(){
        fillNodes(d3.select(this))
    })
    .merge(node)
    .on("click", (e,d)=>{
            // Get new node from server (simulated using serverFunctions) on node click 
            getNewNodes().then((res)=>{                
                res.forEach((newnode)=>{
                    addElements([newnode], [{source: d.id, target:newnode.id}], d.id)
                })                
            })
        })        
    .on("contextmenu", function(e,d){
            // Removes node which was right clicked            
            e.preventDefault()
            removeNode(d.id)
        })
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );
    

  // Apply the general update pattern to the links.
  link = link.data(links, function(d) { return d.source.id + "-" + d.target.id; });
  link.exit().remove();
  link = link.enter().append("line").attr("class", "link").merge(link);

  // Update and restart the simulation.
  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();

  // Additional custom functions
  node.each(function(){
    // Update parent pie chart when child is added    
    fillNodes(d3.select(this)) // Adds pie charts to parent nodes
    colorPies(d3.select(this)) // Colors pie segments based on children colours
  })

  // Print resulting node and links list
  console.log("Nodes: ")
  console.log(nodes)
  console.log("Links: ")
  console.log(links)

}

function ticked() {
  node.selectAll("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })

  link.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });
}

// Drag functions: these are the functions that will be called as we click on a node
// and attempt to drag them
function dragstarted(e,d) {
    //your alpha hit 0 it stops! make it run again
    simulation.alphaTarget(1).restart();
    d.fx = e.x;
    d.fy = e.y;
}
function dragged(e,d) {
    d.fx = e.x;
    d.fy = e.y;
}
function dragended(e,d) {
    // alpha min is 0, head there
    simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// Helper functions
function getNodeChildren(nodeList, nodeID, arr){    
    console.log(nodeID)
    let selectedNode = nodeList.filter(node => {return node.id === nodeID})[0]
    let childNodeIds = selectedNode.children   
    if(!childNodeIds || childNodeIds.length == 0) return 
    else {
        childNodeIds.forEach((childnode)=>{
            arr.push(childnode)
            getNodeChildren(nodeList, childnode, arr)
        })        
    }
}
