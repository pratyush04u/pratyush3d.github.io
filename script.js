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

/* ================= AUTO PROJECT LOAD (JSON) ================= */
const workGrid = document.getElementById("workGrid");

fetch("projects.json")
  .then(res => res.json())
  .then(projects => {
    projects.forEach(project => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.project = project.folder;

      card.innerHTML = `
        <img src="media/${project.folder}/${project.cover}">
        <span>${project.title}</span>
      `;

      workGrid.appendChild(card);
    });

    bindProjectClicks();
  })
  .catch(err => {
    console.error("Failed to load projects.json", err);
  });

/* ================= MODAL PROJECT VIEW ================= */
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close");

const imageExt = ["png", "jpg", "webp"];
const videoExt = ["mp4", "webm"];

function bindProjectClicks() {
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      modal.style.display = "block";
      modalContent.innerHTML = "";
      document.body.style.overflow = "hidden";

      const folder = card.dataset.project;
      let loaded = false;

      /* Images */
      for (let i = 1; i <= 20; i++) {
        imageExt.forEach(ext => {
          const img = new Image();
          img.src = `media/${folder}/${i}.${ext}`;
          img.onload = () => {
            loaded = true;
            modalContent.appendChild(img);
          };
        });
      }

      /* Videos (optional) */
      videoExt.forEach(ext => {
        const video = document.createElement("video");
        video.src = `media/${folder}/demo.${ext}`;
        video.controls = true;
        video.style.maxWidth = "90%";
        video.style.margin = "40px auto";
        video.style.display = "block";

        video.onloadeddata = () => {
          loaded = true;
          modalContent.appendChild(video);
        };
      });

      setTimeout(() => {
        if (!loaded) {
          modalContent.innerHTML =
            "<p style='text-align:center;color:#777'>No media found.</p>";
        }
      }, 900);
    });
  });
}

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
