
// JavaScript module for travel search functionality

// Execute search based on user input
function executeSearch() {
    const searchInput = document.getElementById("search-input");
    const resultsContainer = document.getElementById("results-container");
  
    const userInput = searchInput.value.trim().toLowerCase(); // Convert input to lowercase and trim spaces
  
    if (!userInput) {
      resultsContainer.innerHTML = "<p>Please enter a keyword to search.</p>";
      return;
    }
  
    // Fetch travel data and display results
    fetchData().then((data) => {
      displayResults(userInput, data);
    }).catch((error) => {
      console.error("Error fetching data:", error);
      resultsContainer.innerHTML = "<p>Unable to fetch travel recommendations. Please try again later.</p>";
    });
  }
  
  // Reset the input field and results container
  function resetSearch() {
    const searchInput = document.getElementById("search-input");
    const resultsContainer = document.getElementById("results-container");
  
    searchInput.value = ""; // Clear user input
    resultsContainer.innerHTML = ""; // Clear results
  }
  
  // Fetch travel data from the JSON file
  async function fetchData() {
    const response = await fetch("./travel_recommendation_api.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json(); // Return parsed JSON data
  }
  
  // Display search results based on the keyword
  function displayResults(keyword, data) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = ""; // Clear previous results
  
    // Match user input to the categories
    if (["beach", "beaches"].includes(keyword)) {
      renderResults(data.beaches, "Beaches");
    } else if (["temple", "temples"].includes(keyword)) {
      renderResults(data.temples, "Temples");
    } else if (["country", "countries"].includes(keyword)) {
      renderResultsByCountry(data.countries);
    } else {
      resultsContainer.innerHTML = "<p>No matching results found. Try searching for 'beach', 'temple', or 'country'.</p>";
    }
  }
  
  // Render results for beaches or temples
  function renderResults(items, category) {
    const resultsContainer = document.getElementById("results-container");
  
    const heading = document.createElement("h2");
    heading.textContent = `${category} Recommendations`;
    resultsContainer.appendChild(heading);
  
    items.forEach((item) => {
      const card = createCard(item.name, item.imageUrl, item.description);
      resultsContainer.appendChild(card);
    });
  }
  
  // Render results for countries and their cities
  function renderResultsByCountry(countries) {
    const resultsContainer = document.getElementById("results-container");
  
    const heading = document.createElement("h2");
    heading.textContent = "Countries Recommendations";
    resultsContainer.appendChild(heading);
  
    countries.forEach((country) => {
      country.cities.forEach((city) => {
        const card = createCard(city.name, city.imageUrl, city.description);
        resultsContainer.appendChild(card);
      });
    });
  }
  
  // Create a card element for each result
  function createCard(title, imageUrl, description) {
    const card = document.createElement("div");
    card.className = "result-card";
  
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = title;
  
    const cardTitle = document.createElement("h3");
    cardTitle.textContent = title;
  
    const cardDescription = document.createElement("p");
    cardDescription.textContent = description;
  
    card.appendChild(image);
    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
  
    return card;
  }
  
  // Attach event listeners for search and reset buttons
  document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const resetButton = document.getElementById("reset-button");
  
    searchButton.addEventListener("click", executeSearch);
    resetButton.addEventListener("click", resetSearch);
  });