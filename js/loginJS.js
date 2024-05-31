// Definir la función para mostrar la contraseña
function mostrarPassword() {
  const passwordField = document.getElementById("floatingPassword");
  const toggleIcon = document.getElementById("togglePasswordIcon");
  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleIcon.classList.remove("bi-eye-slash");
    toggleIcon.classList.add("bi-eye");
  } else {
    passwordField.type = "password";
    toggleIcon.classList.remove("bi-eye");
    toggleIcon.classList.add("bi-eye-slash");
  }
}

// Definir la función para iniciar sesión
function iniciarSesion() {
  let username = document.getElementById("floatingUsername").value; // Asegúrate de obtener el valor del campo
  let password = document.getElementById("floatingPassword").value; // Asegúrate de obtener el valor del campo

  // Cargar los usuarios desde el archivo JSON
  fetch('jsones/usuarios.json')
    .then((response) => response.json())
    .then((data) => {
      // Iterar sobre los usuarios
      for (let usuario of data) {
        if (usuario.correo_electronico === username && usuario.contrasena === password) {
          alert("Credenciales válidas");
          window.open('Home.html', '_self');
          return; // Salir del bucle una vez encontrado el usuario
        }
      }
      // Si no se encuentra el usuario, mostrar un mensaje de error
      alert("Credenciales invalidas");
    })
    .catch((error) => {
      console.error("Error al cargar los usuarios:", error);
    });
}
