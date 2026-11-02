// Step 1: Find elements on the page
const fetchBtn = document.querySelector('#fetch-btn');
const resultCard = document.querySelector('#result-card');
const errorBox = document.querySelector('#error-box');
const errorMessage = document.querySelector('#error-message');

// Live PokéAPI endpoints for testing
const API_SUCCESS = 'https://pokeapi.co/api/v2/pokemon/pikachu';
const API_404 = 'https://pokeapi.co/api/v2/pokemon/missingno'; // This will trigger a 404

// Step 2: Main Async Fetch Function with Promise.all
async function handleFetchPokemon(pokemonUrl) {
  try {
    // Show loading indicator & clear old errors
    resultCard.innerHTML = `⏳ Connecting to Kanto servers...`;
    errorBox.classList.add('hidden');

    // Open-Meteo API for Kantō (Tokyo) - No API key required, returns Fahrenheit
    const weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true&temperature_unit=fahrenheit';

    // Promise.all fires both fetch requests at the exact same time
    const [pokemonResponse, weatherResponse] = await Promise.all([
      fetch(pokemonUrl),
      fetch(weatherUrl)
    ]);

    // Rule: Manually verify both responses for 404/500 HTTP errors
    if (!pokemonResponse.ok || !weatherResponse.ok) {
      throw new Error(`HTTP Error: Failed to retrieve data from servers.`);
    }

    // Parse both JSON envelopes
    const pokemonData = await pokemonResponse.json();
    const weatherData = await weatherResponse.json();

    // Render formatted output to UI, combining both datasets
    resultCard.innerHTML = `
      <div class="text-left w-full">
        <span class="inline-block bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded mb-3">
          STATUS: 200 OK
        </span>
        
        <!-- Live Weather Injection -->
        <div class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
          🌤️ <strong>Trainer Leaf's Kanto Weather Report:</strong> 
          It is currently ${weatherData.current_weather.temperature}°F in the Kantō region.
        </div>

        <!-- Pokémon Data Injection -->
        <div class="flex items-center gap-4">
          <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" class="w-24 h-24 bg-slate-200 rounded-lg rendering-pixelated">
          <div>
            <h2 class="text-lg font-bold text-slate-800 capitalize">${pokemonData.name}</h2>
            <p class="text-slate-600 mb-1">National Dex: #${pokemonData.id}</p>
            <p class="text-slate-600"><strong>Type:</strong> ${pokemonData.types.map(t => t.type.name).join(', ')}</p>
          </div>
        </div>
      </div>
    `;
    
    console.log("Pokémon Success:", pokemonData);
    console.log("Weather Success:", weatherData);

  } catch (error) {
    errorBox.classList.remove('hidden');
    errorMessage.textContent = error.message;
    resultCard.innerHTML = `Fetch failed. See error box above for details.`;
    console.error('Fetch Error:', error);
  }
}

// Step 3: Attach Click Listeners
fetchBtn.addEventListener('click', function() {
  // Generate a random whole number from 1 to 151
  const randomId = Math.floor(Math.random() * 151) + 1;
  
  // Dynamically build the URL with the random ID
  const randomUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
  
  // Pass the new URL into your existing fetch function
  handleFetchPokemon(randomUrl);
});
