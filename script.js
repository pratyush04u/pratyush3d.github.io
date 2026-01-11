/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 120) {
      el.classList.add("active");
    }
  });
});

/* MODAL */
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close");

const imageExt = ["png","jpg","webp"];
const videoExt = ["mp4","webm"];

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "block";
    modalContent.innerHTML = "";
    document.body.style.overflow = "hidden";

    const folder = card.dataset.project;
    let found = false;

    for(let i=1;i<=12;i++){
      imageExt.forEach(ext=>{
        const img=new Image();
        img.src=`media/${folder}/${i}.${ext}`;
        img.onload=()=>{
          found=true;
          modalContent.appendChild(img);
        }
      });

      videoExt.forEach(ext=>{
        const v=document.createElement("video");
        v.src=`media/${folder}/video-${i}.${ext}`;
        v.controls=true;
        v.onloadeddata=()=>{
          found=true;
          modalContent.appendChild(v);
        }
      });
    }

    setTimeout(()=>{
      if(!found){
        modalContent.innerHTML="<p style='text-align:center'>No media found</p>";
      }
    },900);
  });
});

function closeModal(){
  modal.style.display="none";
  modalContent.innerHTML="";
  document.body.style.overflow="auto";
}

closeBtn.onclick=closeModal;
modal.onclick=e=>{ if(e.target===modal) closeModal(); };
