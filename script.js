/* REVEAL + REVERSE */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  { threshold: 0.25 }
);

reveals.forEach(el => observer.observe(el));

/* MODAL PROJECT VIEW */
const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close");
let currentProject = [];
let index = 0;

document.querySelectorAll(".project-card").forEach(card => {
  card.onclick = () => {
    const folder = card.dataset.project;
    currentProject = [];
    modalContent.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
      const img = new Image();
      img.src = `media/${folder}/${i}.png`;
      img.onload = () => currentProject.push(img.src);
      img.onerror = () => {};
    }

    setTimeout(() => {
      if (currentProject.length > 0) {
        showImage(0);
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    }, 300);
  };
});

function showImage(i) {
  index = i;
  modalContent.innerHTML = `<img src="${currentProject[index]}">`;
}

document.querySelector(".next").onclick = () =>
  showImage((index + 1) % currentProject.length);
document.querySelector(".prev").onclick = () =>
  showImage((index - 1 + currentProject.length) % currentProject.length);

closeBtn.onclick = () => {
  modal.classList.remove("active");
  document.body.style.overflow = "";
};
