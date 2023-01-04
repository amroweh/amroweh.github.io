// Get Sections
const animate_about_headline = document.querySelector("#about-headline")
const animate_about = document.querySelector("#about")
const animate_projects_headline = document.querySelector("#projects-headline")
const animate_project1 = document.querySelector("#project1")
const animate_project2 = document.querySelector("#project2")
const animate_project3 = document.querySelector("#project3")
const animate_testimony = document.querySelector("#testimony")
const animate_contact = document.querySelector("#contact")

// Set Initial Scroll Position
let initialScroll = 0

// Section Animations
function animateDown(element, delay=0){
    gsap.from(element, { y: '100%', ease: 'expo', delay:delay})
    gsap.from(element, { opacity: 0, ease: 'expo', delay:delay})
    gsap.to(element, { duration: 1.5, y: 0, ease: 'expo', delay:delay})
    gsap.to(element, { duration: 1.5, opacity: 1, ease: 'expo', delay:delay})
}

function animateLeft(element, delay=0){
    gsap.from(element, { x: '-100%', ease: 'expo', delay:delay})
    gsap.from(element, { opacity: 0, ease: 'expo', delay:delay})
    gsap.to(element, { duration: 1.5, x: 0, ease: 'expo', delay:delay})
    gsap.to(element, { duration: 1.5, opacity: 1, ease: 'expo', delay:delay})
}

function animateRight(element, delay=0){
    gsap.from(element, { x: '100%', ease: 'expo', delay:delay})
    gsap.from(element, { opacity: 0, ease: 'expo', delay:delay})
    gsap.to(element, { duration: 1.5, x: 0, ease: 'expo', delay:delay})
    gsap.to(element, { duration: 1.5, opacity: 1, ease: 'expo', delay:delay})
}

function animateFadeIn(element, delay){
    gsap.from(element, { opacity: 0, ease: 'expo', delay:delay})    
    gsap.to(element, { duration: 1, opacity: 1, ease: 'expo', delay:delay})
}

// Functions to Determine Location 
function isInView(currentY, section){
    let sectionStart = section.offsetTop
    let sectionEnd = sectionStart + section.offsetHeight
    if(currentY>sectionStart-window.innerHeight && currentY<sectionEnd) return true
    return false
}

function isInCloseView(currentY, section, factor=0.5){
    let sectionStart = section.offsetTop
    let sectionEnd = sectionStart + section.offsetHeight
    if(currentY>sectionStart- factor*window.innerHeight && currentY<sectionEnd) return true
    return false
}

// function isInSection(currentY, section){
//     sectionStart = section.offsetTop
//     if(currentY>sectionStart && currentY<(sectionStart+section.offsetHeight)) return true
//     return false
// }

// Vector Animations

// function animatePC(){
//     let mainSvg = document.querySelector("#project1-svg").contentDocument
//     let headerText = mainSvg.querySelector("#p1-header-text")
//     let iswaLogo = mainSvg.querySelector("#p1-iswa-logo")
//     let iswaTitle = mainSvg.querySelector("#p1-iswa-title")
//     let iswaSubtitle = mainSvg.querySelector("#p1-iswa-subtitle")
//     let iswaLogoText = mainSvg.querySelector("#p1-iswa-logo-text")
//     let buttonBorder = mainSvg.querySelector("#p1-btn-border")
//     let buttonText = mainSvg.querySelector("#p1-btn-text")
//     let headerBorder = mainSvg.querySelector("#p1-header-border")
//     let cloud = mainSvg.querySelector("#p1-cloud")
//     let tree = mainSvg.querySelector("#p1-tree")

//     let keyboardAnimationColor = "#ED4C72"

//     let all = [headerText, iswaLogo, iswaTitle, iswaSubtitle, iswaLogoText, buttonBorder, buttonText, headerBorder, cloud, tree]
//     all.forEach(item=>{
//         // Initiate opacity of screen elements to 0 so they appear after typing
//         item.style.transition = "none"
//         item.style.opacity = 0        
//     })

//     keyboardKeysAnimationID = setInterval(() => {
//         let keyboardButtons = mainSvg.querySelectorAll("#p1-keyboard-buttons path")        
//         let randomKey = Math.floor(Math.random() * keyboardButtons.length)  
        
