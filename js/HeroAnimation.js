window.onload = async ()=>{    
    startAnimation()
}

function getCorrectImage(){
    const heroImages = document.querySelectorAll("#hero-image div")
    let heroImage = [].find.call(heroImages, function(el){
        let style = window.getComputedStyle(el)
        return style.display !== "none"
    })
    const heroSVGs = heroImage.querySelectorAll("svg")
    let heroSVG = [].find.call(heroSVGs, function(el){
        let style = window.getComputedStyle(el)
        return style.display !== "none"
    })
    const WHCircle = heroSVG.querySelector("#WindowsHello #WHCircle")
    const WHArc = heroSVG.querySelector("#WindowsHello #WHArc")
    const WHText = heroSVG.querySelector("#ScreenText")
    const WHText2 = heroSVG.querySelector("#ScreenText2")
    const WHCircleIR = heroSVG.querySelector("#WHCircleIR")
    const ActiveScreen = heroSVG.querySelector("#ActiveScreen")
    const aboutButton = heroSVG.querySelector("#HeroAboutButton")
    return {heroSVG, WHCircle, WHArc, WHText, WHText2, WHCircleIR, ActiveScreen, aboutButton}
}

export async function startAnimation(){
    console.log("Starting hero animation!")
    const elements = getCorrectImage()

    await resetStyles(elements)
    
    await turnOnScreen(elements)
    await animateHello(2400, elements)
    
    await changeText(300, elements)
    
    if(elements.aboutButton!==null) showAbout(elements) // For mobile only
}

function resetStyles(elements){
    return new Promise((res,rej)=>{
        elements.WHCircle.style.opacity = 0 
        elements.WHArc.style.opacity = 0
        elements.WHText.style.opacity = 0
        elements.WHText2.style.opacity = 0
        if(elements.aboutButton!==null){
            elements.aboutButton.style.transition = "none"
            elements.aboutButton.style.opacity = 0
        } 

        res()
    })
}

function animateHello(totalDuration, elements){

    return new Promise((res, rej)=>{       

        // Animate Dot on top
        let dotIntervalID = setInterval(() => {
            elements.WHCircleIR.setAttribute("fill", "red")
            setTimeout(() => {
                elements.WHCircleIR.setAttribute("fill", "none")                
            }, totalDuration/8);
        }, totalDuration/4);
            

        // Get initial transform (i.e. initial position)
        let initialTransform_Circle = elements.WHCircle.getAttribute("transform") || null
            
        // Set transition
        elements.WHCircle.style.transition = "all "+totalDuration/4+"ms ease"
        elements.WHArc.style.transition = "all "+totalDuration/4+"ms ease"

        // Look left
        setTimeout(() => {
            if(initialTransform_Circle){
                elements.WHCircle.setAttribute("transform", "matrix(0.49863 -0.052336 -0.13191 0.991262 525.287 141.602)")
                elements.WHArc.setAttribute("transform", "rotate(-0.4)")    
            } 
            else{
                elements.WHCircle.setAttribute("rx", "12.6919")
                elements.WHCircle.setAttribute("cx", "601.222")
            } 
            
            // Reset
            setTimeout(() => {
                if(initialTransform_Circle){
                    elements.WHCircle.setAttribute("transform", initialTransform_Circle)    
                } 
                else{
                    elements.WHCircle.setAttribute("rx", "17.6919")
                    elements.WHCircle.setAttribute("cx", "606.222")
                }
                elements.WHArc.setAttribute("transform", "rotate(0)")    
                // Look Right
                setTimeout(() => {
                    if(initialTransform_Circle){
                        elements.WHCircle.setAttribute("transform", "matrix(0.49863 -0.052336 -0.13191 0.991262 533.287 141.602)")                
                    } 
                    else {
                        elements.WHCircle.setAttribute("rx", "12.6919")
                        elements.WHCircle.setAttribute("cx", "611.222")
                    }
                    elements.WHArc.setAttribute("transform", "rotate(-0.4)")    
                    setTimeout(() => {
                        if(initialTransform_Circle){
                            elements.WHCircle.setAttribute("transform", initialTransform_Circle)    
                        } 
                        else{
                            elements.WHCircle.setAttribute("rx", "17.69")
                            elements.WHCircle.setAttribute("cx", "606.222")
                        }
                        elements.WHArc.style.transform = "none"  
                        clearInterval(dotIntervalID)
                        res() 
                    }, totalDuration/4);
                }, totalDuration/4);
            }, totalDuration/4);
        }, totalDuration/4);
    })
    
}

function turnOnScreen(elements){    
    return new Promise((res,rej)=>{        
        setTimeout(() => {
            if(elements.heroSVG.classList.contains("lightMode")) elements.ActiveScreen.setAttribute("fill", "#E1DCCF")    
            else elements.ActiveScreen.setAttribute("fill", "#3A3731")    
        }, 1000);
        setTimeout(() =>{
            // Show Windows Hello Icons and Texts
            elements.WHCircle.style.opacity = 1 
            elements.WHArc.style.opacity = 1 
            elements.WHText.style.opacity = 1            
        }, 1200);
        setTimeout(() => {
           res() 
        }, 1500);
    })
}

function changeText(timeAfter, elements){
    return new Promise((res,rej)=>{
        elements.WHText.setAttribute("style", 'transition: "opacity 300ms ease"') 
        elements.WHText.setAttribute("opacity", 0)  
        elements.WHText2.style.opacity = 1
        setTimeout(() => {
            res()
        }, timeAfter);
    })
    
}

function showDesktop(timeAfter){
    return new Promise((res,rej)=>{

        WHText2.style.opacity = 0
        WHCircle.style.opacity = 0
        WHArc.style.opacity = 0

        TaskBar.style.transition = "opacity "+timeAfter+ "ms ease"
        Icons.style.transition = "opacity "+timeAfter+ "ms ease"
        Icons.style.opacity = 1
        TaskBar.style.opacity = 1
        Icons.style.opacity = 1
        setTimeout(() => {
           res() 
        }, timeAfter);
    })
}

function animateIconsOnScreen(totalTime){
    return new Promise((res,rej)=>{
        let initialIconColor = "#9CE579"
        let iconFlickerID = setInterval(() => {            
            let separateIcons = Icons.querySelectorAll("path")
            let randomIcon = Math.floor(Math.random() * separateIcons.length)  
            
            separateIcons[randomIcon].setAttribute("stroke", "#ED4C72")
            setTimeout(() => {
                separateIcons[randomIcon].setAttribute("stroke", initialIconColor)
            }, 50);
        }, 100);
        setTimeout(() => {
            clearInterval(iconFlickerID)
        }, totalTime);
    })
}

function showAbout(elements){
    elements.aboutButton.style.transition = "opacity 300ms ease"
    elements.aboutButton.style.opacity = 1
}
