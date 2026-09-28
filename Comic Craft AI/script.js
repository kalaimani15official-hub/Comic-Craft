const form = document.getElementById("comicForm");
const resultSection = document.getElementById("resultSection");
const comicGrid = document.getElementById("comicGrid");
const loading = document.getElementById("loading");
const comicTitle = document.getElementById("comicTitle");
const comicMeta = document.getElementById("comicMeta");
const downloadBtn = document.getElementById("downloadBtn");
const newBtn = document.getElementById("newBtn");

const panelTemplates = [
  {
    title: "The Beginning",
    scene: "Our hero starts the journey and discovers that this adventure is different from anything expected.",
    caption: "A new adventure begins...",
    narration: "With courage in their heart, the hero takes the first step into the unknown. Every great story starts with one small decision."
  },
  {
    title: "Into the Unknown",
    scene: "The surroundings become mysterious as the hero moves deeper into the chosen setting.",
    caption: "Something feels different here.",
    narration: "The path grows stranger with every step. The hero stays alert, following a clue that could change the entire adventure."
  },
  {
    title: "The Challenge",
    scene: "A surprising obstacle appears, testing the hero's courage and creativity.",
    caption: "There is no turning back now!",
    narration: "For a moment, everything seems impossible. Then the hero remembers the reason for starting and finds a clever way forward."
  },
  {
    title: "A Brave Choice",
    scene: "The hero makes an important choice that brings the story closer to its turning point.",
    caption: "Courage changes everything.",
    narration: "Instead of giving up, the hero chooses to help, explore and keep moving. The difficult moment becomes the key to the solution."
  },
  {
    title: "The New Beginning",
    scene: "The adventure reaches a satisfying ending while leaving a little room for another story.",
    caption: "And so the story continues...",
    narration: "The hero returns with a new understanding and a memorable experience. The journey is complete, but another adventure may be waiting."
  }
];

const gradients = [
  "linear-gradient(135deg,#5d45b8,#8d6ee8)",
  "linear-gradient(135deg,#c14b82,#f47b9e)",
  "linear-gradient(135deg,#246b91,#56a8c8)",
  "linear-gradient(135deg,#d17a35,#efb05e)",
  "linear-gradient(135deg,#3b7d66,#73b99d)"
];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = {
    prompt: document.getElementById("prompt").value.trim(),
    character: document.getElementById("character").value.trim(),
    setting: document.getElementById("setting").value,
    tone: document.getElementById("tone").value,
    style: document.getElementById("style").value
  };

  if (!data.prompt || !data.character) return;

  resultSection.classList.remove("hidden");
  comicGrid.classList.add("hidden");
  loading.classList.remove("hidden");
  resultSection.scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    comicTitle.textContent = `${data.character}'s Adventure`;
    comicMeta.textContent = `${data.setting} • ${data.tone} • ${data.style} • 5 panels`;
    renderComic(data);
    loading.classList.add("hidden");
    comicGrid.classList.remove("hidden");
  }, 900);
});

function renderComic(data) {
  comicGrid.innerHTML = "";

  panelTemplates.forEach((panel, index) => {
    const scene = panel.scene
      .replace("our hero", data.character)
      .replace("The hero", data.character);

    const narration = panel.narration
      .replaceAll("the hero", data.character)
      .replaceAll("The hero", data.character);

    const imagePrompt =
      `${data.style} comic illustration of ${data.character}, ${data.setting}, ${data.prompt}, panel ${index + 1}`;

    const card = document.createElement("article");
    card.className = "panel";
    card.innerHTML = `
      <div class="panel-cover" style="background:${gradients[index]}">
        <img class="animated-panel-image" src="panel${index + 1}.svg" alt="Animated cartoon illustration of Foxy in the enchanted forest">
        <span class="panel-number">PANEL ${index + 1}</span>
        <h3>${escapeHTML(panel.title)}</h3>
      </div>
      <div class="panel-body">
        <p class="scene">${escapeHTML(scene)}</p>
        <div class="caption">💬 ${escapeHTML(panel.caption)}</div>
        <p class="narration">${escapeHTML(narration)}</p>
        <div class="prompt-ref"><strong>Image prompt:</strong> ${escapeHTML(imagePrompt)}</div>
      </div>
    `;
    comicGrid.appendChild(card);
  });
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

downloadBtn.addEventListener("click", () => {
  window.print();
});

newBtn.addEventListener("click", () => {
  resultSection.classList.add("hidden");
  comicGrid.innerHTML = "";
  form.reset();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
