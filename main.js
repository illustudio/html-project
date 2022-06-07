import "./style.scss"

let isDraggable = false
let animationId
let startPosX = 0
let startPosY = 0
let currentPosX = 0
let currentPosY = 0
const pointer = document.querySelector(".pointer")

const touchStartHandler = (e) => {
  console.log("touchStart")
  isDraggable = true
  getPosition(e)
  // animationId = requestAnimationFrame(printOut)
  pointer.classList.add("grab")
}
const touchMoveHandler = (e) => {
  getPosition(e)
  setPosition(e)
  console.log(e.type)
  if (isDraggable) {
    animationId = requestAnimationFrame(setPosition)
  }
  // 위로 이동할때
  // if (startPosY < currentPosY) {
  //   pointer.classList.remove("moveBottom")
  //   return pointer.classList.add("moveTop")
  // }
  //
  // pointer.classList.remove("moveTop")
  // return pointer.classList.add("moveBottom")
}

const touchEndHandler = (e) => {
  console.log("touchEnd")
  isDraggable = false
  cancelAnimationFrame(animationId)
  pointer.classList.remove("grab")
  // pointer.classList.remove("moveTop")
  // pointer.classList.remove("moveBottom")
}

const wheelHandler = (e) => {
  if (+e.deltaY > 0) {
    pointer.classList.add("grab")
    pointer.classList.remove("moveBottom")
    return pointer.classList.add("moveTop")
  }
  pointer.classList.remove("moveTop")
  pointer.classList.add("moveBottom")
  return pointer.classList.remove("grab")
}

const setPosition = (e) => {
  //마우스로 이동할 경우
  if (e.type.includes("mouse")) {
    return (pointer.style.transform = `translate(${currentPosX - 15}px, ${
      currentPosY - 15
    }px)`)
  }
  return (pointer.style.transform = `translate(${currentPosX}px, ${
    currentPosY - 30
  }px)`)
}

const getPosition = (e) => {
  startPosX = currentPosX
  startPosY = currentPosY
  if (e.type.includes("mouse")) {
    currentPosX = e.pageX
    currentPosY = e.pageY
    return printLog("mouse")
  }
  currentPosX = e.touches[0].clientX
  currentPosY = e.touches[0].clientY
  printLog("touch")
}
const mouseMoveHandler = (e) => {
  getPosition(e)
  animationId = requestAnimationFrame(() => setPosition(e))
}
const mouseDownHandler = () => {
  pointer.classList.add("active")
}
const mouseUpHandler = () => {
  pointer.classList.remove("active")
}
const printLog = (type) => {
  console.log(`시작 : ${type} event - x : ${startPosX}, y: ${startPosY}`)
  console.log(`현재 : ${type} event - x : ${currentPosX}, y: ${currentPosY}`)
}
window.addEventListener("wheel", wheelHandler)
window.addEventListener("touchstart", touchStartHandler)
window.addEventListener("touchmove", touchMoveHandler)
window.addEventListener("touchend", touchEndHandler)
window.addEventListener("mousemove", mouseMoveHandler)
window.addEventListener("mouseup", mouseUpHandler)
window.addEventListener("mousedown", mouseDownHandler)
