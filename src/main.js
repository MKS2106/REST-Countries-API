// const { constant } = require("lodash");

const container = document.getElementById("country");
const searchInput = document.getElementById("country-search");

const selectedRegion = document.getElementById("region-filter");
// container.innerHTML = "";

let allCountries = []; // array to hold all the countires from API response
//Function to fetch data from API
async function fetchCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    // console.log(res);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    allCountries = await res.json();
    // console.log(countries);
    displayCountries(allCountries);
  } catch (error) {
    console.error("Failed", error);
  }
}

//Function to display countries
function displayCountries(countries) {
  container.innerHTML = "";
  countries.forEach((country) => {
    const countryDiv = document.createElement("div");
    countryDiv.classList.add("country-item");
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
    countryDiv.addEventListener("click", () => {
      // Save country data to localStorage (or sessionStorage)
      localStorage.setItem("selectedCountry", JSON.stringify(country));
      // Navigate to details page
      window.location.href = "country-detail.html";
    });
    container.appendChild(countryDiv);
  });
}

searchInput.addEventListener("input", () => {
  searchByCountry();
});

selectedRegion.addEventListener("change", function () {
  if (selectedRegion.value === "All Regions") {
    fetchCountries();
  } else filterByRegion(selectedRegion.value);
});

async function searchByCountry() {
  const searchTerm = searchInput.value.trim().toLowerCase();
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

async function filterByRegion(region) {
  if (region === "All Regions") {
    displayCountries(allCountries);
  } else {
    const filtered = allCountries.filter((c) => c.region === region);
    displayCountries(filtered);
  }
}

fetchCountries();
