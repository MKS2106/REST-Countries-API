const countryDetails = document.getElementById("country-detail");
const countryImage = document.getElementById("image");
const backButton = document.getElementById("back-button");


// Back button navigates back to the previous page
backButton.addEventListener("click", () => {
  window.history.back();
});
// Function to display detailed information about a country
function displayDetails(country) {
  const nativeName =
    country.name.nativeName &&
    Object.values(country.name.nativeName)[0]?.common;
   // List of border countries (country codes)  
  const borderCountries = country.borders || [];

  //Show Country Image
  countryImage.innerHTML = `<img src="${country.flags.svg}"/>`;

  // Populate country details section with information
  countryDetails.innerHTML = `
    <h3>${country.name.common || "Unknown Country"}</h3>
    <div id="details-columns">
      <p><strong>Native Name:</strong> ${nativeName || "N/A"}</p>
      <p><strong>Population:</strong> ${country.population?.toLocaleString() || "N/A"}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Subregion:</strong> ${country.subregion || "N/A"}</p>
	    <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
      <p><strong>Top-Level Domain:</strong> ${(country.tld || []).join(", ")}</p>
      <p><strong>Currencies:</strong> ${country.currencies? Object.values(country.currencies).map((c) => c.name).join(", "): "N/A"}</p>
      <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
      
    </div>
      <hr>
      <div>
       <strong>Border Countries:</strong>
        ${
          borderCountries.length > 0
            ? borderCountries
                .map((border) => `<button class="border-btn" data-code = "${border}">${border}</button>`)
                .join(" ")// identify the border country based by creating code for each one
            : "<span>None</span>"
        }
      </div>
    `;
    
}
// Function to fetch details of a border country by its country code (alpha code)
async function loadBordercountry(borderCountry){
  console.log("border country")
  try{
      // Fetch country data using alpha code from REST Countries API
    const result = await fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
  const response = await result.json(); // PArse the response from the API
  // Display details of the fetched border country
  displayDetails(response[0])
  }catch(error){
    console.error("Error loading Border country", error);
  }
  
}

// Function to initialize and load details of the selected country from localStorage
function details() {
  const countryData = localStorage.getItem("selectedCountry");
  if (countryData) {
    const country = JSON.parse(countryData);
    displayDetails(country);
  }
}
//Event handler to invoke laodCountry funtion upon clicking a border country to dispaly corresponding details
document.addEventListener("click", function (e) {
  const button = e.target.closest(".border-btn");
  if (button && button.dataset.code) {
    const code = button.dataset.code;
    loadBordercountry(code);
  }
});
//Invoke the details functions to load selected country data
details();
