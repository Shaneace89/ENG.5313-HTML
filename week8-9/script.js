// Step 1: Find the button and help box from our HTML page
const helpButton = document.querySelector('#help-btn');
const helpBox = document.querySelector('#help-box');

// Step 2: Listen for button clicks and toggle the help box
helpButton.addEventListener('click', function() {
  // classList.toggle adds 'hidden' if it's missing, or removes it if it's there!
  helpBox.classList.toggle('hidden');
});

// Step 3: Our JSON Data Envelope (DTO)
const termData = {
  term: "DTO (Data Transfer Object)",
  definition: "A digital envelope used to neatly carry simple text or numbers between computer systems without extra code.",
  author: "Technical Communication Handbook"
};

// Find the term button and card box
const loadTermBtn = document.querySelector('#load-term-btn');
const termCard = document.querySelector('#term-card');

// Toggle the definition card when clicked.
loadTermBtn.addEventListener('click', function() {
  const isExpanded = loadTermBtn.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    termCard.hidden = true;
    loadTermBtn.setAttribute('aria-expanded', 'false');
    loadTermBtn.textContent = '📖 Show Definition for "DTO"';
    return;
  }

  termCard.innerHTML = `
    <h3 class="font-bold text-slate-900 text-sm mb-1">${termData.term}</h3>
    <p class="text-slate-700 text-xs mb-2">${termData.definition}</p>
    <span class="text-[10px] text-blue-600 font-semibold uppercase tracking-wider block">Source: ${termData.author}</span>
  `;
  termCard.hidden = false;
  loadTermBtn.setAttribute('aria-expanded', 'true');
  loadTermBtn.textContent = '📖 Hide Definition for "DTO"';
});