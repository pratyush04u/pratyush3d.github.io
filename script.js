function openProject(name) {
  document.getElementById('projectModal').style.display = 'block';
}

function closeProject() {
  document.getElementById('projectModal').style.display = 'none';
}

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  form.innerHTML = `
    <h3>Thanks for reaching out! 😄</h3>
    <p>I’ll get back to you as soon as possible.</p>
  `;
});
