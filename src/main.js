const container = document.getElementById("country");
const searchInput = document.getElementById("country-search");
const searchButton = document.getElementById("btn");
const selectedRegion = document.getElementById("region-filter")
container.innerHTML = "";

async function fetchCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    // console.log(res);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    const countries = await res.json();
    // console.log(countries);
    displayCountries(countries);
  } catch (error) {
    console.error("Failed", error);
  }
}

function displayCountries(countries) {
  console.log("Inside Display Countries");
    container.innerHTML = "";
  countries.forEach((country) => {
    const countryDiv = document.createElement("div");
    // countryDiv.innerHTML = "display data"
    countryDiv.innerHTML = `<img style = "width:200px" src="${country.flags.svg}"/>
      <h3>${country.name.common}</h3>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Population:</strong> ${country.population}</p>

      <hr>
    `;
    container.appendChild(countryDiv);
  });
}

searchButton.addEventListener("click", function () {
  console.log("upon clicking search button");
  let countrySearched = searchInput.value;
  if(countrySearched){
  searchTheCountry(countrySearched);
  }else{
    container.innerHTML = "<p>Please enter a country.</p>"
  }
});

selectedRegion.addEventListener("change", function(){
  console.log("Selected a region")
  if(selectedRegion.value === "select"){
    container.innerHTML = "<p>Please select a region.</p>"
  }
  if(selectedRegion.value === "All Regions"){
    fetchCountries();
  }else
  filterByRegion(selectedRegion.value)
})

async function searchTheCountry(country) {
  console.log("Inside Search function");
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );
    if (!response.ok) {
      throw new Error("No such Country Found");
    }
    const data = await response.json();
    displayCountries(data);
      searchInput.value = "";
      } catch (error) {
    console.error("Search error:", error);
    container.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}



async function filterByRegion(region){
try {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );
    if (!response.ok) {
      throw new Error("No such Country Found");
    }
    const result = await response.json();
    displayCountries(result);
      searchInput.value = "";
    selectedRegion.value = "select";
  } catch (error) {
    console.error("Search error:", error);
    container.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

fetchCountries();