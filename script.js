/* ================= SCROLL REVEAL (CONTINUOUS) ================= */
const reveals = document.querySelectorAll(".reveal");

function handleReveal() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const bottom = el.getBoundingClientRect().bottom;

    if (top < window.innerHeight - 120 && bottom > 120) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);


/* ================= LOAD PROJECTS FROM JSON ================= */
const workGrid = document.getElementById("workGrid");

fetch("projects.json")
  .then(res => res.json())
  .then(projects => {
    projects.forEach(project => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.project = project.folder;

      card.innerHTML = `
        <img src="media/${project.folder}/${project.cover}" alt="${project.title}">
        <span>${project.title}</span>
      `;

      workGrid.appendChild(card);
    });

    bindProjectClicks();
  })
  .catch(err => {
    console.error("❌ Failed to load projects.json", err);
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
      let loadedCount = 0;

      /* ================= LOAD IMAGES (ORDERED) ================= */
      for (let i = 1; i <= 30; i++) {
        imageExt.forEach(ext => {
          const img = new Image();
          img.src = `media/${folder}/${i}.${ext}`;

          img.onload = () => {
            loadedCount++;
            img.style.maxWidth = "90%";
            img.style.maxHeight = "90vh";
            img.style.objectFit = "contain";
            img.style.margin = "32px auto";
            img.style.display = "block";
            modalContent.appendChild(img);
          };
        });
      }

      /* ================= LOAD NAMED IMAGES (1-wireframe.png) ================= */
      imageExt.forEach(ext => {
        for (let i = 1; i <= 30; i++) {
          const img = new Image();
          img.src = `media/${folder}/${i}-detail.${ext}`;

          img.onload = () => {
            loadedCount++;
            img.style.maxWidth = "90%";
            img.style.maxHeight = "90vh";
            img.style.objectFit = "contain";
            img.style.margin = "32px auto";
            img.style.display = "block";

            // Caption from filename
            const caption = document.createElement("div");
            caption.style.textAlign = "center";
            caption.style.color = "#aaa";
            caption.style.marginBottom = "20px";
            caption.innerText = `Detail View`;

            modalContent.appendChild(img);
            modalContent.appendChild(caption);
          };
        }
      });

      /* ================= LOAD VIDEO (OPTIONAL) ================= */
      videoExt.forEach(ext => {
        const video = document.createElement("video");
        video.src = `media/${folder}/demo.${ext}`;
        video.controls = true;
        video.style.maxWidth = "90%";
        video.style.maxHeight = "90vh";
        video.style.margin = "40px auto";
        video.style.display = "block";

        video.onloadeddata = () => {
          loadedCount++;
          modalContent.appendChild(video);
        };
      });

      /* ================= EMPTY FALLBACK ================= */
      setTimeout(() => {
        if (loadedCount === 0) {
          modalContent.innerHTML =
            "<p style='text-align:center;color:#777;margin-top:80px'>No media found for this project.</p>";
        }
      }, 1000);
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
