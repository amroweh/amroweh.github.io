const nodes_url = 'https://my-json-server.typicode.com/amroweh/D3TestAPI/nodes'
const links_url = 'https://my-json-server.typicode.com/amroweh/D3TestAPI/links'

function getData(url){           
    return fetch(url)
        .then(data => {return data.json()})
        .then(res => {return res})
        .catch(err => console.log(err))
}

export async function getNewNodes(){
    
    let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    console.log(uniqueId)
    const newnode = await getData(nodes_url)    
    newnode[0].id = uniqueId
    return newnode

    // return await getData(nodes_url) // Uncomment if id is given by server
}
export async function getNewLinks(){
    return await getData(links_url)    
}   