// ===================================================
// ENG 5313: WEEK 10 - FETCH, ASYNC & ERROR HANDLING
// ===================================================

// Step 1: Find elements on the page
const fetchBtn = document.querySelector('#fetch-btn');
const badFetchBtn = document.querySelector('#bad-fetch-btn');
const resultCard = document.querySelector('#result-card');
const errorBox = document.querySelector('#error-box');
const errorMessage = document.querySelector('#error-message');

// Simulated mock API endpoints for testing
const MOCK_API_SUCCESS = 'https://jsonplaceholder.typicode.com/todos/1';
const MOCK_API_404 = 'https://jsonplaceholder.typicode.com/invalid-endpoint-404';

// Step 2: Main Async Fetch Function with Clean Error Handling
async function handleFetchTerm(url, customTermName) {
  try {
    // Show loading indicator & clear old errors
    resultCard.innerHTML = `⏳ Connecting to server...`;
    errorBox.classList.add('hidden');

    // Make async HTTP request
    const response = await fetch(url);

    // Rule: Manually verify response.ok for 404/500 HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Term or endpoint not found on server.`);
    }

    // Parse JSON envelope
    const data = await response.json();

    // Render formatted output to UI
    resultCard.innerHTML = `
      

        
STATUS: 200 OK

        
API (Application Programming Interface)

        

A messenger that takes a request from a user or app and delivers the response back from a server.


        

Server Response Payload ID: ${data.id} Payload Title: ${data.title} It is ${data.completed} to think that I have the answers.


      

    `;
console.log(data);

  } catch (error) {
    // Catch both network failures and thrown response.ok errors
    errorBox.classList.remove('hidden');
    errorMessage.textContent = error.message;
    resultCard.innerHTML = `Fetch failed. See error box above for details.`;
    console.log('errrrrrrrr....', error);
  }
}

// Step 3: Attach Click Listeners
fetchBtn.addEventListener('click', function() {
  handleFetchTerm(MOCK_API_SUCCESS, 'API');
});

badFetchBtn.addEventListener('click', function() {
  handleFetchTerm(MOCK_API_404, 'Invalid Term');
});