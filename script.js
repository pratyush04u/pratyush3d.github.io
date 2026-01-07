/* =========================
   SCROLL REVEAL
========================= */
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const win = window.innerHeight;
    if (top < win - 100) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
});

/* =========================
   MODAL PROJECT VIEW
========================= */
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    openProject(card.dataset.project);
  });
});

function openProject(folder) {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  modalContent.innerHTML = "";

  let loadedAny = false;

  // try both png and jpg
  for (let i = 1; i <= 20; i++) {
    ["png", "jpg", "jpeg"].forEach(ext => {
      const img = new Image();
      img.src = `media/${folder}/${i}.${ext}`;

      img.onload = () => {
        loadedAny = true;
        modalContent.appendChild(img);
      };

      img.onerror = () => {
        // silently ignore missing images
      };
    });
  }

  // fallback: if numbered images don't exist, try cover
  setTimeout(() => {
    if (!loadedAny) {
      const cover = new Image();
      cover.src = `media/${folder}/cover.png`;
      cover.onerror = () => {
        cover.src = `media/${folder}/cover.jpg`;
      };
      modalContent.appendChild(cover);
    }
  }, 300);
}

closeBtn.addEventListener("click", closeModal);

function closeModal() {
  modal.style.display = "none";
  modalContent.innerHTML = "";
  document.body.style.overflow = "";
}

/* close modal on background click */
modal.addEventListener("click", e => {
  if (e.target === modal) {
    closeModal();
  }
});

/* close modal with ESC key */
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});
