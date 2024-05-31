let archivo = 'jsones/alojamientos.json';

// Función para cargar los alojamientos
function cargarAlojamientos(ruta) {
  archivo = ruta; 
  var contentContainer = document.getElementById("content-container");
  contentContainer.innerHTML = "";
  cargarJSON(function (data) {
    generarHTML(data);
  });
}

function cargarJSON(callback) {
  fetch(archivo)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => callback(data))
    .catch((error) => console.error("Error:", error));
}

function generarHTML(alojamientos) {
  var contentContainer = document.getElementById("content-container");
  var rowCounter = 1; // Variable para contar el número de filas creadas
  var alojamientosCounter = 0; // Variable para contar el número de alojamientos agregados a la fila actual

  // Mezclar los alojamientos de forma aleatoria
  alojamientos = shuffleArray(alojamientos);

  // Iterar sobre cada alojamiento
  alojamientos.forEach(function (alojamiento, index) {
    // Si se alcanza el máximo de alojamientos por fila o es el primer alojamiento, crear una nueva fila
    if (alojamientosCounter == 4 || index == 0) {
      contentContainer.innerHTML += `<div class="row col-md-10 m-auto" id="row${rowCounter}"></div>`;
      rowCounter++;
      alojamientosCounter = 0;
    }

    // Obtener la referencia de la fila actual
    var currentRow = document.getElementById(`row${rowCounter - 1}`);

    // Crear el HTML del alojamiento y agregarlo a la fila actual
    var alojamientoHTML = `
        <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
    <div class="card">
        <img src="${
          alojamiento.url
        }" class="card-img-top tamano-max-img" alt="${
      alojamiento.titulo_anuncio
    }">
        <div class="card-body descripcion d-flex flex-column justify-content-center">
            <h5 class="card-title">${alojamiento.titulo_anuncio}</h5>
            <p class="card-text">${alojamiento.descripcion}</p>
            <p class="card-text"><b>$${alojamiento.precio_noche.toFixed(
              2
            )} USD noche</b></p>
        </div>
    </div>
</div>`;
    currentRow.innerHTML += alojamientoHTML;

    alojamientosCounter++;
  });
}

// Función para mezclar un array de forma aleatoria (algoritmo de Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Llamar a la función para cargar el JSON y generar el HTML
cargarJSON(function (data) {
  generarHTML(data);
});

function abrirPerfil(){
  window.open('perfil.html', '_self');
}