//         keyboardButtons[randomKey].setAttribute("fill", keyboardAnimationColor)
//         setTimeout(() => {
//             keyboardButtons[randomKey].setAttribute("fill", "none")
//         }, 100)
        
//     }, 50)    
//     setTimeout(() => {
//         console.log("Reverting Opacities")
//         all.forEach(item=>item.style.transition = "opacity 1000ms ease")         
//         all.forEach(item=>item.style.opacity = 1) 
//     }, 1000);
//     setTimeout(() => {
//         console.log("Removing Interval")
//         clearInterval(keyboardKeysAnimationID)
//     }, 2000);
// }

// function animateWorldCircles(circles){
//     let group1 = []
//     let group2 = []
//     let group3 = []
//     let group4 = []
//     let group5 = []
//     circles.forEach(circle=>{
//         let y = circle.getAttribute("cy")
//         console.log(y)
//         if(y<200) group1.push(circle)
//         if(y>=200 && y<400) group2.push(circle)
//         if(y>=400 && y<600) group3.push(circle)
//         if(y>=600 && y<800) group4.push(circle)
//         if(y>800) group5.push(circle)
//     })

//     let animationSectionDuration = 500
//     let animationCircleColor = "#ED4C72"

//     // Top group
//     worldNetworkAnimationID_g1 = setInterval(() => {
//         let group1Entries = group1.length
//         let randomCircle = Math.floor(Math.random() * group1Entries)  
//         group1[randomCircle].setAttribute("fill", animationCircleColor)        
//         setTimeout(() => {
//             group1[randomCircle].setAttribute("fill", "white")
//         }, 100)        
//     }, 50)  
//     setTimeout(() => {
//         console.log("Stopping World Animation group 1")
//         clearInterval(worldNetworkAnimationID_g1)
//     }, animationSectionDuration);

//     // 2nd group - to wait 500ms until 1st group finishes
//     setTimeout(() => {
//         worldNetworkAnimationID_g2 = setInterval(() => {
//             let group2Entries = group2.length
//             let randomCircle = Math.floor(Math.random() * (group2Entries-1))  
//             group2[randomCircle].setAttribute("fill", animationCircleColor)        
//             setTimeout(() => {
//                 group2[randomCircle].setAttribute("fill", "white")
//             }, 100)        
//         }, 50)
//     }, animationSectionDuration);
//     setTimeout(() => {
//         console.log("Stopping World Animation group 2")
//         clearInterval(worldNetworkAnimationID_g2)
//     }, animationSectionDuration*2);
    
//     // 3rd group - to wait 500ms until 2nd group finishes
//     setTimeout(() => {
//         worldNetworkAnimationID_g3 = setInterval(() => {
//             let group3Entries = group3.length
//             let randomCircle = Math.floor(Math.random() * (group3Entries-1))  
//             group3[randomCircle].setAttribute("fill", animationCircleColor)        
//             setTimeout(() => {
//                 group3[randomCircle].setAttribute("fill", "white")
//             }, 100)        
//         }, 50)
//     }, animationSectionDuration*2);
//     setTimeout(() => {
//         console.log("Stopping World Animation group 3")
//         clearInterval(worldNetworkAnimationID_g3)
//     }, animationSectionDuration*3);

//     // 4th group - to wait 500ms until 3rd group finishes
//     setTimeout(() => {
//         worldNetworkAnimationID_g4 = setInterval(() => {
//             let group4Entries = group4.length
//             let randomCircle = Math.floor(Math.random() * (group4Entries-1))  
//             group4[randomCircle].setAttribute("fill", animationCircleColor)        
//             setTimeout(() => {
//                 group4[randomCircle].setAttribute("fill", "white")
//             }, 100)        
//         }, 50)
//     }, animationSectionDuration*3);
//     setTimeout(() => {
//         console.log("Stopping World Animation group 4")
//         clearInterval(worldNetworkAnimationID_g4)
//     }, animationSectionDuration*4);

//     // 5th group - to wait 500ms until 4th group finishes
//     setTimeout(() => {
//         worldNetworkAnimationID_g5 = setInterval(() => {
//             let group5Entries = group5.length
//             let randomCircle = Math.floor(Math.random() * (group5Entries-1))  
//             group5[randomCircle].setAttribute("fill", animationCircleColor)        
//             setTimeout(() => {
//                 group5[randomCircle].setAttribute("fill", "white")
//             }, 100)        
//         }, 50)
//     }, animationSectionDuration*4);
//     setTimeout(() => {
//         console.log("Stopping World Animation group 5")
//         clearInterval(worldNetworkAnimationID_g5)
//     }, animationSectionDuration*5);
// }

