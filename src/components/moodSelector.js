const moods = [
  { 
    key: "work", 
    label: "Work", 
    icon: `
      <svg class="mood-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="2" y1="20" x2="22" y2="20"></line>
        <line x1="12" y1="17" x2="12" y2="20"></line>
      </svg>
    `
  },
  { 
    key: "date", 
    label: "Date", 
    icon: `
      <svg class="mood-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    `
  },
  { 
    key: "quickbite", 
    label: "Quick Bite", 
    icon: `
      <svg class="mood-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="1" x2="6" y2="4"></line>
        <line x1="10" y1="1" x2="10" y2="4"></line>
        <line x1="14" y1="1" x2="14" y2="4"></line>
      </svg>
    `
  },
  { 
    key: "budget", 
    label: "Budget", 
    icon: `
      <svg class="mood-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
        <line x1="7" y1="7" x2="7.01" y2="7"></line>
      </svg>
    `
  },
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
