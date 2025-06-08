// const { functionsIn } = require("lodash");

const countryDetails = document.getElementById("country-detail");
const countryImage = document.getElementById("image");
const backButton = document.getElementById("back-button");

// async functionsIn
backButton.addEventListener("click", () => {
  window.history.back();
});

function displayDetails(country) {
  console.log("i am here");
  const nativeName =
    country.name.nativeName &&
    Object.values(country.name.nativeName)[0]?.common;
  const borderCountries = country.borders || [];
  console.log(borderCountries)

  countryImage.innerHTML = `<img src="${country.flags.svg}"/>`;
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
                .map((border) => `<button class="border-btn" onclick="loadBordercountry('${border}')">${border}</button>`)
                .join(" ")
            : "<span>None</span>"
        }
      </div>
    `;
    
}
async function loadBordercountry(borderCountry){
  console.log("border country")
  try{
    const result = await fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
  const respose = await result.json();
  displayDetails(respose[0])
  }catch(error){
    console.error("Error loading Border country", error);
  }
  
}

function details() {
  const countryData = localStorage.getItem("selectedCountry");
  if (countryData) {
    const country = JSON.parse(countryData);
    displayDetails(country);
  }
}

details();
