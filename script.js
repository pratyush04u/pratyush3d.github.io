/* ================= SCROLL REVEAL (CONTINUOUS) ================= */
const reveals = document.querySelectorAll(".reveal");

function handleReveal() {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 120 && rect.bottom > 120) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);


/* ================= CATEGORY LOAD ================= */
const categoryGrid = document.getElementById("categoryGrid");
let allProjects = [];

fetch("categories.json")
  .then(res => res.json())
  .then(categories => {
    categories.forEach(cat => {
      const card = document.createElement("div");
      card.className = "category-card";
      card.dataset.category = cat.id;

      card.innerHTML = `
        ${cat.coverType === "video"
          ? `<video src="${cat.cover}" autoplay muted loop playsinline></video>`
          : `<img src="${cat.cover}" />`
        }
        <div class="category-overlay">
          <h4>${cat.title}</h4>
        </div>
      `;

      card.onclick = () => {
        renderProjects(cat.id);
        document.getElementById("work").scrollIntoView({ behavior: "smooth" });
      };

      categoryGrid.appendChild(card);
    });
  });


/* ================= PROJECT LOAD ================= */
const workGrid = document.getElementById("workGrid");

fetch("projects.json")
  .then(res => res.json())
  .then(projects => {
    allProjects = projects;
    renderProjects("all");
  });

function renderProjects(category) {
  workGrid.innerHTML = "";

  allProjects
    .filter(p => category === "all" || p.category === category)
    .forEach(project => {
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
}


/* ================= MODAL + MEDIA VIEWER ================= */
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close");

const imageExt = ["png", "jpg", "webp"];
const videoExt = ["mp4", "webm"];

let mediaItems = [];
let currentIndex = 0;

function bindProjectClicks() {
  document.querySelectorAll(".card").forEach(card => {
    card.onclick = () => openProject(card.dataset.project);
  });
}

function openProject(folder) {
  modal.style.display = "block";
  modalContent.innerHTML = "";
  document.body.style.overflow = "hidden";

  mediaItems = [];
  currentIndex = 0;

  /* ================= DESCRIPTION (OPTIONAL) ================= */
  const project = allProjects.find(p => p.folder === folder);
  if (project?.description) {
    const desc = document.createElement("div");
    desc.className = "project-desc";
    desc.innerText = project.description;
    modalContent.appendChild(desc);
  }

  /* ================= IMAGES ================= */
  for (let i = 1; i <= 30; i++) {
    imageExt.forEach(ext => {
      addMedia(`media/${folder}/${i}.${ext}`, "img");
      addMedia(`media/${folder}/${i}-detail.${ext}`, "img");
    });
  }

  /* ================= VIDEO ================= */
  videoExt.forEach(ext => {
    addMedia(`media/${folder}/demo.${ext}`, "video");
  });

  if (mediaItems.length === 0) {
    modalContent.innerHTML +=
      "<p style='text-align:center;color:#777;margin-top:80px'>No media found.</p>";
  } else {
    showMedia(0);
  }
}

function addMedia(src, type) {
  const el = type === "img" ? new Image() : document.createElement("video");
  el.src = src;

  el.onload = el.onloadeddata = () => {
    mediaItems.push({ el, type });
  };
}

function showMedia(index) {
  modalContent.querySelectorAll(".viewer").forEach(v => v.remove());

  const item = mediaItems[index];
  if (!item) return;

  currentIndex = index;

  const el = item.el.cloneNode(true);
  el.classList.add("viewer");

  styleMedia(el);

  if (item.type === "img") {
    el.classList.add("zoomable");
    el.onclick = () => {
      el.classList.toggle("zoomed");
    };
  } else {
    el.controls = true;
  }

  modalContent.appendChild(el);
}

function styleMedia(el) {
  el.style.maxWidth = "90vw";
  el.style.maxHeight = "90vh";
  el.style.objectFit = "contain";
  el.style.margin = "32px auto";
  el.style.display = "block";
}


/* ================= KEYBOARD NAV ================= */
document.addEventListener("keydown", e => {
  if (modal.style.display !== "block") return;

  if (e.key === "ArrowRight") showMedia((currentIndex + 1) % mediaItems.length);
  if (e.key === "ArrowLeft") showMedia((currentIndex - 1 + mediaItems.length) % mediaItems.length);
  if (e.key === "Escape") closeModal();
});


/* ================= SWIPE (MOBILE) ================= */
let startX = 0;

modal.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

modal.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (Math.abs(startX - endX) < 50) return;

  if (startX > endX) showMedia((currentIndex + 1) % mediaItems.length);
  else showMedia((currentIndex - 1 + mediaItems.length) % mediaItems.length);
});


/* ================= CLOSE ================= */
function closeModal() {
  modal.style.display = "none";
  modalContent.innerHTML = "";
  document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
