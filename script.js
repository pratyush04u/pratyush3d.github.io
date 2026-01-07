/* REVEAL ON SCROLL */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* MODAL */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let images = [];
let index = 0;

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const project = card.dataset.project;
    images = [
      `media/${project}/1.jpg`,
      `media/${project}/2.jpg`,
      `media/${project}/3.jpg`
    ];
    index = 0;
    openModal();
  });
});

function openModal() {
  modal.style.display = "flex";
  modalImg.src = images[index];
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

closeBtn.onclick = closeModal;
modal.onclick = e => e.target === modal && closeModal();

prevBtn.onclick = e => {
  e.stopPropagation();
  index = (index - 1 + images.length) % images.length;
  modalImg.src = images[index];
};

nextBtn.onclick = e => {
  e.stopPropagation();
  index = (index + 1) % images.length;
  modalImg.src = images[index];
};
