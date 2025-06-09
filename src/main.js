const container = document.getElementById("country");
const searchInput = document.getElementById("country-search");
const selectedRegion = document.getElementById("region-filter");

let allCountries = []; // array to hold all the countires from API response

//Function to fetch data from API
async function fetchCountries() {
  try {
    // const res = await fetch("https://restcountries.com/v3.1/all");
    //fetch all countries with specified fields
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,borders"
    );

      if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    allCountries = await res.json(); //parse JSON data from response
    displayCountries(allCountries); // Display all countries in the home page
  } catch (error) {
    console.error("Failed", error);
  }
}

//Function to display countries on the page
function displayCountries(countries) {
  container.innerHTML = ""; // Clear existing content
  //Loop through each country to and create a card element
  countries.forEach((country) => {
    const countryDiv = document.createElement("div"); // Create a div per country(each card)
    countryDiv.classList.add("country-item");
    // Build inner HTML for country card, showing flag, name, population, region, and capital
    countryDiv.innerHTML = `<img style = "width:100%; height:150px; object-fit:cover; border-radius:4px; margin-bottom:0.5rem;" src="${
      country.flags.svg
    }"/>
      <h3>${country.name.common || "Unknown Country"}</h3>
            <p><strong>Population:</strong> ${
              country.population?.toLocaleString() || "N/A"
            }</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>

      <hr>
    `;
    // Add click event to save selected country in localStorage and navigate to detail page
    countryDiv.addEventListener("click", () => {
      // Save country data to localStorage (or sessionStorage)
      localStorage.setItem("selectedCountry", JSON.stringify(country));
      // Navigate to details page
      window.location.href = "country-detail.html";
    });
    container.appendChild(countryDiv);
  });
}

// Event listener for search input - triggers search as user types
searchInput.addEventListener("input", () => {
  searchByCountry();
});

// Event listener for region filter dropdown change
selectedRegion.addEventListener("change", function () {
  if (selectedRegion.value === "All Regions") {
    fetchCountries();
  } else filterByRegion(selectedRegion.value);
});

// Function to search countries by name based on search input value
async function searchByCountry() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  // If search input is empty, reset region filter and show all countries
  if (!searchTerm) {
    selectedRegion.value = "All Regions";
    displayCountries(allCountries);
    return;
  }

  // Reset region to all regions
  selectedRegion.value = "All Regions";

  // Filter allCountries by search term
  const filtered = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );

  if (filtered.length === 0) {
    container.innerHTML = `<p style="color:red;">No countries found matching "${searchTerm}".</p>`;
  } else {
    displayCountries(filtered);
  }

  // Clear search input if you want
  // searchInput.value = "";
}

// Function to filter countries by selected region
async function filterByRegion(region) {
  if (region === "All Regions") {
    displayCountries(allCountries);
  } else {
    const filtered = allCountries.filter((c) => c.region === region);
    displayCountries(filtered);
  }
}

//Invoke fetchCountries function to display all countries on page load
fetchCountries();
