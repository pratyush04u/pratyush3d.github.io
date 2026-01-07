const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".project").forEach(card => {
  card.addEventListener("click", () => {
    const folder = card.dataset.project;
    if (!folder) return;

    modalContent.innerHTML = "";
    for (let i = 1; i <= 9; i++) {
      const img = document.createElement("img");
      img.src = `media/${folder}/${i}.png`;
      img.style.width = "100%";
      img.style.marginBottom = "10px";
      modalContent.appendChild(img);
    }

    const video = document.createElement("video");
    video.src = `media/${folder}/Demo.mp4`;
    video.controls = true;
    video.style.width = "100%";
    modalContent.appendChild(video);

    modal.style.display = "flex";
  });
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
