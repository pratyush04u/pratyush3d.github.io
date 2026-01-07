/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 120) {
      el.classList.add("active");
    }
  });
});

/* ================= MODAL PROJECT VIEW ================= */
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close");

const extensions = ["png", "jpg", "webp"];

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "block";
    modalContent.innerHTML = "";
    document.body.style.overflow = "hidden";

    const folder = card.dataset.project;
    let loaded = false;

    for (let i = 1; i <= 12; i++) {
      extensions.forEach(ext => {
        const img = new Image();
        img.src = `media/${folder}/${i}.${ext}`;

        img.onload = () => {
          loaded = true;
          modalContent.appendChild(img);
        };
      });
    }

    setTimeout(() => {
      if (!loaded) {
        modalContent.innerHTML =
          "<p style='text-align:center;color:#777'>No additional images found.</p>";
      }
    }, 800);
  });
});

/* ================= CLOSE MODAL ================= */
function closeModal() {
  modal.style.display = "none";
  modalContent.innerHTML = "";
  document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
