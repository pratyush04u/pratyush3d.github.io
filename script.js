/* REVEAL */
const reveals=document.querySelectorAll('.reveal');
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('active');
  });
});
reveals.forEach(r=>io.observe(r));

/* PARALLAX */
window.addEventListener('scroll',()=>{
  document.querySelectorAll('.parallax').forEach(el=>{
    el.style.transform=`translateY(${window.scrollY*0.1}px)`;
  });
  document.querySelectorAll('.parallax-fast').forEach(el=>{
    el.style.transform=`translateY(${window.scrollY*0.2}px)`;
  });
});

/* MODAL */
const modal=document.getElementById('modal');
const modalContent=document.getElementById('modalContent');
const closeModal=document.getElementById('closeModal');

document.querySelectorAll('.project-card').forEach(card=>{
  card.onclick=()=>{
    const key=card.dataset.project;
    modalContent.innerHTML='';
    fetchProject(key);
    modal.style.display='block';
  }
});

function fetchProject(key){
  modalContent.innerHTML+=`
    <img src="media/${key}/cover.png">
  `;
}

closeModal.onclick=()=>modal.style.display='none';

/* FORM */
const form=document.getElementById('contactForm');
form.addEventListener('submit',()=>{
  setTimeout(()=>{
    form.querySelector('.success').style.display='block';
  },600);
});