// function animateWorldArcs(arcs){    

//     // arcs.forEach(arc=>{
//     //     console.log(arc)
//     //     let y = arc.getAttribute("cy")
//     //     console.log(y)
//     //     if(y<200) group1.push(arc)
//     //     if(y>=200 && y<400) group2.push(arc)
//     //     if(y>=400 && y<600) group3.push(arc)
//     //     if(y>=600 && y<800) group4.push(arc)
//     //     if(y>800) group5.push(arc)
//     // })

    
// }

// function animateWorld(){
//     let mainSvg = document.querySelector("#project2-svg").contentDocument
//     let svg = mainSvg.querySelector("svg")
//     let circles = svg.querySelectorAll("#p2-circles circle")
//     let arcs = svg.querySelectorAll("#p2-arcs path")

//     animateWorldCircles(circles)
//     animateWorldArcs(arcs)
// }

// function animateFoodNetwork(){
//     console.log("Animating Food Network!")

//     let linkColor = "#ED4C72"

//     let mainSvg = document.querySelector("#project3-svg").contentDocument
//     let svg = mainSvg.querySelector("svg")
//     let Foods = svg.querySelector("#Foods").querySelector("#Rectangles").querySelectorAll("rect:not(#mainRect)")
//     let mainRect = svg.querySelector("#Foods").querySelector("#Rectangles").querySelector("#mainRect")
//     let Links = svg.querySelector("#Lines").querySelectorAll("path")

//     FoodNetworkLinksID = setInterval(() => {
//         let numberOfLinks = Links.length
//         let randomLink = Math.floor(Math.random() * numberOfLinks)  
//         Links[randomLink].setAttribute("stroke", linkColor)        
//         setTimeout(() => {
//             Links[randomLink].setAttribute("stroke", "#9CE579")
//         }, 100)        
//     }, 50)  
//     setTimeout(() => {
//         clearInterval(FoodNetworkLinksID)
//     }, 2000);

//     FoodNetworkDBFoodsID = setInterval(() => { 
//         let numberOfFoods = Foods.length
//         let randomFood = Math.floor(Math.random() * numberOfFoods)  
//         Foods[randomFood].setAttribute("stroke", linkColor)
//         setTimeout(() => {
//             Foods[randomFood].setAttribute("stroke", "#9CE579")
//         }, 100)        
//     }, 50)  
//     setTimeout(() => {
//         clearInterval(FoodNetworkDBFoodsID)
//     }, 2000);
//     console.log(Foods)
//     // Middle Rectangle
//     FoodNetworkMidRectID = setInterval(() => { 
//         mainRect.setAttribute("fill", linkColor)
//         setTimeout(() => {
//             mainRect.setAttribute("fill", "#9CE579")
//         }, 250)        
//     }, 500)  
//     setTimeout(() => {
//         clearInterval(FoodNetworkMidRectID)
//     }, 2000);


// }

function animatePC(){
    console.log("Animating PC")
    let keyboardAnimationColor = "#ED4C72"
    let p1_svgs = document.querySelectorAll("#project1.project svg")
    
    // Ensure we only get non-hidden images
    let p1_svg = [].find.call(p1_svgs, function(el){
        let style = window.getComputedStyle(el)
        return style.display !== "none"
    })
    let p1_screenContent = p1_svg.querySelectorAll(".p_ISWA_logo, .p_tree, .p_screen_lines, .p_screen_text, .p_cloud")
        
    // Makes screen appear after 1 s
    p1_screenContent.forEach(item=>{
        item.style.transition = "none"
        item.style.opacity = 0
    })
    setTimeout(() => {
        p1_screenContent.forEach(item=>item.style.transition = "opacity 1000ms ease")         
        p1_screenContent.forEach(item=>item.style.opacity = 1) 
    }, 1000);
    
    // Shows keyboard typing animation
    
    // p1_keyboardKeys.forEach(item => item.style.fill = "yellow")
    let keyboardKeysAnimationID = setInterval(() => {
        let p1_keyboardKeys = p1_svg.querySelector(".p_Keyboard").querySelectorAll("path")    
        let randomKey = Math.floor(Math.random() * p1_keyboardKeys.length)  
        
        p1_keyboardKeys[randomKey].setAttribute("fill", keyboardAnimationColor)
        setTimeout(() => {
            p1_keyboardKeys[randomKey].setAttribute("fill", "none")
        }, 100)        
    }, 50)    
    setTimeout(() => {
        clearInterval(keyboardKeysAnimationID)
    }, 2000);
    
}

