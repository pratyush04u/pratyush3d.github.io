// Scroll reveal
document.querySelectorAll(".reveal").forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(60px)";
});

window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.style.transition = "all .8s ease";
    }
  });
});

// Project modal
function openProject(type) {
  const modal = document.getElementById("projectModal");
  const content = document.getElementById("projectContent");

  const projects = {
    phone: `
      <h2>Vintage Wall Phone</h2>
      <img src="media/vintage-wall-phone/1.png">
      <video controls src="media/vintage-wall-phone/demo.mp4"></video>
    `,
    awm: `
      <h2>AWM with Custom Skin</h2>
      <video controls src="media/awm-custom-skin/demo.mp4"></video>
    `,
    radio: `
      <h2>Old Radio Game Prop</h2>
      <video controls src="media/old-radio-prop/demo.mp4"></video>
    `,
    cosmetic: `
      <h2>Cosmetic Product Visualization</h2>
      <video controls src="media/cosmetic-product/demo.mp4"></video>
    `
  };

  content.innerHTML = projects[type];
  modal.style.display = "flex";
}

function closeProject() {
  document.getElementById("projectModal").style.display = "none";
}

// Contact form feedback
document.getElementById("contactForm").addEventListener("submit", () => {
  setTimeout(() => {
    document.getElementById("contact").style.display = "none";
    document.getElementById("thankyou").style.display = "block";
  }, 300);
});
