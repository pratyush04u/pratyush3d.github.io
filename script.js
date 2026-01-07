const projects = [
  {
    title: "Vintage Wall Phone",
    folder: "vintage-wall-phone"
  },
  {
    title: "AWM – Custom Skin",
    folder: "awm-custom-skin"
  },
  {
    title: "Old Radio – Game Prop",
    folder: "old-radio-game-prop"
  },
  {
    title: "Cosmetic Product Visualization",
    folder: "cosmetic-product-visualization"
  }
];

const grid = document.getElementById("projectGrid");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "project-card";

  card.innerHTML = `
    <img src="media/${project.folder}/cover.jpg" alt="${project.title}">
    <h3>${project.title}</h3>
  `;

  grid.appendChild(card);
});
