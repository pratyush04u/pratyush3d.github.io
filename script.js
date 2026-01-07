// Reveal animation (forward + backward)
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(r => {
    const top = r.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) r.classList.add("active");
    else r.classList.remove("active");
  });
});

// Scroll
function scrollToWork(){
  document.getElementById("work").scrollIntoView({behavior:"smooth"});
}

// Modal logic
let images=[],index=0;
function openProject(folder){
  images=[];
  for(let i=1;i<=10;i++){
    images.push(`media/${folder}/${i}.jpg`);
  }
  index=0;
  document.getElementById("modal").style.display="flex";
  document.body.style.overflow="hidden";
  document.getElementById("modal-img").src=images[index];
}
function closeModal(){
  document.getElementById("modal").style.display="none";
  document.body.style.overflow="auto";
}
function nextImg(){
  index=(index+1)%images.length;
  document.getElementById("modal-img").src=images[index];
}
function prevImg(){
  index=(index-1+images.length)%images.length;
  document.getElementById("modal-img").src=images[index];
}
