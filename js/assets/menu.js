function rotateMenuIcon(checkBox){
    const icon = checkBox.parentElement.getElementsByTagName('i')[0];
    icon.classList.toggle("rotatedIcon");
}


// Hacerlo de otra manera
function toggleNav(){
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const menuIcon = document.getElementById('menuIcon');

    let offsets = header.getBoundingClientRect();
    let leftOffset = offsets.left;


    header.classList.toggle("toggle");
    main.classList.toggle("extend");
    menuIcon.classList.toggle("rotatedNavArrow")
}


let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);



});




/*
var widthMoreThanThousand = true;
window.onresize = () => {
  if(window.screen.width <= 1000 && widthMoreThanThousand){
    console.log(1)

    const header = document.querySelector('header');
    if(header.classList[0] == 'toggle'){
      if(widthMoreThanThousand){
        header.classList.remove("toggle");
      }
    }

    widthMoreThanThousand = false;
  
  } else if(window.screen.width > 1000 && widthMoreThanThousand == false){
    widthMoreThanThousand = true;
  }
}*/