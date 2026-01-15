const moods = [
  { key: "work", label: "Work", icon: "💻" },
  { key: "date", label: "Date", icon: "❤️" },
  { key: "quickbite", label: "Quick Bite", icon: "⚡" },
  { key: "budget", label: "Budget", icon: "💰" },
];

export function renderMoodSelector(container, onSelect) {
  container.innerHTML = "";

  moods.forEach(({ key, label, icon }) => {
    const btn = document.createElement("button");

    btn.className = "mood-chip";
    btn.setAttribute("data-mood", key);
    btn.setAttribute("aria-label", label);

    btn.innerHTML = `
      <span class="icon">${icon}</span>
      <span>${label}</span>
    `;

    btn.addEventListener("click", () => {
      // Clear previous selection
      container
        .querySelectorAll(".mood-chip")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");
      onSelect(key);
    });

    container.appendChild(btn);
  });
}