function animateWorld(){

    let animationCircleColor = "#ED4C72"
    let animationArcTransitionColor = "#ED4C72"
    
       
    let p2_svgs_bothColor = document.querySelectorAll("#project2 #p2-dark,#project2 #p2-light")
    // Ensure we get correct coloured svgs
    let p2_svgs = [].find.call(p2_svgs_bothColor, function(el){
        let style = window.getComputedStyle(el)
        return style.display !== "none"
    })
    p2_svgs = p2_svgs.querySelectorAll("svg")
    // Ensure we only get non-hidden images
    let p2_svg = [].find.call(p2_svgs, function(el){
        let style = window.getComputedStyle(el)
        return style.display !== "none"
    })
    let circles = p2_svg.querySelectorAll(".p2-circles circle")
    let arcs = p2_svg.querySelectorAll(".p2-arcs path")

    let initialCircleColor = circles[0].getAttribute("fill")
        
    let group1 = []
    let group2 = []
    let group3 = []
    let group4 = []
    let group5 = []
    circles.forEach(circle=>{
        let y = circle.getAttribute("cy")
        if(y<200) group1.push(circle)
        if(y>=200 && y<400) group2.push(circle)
        if(y>=400 && y<600) group3.push(circle)
        if(y>=600 && y<800) group4.push(circle)
        if(y>800) group5.push(circle)
    })

    let groups = [group1,group2,group3,group4,group5]
    // Get number of filled groups to determine time for animation
    let filled = 0
    groups.forEach(group=>{if(group.length!==0) filled++})
    let animationDuration = 3000*(1/filled)
    let animationFillSpeed = 50
    


    groups.forEach((group, index)=>{
        if(group.length!==0){
            let eventID = null
            setTimeout(() => {
                eventID = setInterval(() => {
                    let groupEntries = group.length
                    let randomCircle = Math.floor(Math.random() * groupEntries)                      
                    group[randomCircle].setAttribute("fill", animationCircleColor)        
                    setTimeout(() => {
                        group[randomCircle].setAttribute("fill", initialCircleColor)
                    }, animationFillSpeed*2)        
                }, animationFillSpeed)
            }, animationDuration*index);
            setTimeout(() => {
                clearInterval(eventID)
            }, animationDuration*(index + 1));
        }        
    })    
    
    let arcsEventID = null
    let animationArcFinalColor = arcs[0].getAttribute("stroke")
    setTimeout(() => {
        arcsEventID = setInterval(() => {                    
            let randomArc = Math.floor(Math.random() * arcs.length)                      
            arcs[randomArc].setAttribute("stroke", animationArcTransitionColor)        
            arcs[randomArc].setAttribute("style", "transition: stroke 500ms ease")        
            setTimeout(() => {
                // arcs[randomArc].setAttribute("style", "transition: none") 
                arcs[randomArc].setAttribute("stroke", animationArcFinalColor)
            }, 200)        
        }, 100)
    }, 0);
    setTimeout(() => {
        clearInterval(arcsEventID)
    }, 2400);    

}

