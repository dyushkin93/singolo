//----------------------//
// Interactive Nav menu //
//----------------------//
let navLink=document.querySelectorAll('.nav-link')
let headerHeight=document.querySelector("header").getBoundingClientRect().height;
let windowHeight=document.documentElement.clientHeight;

const toggleTab = (tab) => {
  navLink.forEach(tab => {
    tab.classList.remove("active-nav-tab");
  });
  tab.classList.add("active-nav-tab");
};

const scrollToBlock = (blockDocPos) => {
  let scrollValue = pageYOffset;
  if (pageYOffset < blockDocPos) {
    let timer = setInterval(() => {
      if (pageYOffset < blockDocPos && pageYOffset < document.documentElement.getBoundingClientRect().height - windowHeight) {
        scrollValue += 200;
        window.scrollTo(0, scrollValue);
      } else {
        clearInterval(timer);
      }
    }, 35);
  } else if (pageYOffset > blockDocPos) {
    let timer = setInterval(() => {
      if (pageYOffset > blockDocPos) {
        scrollValue -= 200;
        window.scrollTo(0, scrollValue);
      } else {
        clearInterval(timer);
      }
    }, 35);
  }
}

window.addEventListener("scroll", e => {
  navLink.forEach(tab => {
    let link = tab.getAttribute("href");
    let blockWinPos=document.querySelector(link).getBoundingClientRect().top;
    if (blockWinPos <= windowHeight*0.4) {
      toggleTab(tab);
    } else if (link === "#contact" && pageYOffset >= document.querySelector("footer").getBoundingClientRect().top + pageYOffset) {
      toggleTab(tab);
    }
  });
});

navLink.forEach(tab => {
  let link = tab.getAttribute("href");
  let blockDocPos=document.querySelector(link).getBoundingClientRect().top + pageYOffset - headerHeight;
  tab.addEventListener("click", e => {
    e.preventDefault();
    scrollToBlock(blockDocPos);
  });
});






//--------//
// Sldier //
//--------//

window.addEventListener("scroll", e => {
  console.log("scrolling")
})

let buttons = document.querySelectorAll(".chev");
let slides = document.querySelectorAll(".slide");
let slideAnimation = false;

const toggleSlide = (currentSlide, nextSlide, button) => {
  button.classList.contains("next-button") ? nextSlide.style.left = 100 + "%" : nextSlide.style.left = -100 + "%";
  let moveLeftValue = 100;
  let moveRightValue = 0;
  let step = 2;
  let timer = setInterval((e) => {
      slideAnimation = true;
      if (button.classList.contains("next-button")) {
        if (moveLeftValue > 0) {
          moveLeftValue-=step;
          nextSlide.style.left=moveLeftValue+"%";
          currentSlide.style.left=moveLeftValue-100+"%";
        } else {
          slideAnimation = false;
          clearInterval(timer);
          }
      } else {
        if (moveRightValue < 100) {
          moveRightValue+=step;
          nextSlide.style.left=moveRightValue-100+"%";
          currentSlide.style.left=moveRightValue+"%";
        } else {
          slideAnimation = false;
          clearInterval(timer);
        }
      }
  }, 10);
  currentSlide.classList.remove("active-slide");
  nextSlide.classList.add("active-slide");
}



buttons.forEach((button) => {
   button.addEventListener("click", (e) => {
    for (let i = 0; i < slides.length; i++) {
       if (slides[i].classList.contains("active-slide")) {
         let currentSlide = slides[i];
         let j=0;
         i = 0 ? j=slides.length-1 : j=i+1;
         let nextSlide = slides[j % slides.length];
         if (slideAnimation === false) {
           toggleSlide(currentSlide, nextSlide, button);
         }
        break;
      };
    };
  });
 });

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

const shuffleArray = (arr) => {
  arr.sort(() => Math.random() - 0.5);
}

const shuffleImages = (tab) => {
  galleryTabs.forEach(tab => {
    tab.classList.remove("active-tab");
  })
  tab.classList.add("active-tab");
  galleryImagesArray.forEach(img => {
    img.classList.add("hidden-img")
  })
  galleryImages.forEach(img => {
    img.remove()
  })
  shuffleArray(galleryImagesArray);
  galleryImagesArray.forEach(img => {
    gallery.append(img);
    img.classList.remove("hidden-img")
  })
}

galleryTabs.forEach(tab => {
  tab.addEventListener("click", e => {
    shuffleImages(tab);
  })
})

galleryImages.forEach(img => {
  img.addEventListener("click", e=> {
    galleryImages.forEach(img => {
      img.classList.remove("active-image");
    })
    img.classList.add("active-image");
  })
});

//---------//
// CONTACT //
//---------//

let message = document.querySelector(".message-preview");
let appForm = document.querySelector(".application-form");

const messageToggle = () => {
  message.classList.toggle("toogle-message");
};

const messageFill = () => {
  let subject = document.querySelector("#subject").value;
  let description = document.querySelector("#detail").value;
  document.querySelector(".message-subject").innerHTML += subject ? `${subject}` : "No subject";
  document.querySelector(".message-description").innerHTML += description ? `${description}` : "No description"; 
};

const submitForm = (e) => {
  e.preventDefault();
  messageFill();
  messageToggle();
  appForm.reset();
  return false;
};

appForm.addEventListener("submit", submitForm);
document.querySelector(".close").addEventListener("click", messageToggle)
window.addEventListener("click", (e) => {
  if (e.target === message) {
    messageToggle();
  }
})
                                                  

