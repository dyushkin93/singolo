
//----------------------//
// Interactive Nav menu //
//----------------------//
let navLink=document.querySelectorAll('.nav-link')
let headerHeight=document.querySelector("header").getBoundingClientRect().height;

navLink.forEach(link => {
  let block = link.getAttribute('href');
  block = document.querySelector(block);
  
  link.addEventListener("click", e => {
    navLink.forEach(elem => {
      elem.classList.remove("active-link");
    })
    e.preventDefault();
    link.classList.add("active-link");
    let scrollToY = block.getBoundingClientRect().top+pageYOffset-headerHeight+1;
    scrollTo(0, scrollToY);
  });
})

//-------//
// Slier //
//-------//

let nextButton=document.querySelector(".next-button");
let prevButton=document.querySelector(".prev-button");
let slides=document.querySelectorAll(".slide");
nextButton.addEventListener("click", e => {
  for (let i=0; i<slides.length; i++) {
    if (slides[i].classList.contains("active-slide")) {
      let value=100;
      let nextElemPos=slides[(i+1)%slides.length].style.left=value+"%";
      slides[i].classList.remove("active-slide");
      slides[(i+1)%slides.length].classList.add("active-slide");
      let timer = setInterval (function() {
        if (value>0) {
          value-=4;
          nextElemPos=slides[(i+1)%slides.length].style.left=value+"%";
        } else {
          clearInterval(timer)
        }
      }, 9)
      break;
    }
  }
})

prevButton.addEventListener("click", e => {
  for (let i=0; i<slides.length; i++) {
    if (slides[i].classList.contains("active-slide")) {
      let value=-100;
      let prevElemPos=slides[Math.abs(i-1)%slides.length].style.left=value+"%";
      slides[i].classList.remove("active-slide");
      slides[Math.abs(i-1)%slides.length].classList.add("active-slide");
      let timer = setInterval (function() {
        if (value<0) {
          value+=4;
          nextElemPos=slides[Math.abs(i-1)%slides.length].style.left=value+"%";
        } else {
          clearInterval(timer)
        }
      }, 9)
      break;
    }
  }
})

let phoneScreen=document.querySelectorAll(".screen")

phoneScreen.forEach(elem => {
  elem.addEventListener("click", e => {
    elem.classList.toggle("on-off-screen");
  })
})

//-----------//
// PORTFOLIO //
//-----------//

let galleryTabs=document.querySelector(".gallery-filter").querySelectorAll("li");
let gallery=document.querySelector(".gallery")
let galleryImages=document.querySelectorAll(".gallery-all");
let galleryImagesArray=Array.from(galleryImages);

galleryTabs.forEach(tab => {
  tab.addEventListener("click", e => {
    galleryImages.forEach(img => {
        img.remove();
    })
    galleryImagesArray.forEach(img => {
      if (img.classList.contains(tab.id)) {
        gallery.append(img);
      }
    })
  })
})

galleryImages.forEach(img => {
  img.addEventListener("click", e=> {
    galleryImages.forEach(img => {
      img.classList.remove("active-image");
    })
    img.classList.add("active-image");
  })
})





