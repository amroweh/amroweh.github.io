import { startAnimation } from "./HeroAnimation.js"
const mobileWatcher = window.matchMedia("(max-width: 768px)")

// Header Menu Toggles
const header = document.querySelector("header")
const navList = document.querySelector("#nav-list")
const navListItems = document.querySelectorAll("#nav-list li")
const colorSchemeToggleSun = document.querySelector("#colorSchemeToggle-Sun")
const colorSchemeToggleMoon = document.querySelector("#colorSchemeToggle-Moon")
const menuToggle = document.querySelector("#header-menu-toggle")
const hero = document.querySelector("#hero")
const about = document.querySelector("#about-image")
const coloredSpans = document.querySelectorAll(".clr-main")
const buttons = document.querySelectorAll(".btn")
const listItems = document.querySelectorAll("main li")
const projectTitles = document.querySelectorAll(".project-title")
const p1 = document.querySelector("#project1")
const p2 = document.querySelector("#project2")
const p3 = document.querySelector("#project3")
const quotationMarks = document.querySelectorAll(".quotationMark")
const arrowToTop = document.querySelector("#arrowToTop")

// Site Elements
const body = document.querySelector("body")

let darkMode = true

function toggleMenu(){
    if(navList.classList.contains("hide")){
        navList.classList.remove("hide")
        header.classList.add("open")
    } 
    else{
        navList.classList.add("hide")
        header.classList.remove("open")
    } 
}

function activateDarkMode(){
    console.log("Activating Dark Mode")
    
    body.classList.remove("lightMode")
    menuToggle.classList.remove("lightMode")
    navList.classList.remove("lightMode")
    header.classList.remove("lightMode")
    coloredSpans.forEach(span=>span.classList.remove("lightMode")) 
    buttons.forEach(button=>button.classList.remove("lightMode")) 
    listItems.forEach(li=>li.classList.remove("lightMode")) 
    projectTitles.forEach(title=>title.classList.remove("lightMode")) 
    p1.classList.remove("lightMode")
    p2.classList.remove("lightMode")
    p3.classList.remove("lightMode")
    quotationMarks.forEach(mark=>mark.classList.remove("lightMode")) 
    hero.classList.remove("lightMode")
    arrowToTop.classList.remove("lightMode")
    about.classList.remove("lightMode")

    colorSchemeToggleSun.style.display = "inline"
    colorSchemeToggleMoon.style.display = "none"

    startAnimation()
}

function activateLightMode(){
    console.log("Activating Light Mode")
    body.classList.add("lightMode")
    menuToggle.classList.add("lightMode")
    navList.classList.add("lightMode")
    header.classList.add("lightMode")
    coloredSpans.forEach(span=>span.classList.add("lightMode")) 
    buttons.forEach(button=>button.classList.add("lightMode")) 
    listItems.forEach(li=>li.classList.add("lightMode")) 
    projectTitles.forEach(title=>title.classList.add("lightMode")) 
    p1.classList.add("lightMode")
    p2.classList.add("lightMode")
    p3.classList.add("lightMode")
    quotationMarks.forEach(mark=>mark.classList.add("lightMode")) 
    hero.classList.add("lightMode")
    arrowToTop.classList.add("lightMode")
    about.classList.add("lightMode")

    colorSchemeToggleSun.style.display = "none"
    colorSchemeToggleMoon.style.display = "inline"

    startAnimation()
}

function hideMenu(){
    navList.classList.add("hide")
    header.classList.remove("open")
}

menuToggle.onclick = toggleMenu
colorSchemeToggleSun.onclick = activateLightMode
colorSchemeToggleMoon.onclick = activateDarkMode
mobileWatcher.onchange = startAnimation
navListItems.forEach(item=>item.onclick = hideMenu)
