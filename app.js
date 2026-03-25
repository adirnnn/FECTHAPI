const btn = document.getElementById("btn");
const input = document.getElementById("input");
const statusText = document.getElementById("status");
const result = document.getElementById("result");

btn.addEventListener("click", async () => {
  const query = input.value.trim();

  if (!query) return;

  statusText.textContent = "Cargando...";
  result.innerHTML = "";

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);

    if (!response.ok) {
      throw new Error("No encontrado");
    }

    const data = await response.json();
    const country = data[0];

    result.innerHTML = `
      <p><strong>Nombre:</strong> ${country.name.common}</p>
      <p><strong>Capital:</strong> ${country.capital?.[0]}</p>
      <p><strong>Región:</strong> ${country.region}</p>
      <p><strong>Población:</strong> ${country.population}</p>
      <img src="${country.flags.png}" width="150">
    `;

    statusText.textContent = "";

  } catch (error) {
    statusText.textContent = "Error: país no encontrado";
  }
});