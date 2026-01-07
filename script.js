/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const win = window.innerHeight;
    if (top < win - 100) el.classList.add("active");
    else el.classList.remove("active");
  });
});

/* MODAL PROJECT VIEW */
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const close = document.querySelector(".close");

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "block";
    modalContent.innerHTML = "";

    const folder = card.dataset.project;

    for (let i = 1; i <= 12; i++) {
      const img = document.createElement("img");
      img.src = `media/${folder}/${i}.png`;
      img.onerror = () => img.remove();
      modalContent.appendChild(img);
    }
  });
});

close.onclick = () => modal.style.display = "none";
