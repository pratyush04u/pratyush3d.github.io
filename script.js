/* SCROLL REVEAL */
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* PROJECT DATA */
const projects = {
  "vintage-phone": {
    images:["1.png","2.png"],
    video:"demo.mp4"
  },
  "awm": {
    images:["1.png"],
    video:"demo.mp4"
  },
  "old-radio": {
    images:["1.png"]
  },
  "cosmetic": {
    images:["1.png"]
  }
};

/* MODAL */
const modal = document.getElementById("projectModal");
const modalContent = modal.querySelector(".modal-content");
const closeBtn = modal.querySelector(".modal-close");
const backdrop = modal.querySelector(".modal-backdrop");

document.querySelectorAll(".work-card").forEach(card=>{
  card.addEventListener("click",()=>{
    openProject(card.dataset.project);
  });
});

function openProject(key){
  const project = projects[key];
  if(!project) return;

  modalContent.innerHTML="";
  document.body.style.overflow="hidden";

  project.images?.forEach(img=>{
    modalContent.innerHTML+=`<img loading="lazy" src="media/${key}/${img}">`;
  });

  if(project.video){
    modalContent.innerHTML+=`
      <video muted autoplay loop controls>
        <source src="media/${key}/${project.video}" type="video/mp4">
      </video>`;
  }

  modal.classList.add("active");
}

function closeModal(){
  modal.classList.remove("active");
  modalContent.innerHTML="";
  document.body.style.overflow="";
}

closeBtn.onclick = backdrop.onclick = closeModal;
document.addEventListener("keydown",e=>{
  if(e.key==="Escape") closeModal();
});

/* CONTACT FORM */
const form = document.getElementById("contactForm");
const success = document.getElementById("contactSuccess");

form.addEventListener("submit",()=>{
  setTimeout(()=>{
    form.style.display="none";
    success.style.display="block";
  },400);
});