function animateFood(){
    console.log("Animating Food")

    let animationLinksColor = "#ED4C72"

    let p3_svgs_bothColor = document.querySelectorAll("#project3 #p3-dark,#project3 #p3-light")
    // Ensure we get correct coloured svgs
    let p3_svgs = [].find.call(p3_svgs_bothColor, function(el){
        let style = window.getComputedStyle(el)
        return style.display !== "none"
    })
    p3_svgs = p3_svgs.querySelectorAll("svg")
    // Ensure we only get non-hidden images
    let p3_svg = [].find.call(p3_svgs, function(el){
        let style = window.getComputedStyle(el)
        return style.display !== "none"
    })

    // Links
    let links = p3_svg.querySelector(".Lines").querySelectorAll("path")  
    let linksInitialColor = links[0].getAttribute("stroke") 
    
    let linksEventsID = null
    setTimeout(() => {
        linksEventsID = setInterval(() => {                    
            let randomLink = Math.floor(Math.random() * links.length)                      
            links[randomLink].setAttribute("stroke", animationLinksColor)        
            setTimeout(() => {
                links[randomLink].setAttribute("stroke", "none")
            }, 100)        
        }, 50)
    }, 500);
    setTimeout(() => {
        clearInterval(linksEventsID)
    }, 2500);    
    setTimeout(() => {        
        // Return links to original color        
        links.forEach(link=>link.setAttribute("stroke", linksInitialColor))
    }, 2600);

    

    // Rectangles
    let rectangles = p3_svg.querySelector(".Rectangles").querySelectorAll("rect:not(.mainRect)")  
    let mainRect = p3_svg.querySelector(".mainRect")
    
    let rectanglesInitialStroke = rectangles[0].getAttribute("stroke")     
    let mainRectInitialFill = mainRect.getAttribute("fill") 
    
    // Common Rectangles
    let rectsEventsID = null    
    setTimeout(() => {
        rectsEventsID = setInterval(() => {                    
            let randomRect = Math.floor(Math.random() * rectangles.length)                      
            rectangles[randomRect].setAttribute("stroke", animationLinksColor)   
            setTimeout(() => {
                rectangles[randomRect].setAttribute("stroke", rectanglesInitialStroke)                
            }, 100)        
        }, 50)
    }, 500);
    setTimeout(() => {
        clearInterval(rectsEventsID)
    }, 2500);    

    // Main Rect    
    let mainRectEventID = setInterval(() => {                    
        mainRect.setAttribute("fill", animationLinksColor)     
        setTimeout(() => {
            mainRect.setAttribute("fill", mainRectInitialFill)     
        }, 400)        
    }, 250)
    setTimeout(() => {
        clearInterval(mainRectEventID)        
    }, 2500);     

}

document.onscroll = (e) => {    
    // Only animate on scroll down
    if(initialScroll<this.scrollY){
        // About headline
        if(isInView(this.scrollY, animate_about_headline) && !isInView(initialScroll, animate_about_headline)) animateDown("#about-headline .content h1")
        // About section
        if(isInView(this.scrollY, animate_about) && !isInView(initialScroll, animate_about)){
            animateDown("#about-description", 0.5)
            animateDown("#about-image")
        }
        // Projects Headline
        if(isInView(this.scrollY, animate_projects_headline) && !isInView(initialScroll, animate_projects_headline)){
            animateDown("#projects-headline .content h1")
        } 
        // Projects
        if(isInView(this.scrollY, animate_project1) && !isInView(initialScroll, animate_project1)){
            animateLeft("#project1-image")
            animateDown("#project1 .project-title")
            animateDown("#project1-description")

            animatePC()
        }         
        if(isInView(this.scrollY, animate_project2) && !isInView(initialScroll, animate_project2)){
            animateRight("#project2-image")
            animateDown("#project2 .project-title")
            animateDown("#project2-description")

            // animateWorld()
        } 
        if(isInCloseView(this.scrollY, animate_project2) && !isInCloseView(initialScroll, animate_project2)) animateWorld()
        if(isInView(this.scrollY, animate_project3) && !isInView(initialScroll, animate_project3)){
            animateLeft("#project3-image")
            animateDown("#project3 .project-title")
            animateDown("#project3-description")

            // animateFood()
        }
        if(isInCloseView(this.scrollY, animate_project3) && !isInCloseView(initialScroll, animate_project3)) animateFood()
        // Testimony
        if(isInView(this.scrollY, animate_testimony) && !isInView(initialScroll, animate_testimony)){
            animateLeft("#testimony #openQuote")
            animateFadeIn("#testimony #quoteText")
            animateRight("#testimony #closeQuote")
        }
        // Contact
        if(isInView(this.scrollY, animate_contact) && !isInView(initialScroll, animate_contact)){            
            animateDown("#contact h1")
            animateDown("#contact h3")
            animateDown("#contact .btn")
        }
    }        

    // Save previous scroll
    initialScroll = this.scrollY
}
