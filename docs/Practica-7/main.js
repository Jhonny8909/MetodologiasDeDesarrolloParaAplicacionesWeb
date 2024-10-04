document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío automático del formulario
  
    // Limpiar mensajes de error previos
    document.getElementById('errorNombre').textContent = '';
    document.getElementById('errorCorreo').textContent = '';
    document.getElementById('errorPassword').textContent = '';
    document.getElementById('errorConfirmPassword').textContent = '';
  
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    let esValido = true;
  
    // Validación del nombre: No vacío y solo letras y espacios
    const nombreRegex = /^[a-zA-Z\s]+$/;
    if (!nombre || !nombreRegex.test(nombre)) {
      document.getElementById('errorNombre').textContent = 'Por favor, introduce un nombre válido (solo letras y espacios).';
      esValido = false;
    }
  
    // Validación del correo electrónico con regex
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!correo || !correoRegex.test(correo)) {
      document.getElementById('errorCorreo').textContent = 'Por favor, introduce un correo electrónico válido.';
      esValido = false;
    }
  
    // Validación de la contraseña: Al menos 8 caracteres, 1 número, 1 mayúscula, 1 minúscula, 1 carácter especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      document.getElementById('errorPassword').textContent = 'La contraseña debe tener al menos 8 caracteres, incluyendo 1 número, 1 mayúscula, 1 minúscula y 1 carácter especial.';
      esValido = false;
    }
  
    // Validación de la confirmación de la contraseña
    if (password !== confirmPassword) {
      document.getElementById('errorConfirmPassword').textContent = 'Las contraseñas no coinciden.';
      esValido = false;
    }
  
    // Si todas las validaciones son correctas, simula el envío del formulario con un loader
    if (esValido) {
      document.getElementById('loader').style.display = 'block'; // Mostrar loader
  
      setTimeout(function() {
        document.getElementById('loader').style.display = 'none'; // Ocultar loader
        document.getElementById('successMessage').style.display = 'block'; // Mostrar mensaje de éxito
        document.getElementById('registroForm').reset(); // Reiniciar el formulario
      }, 5000); // Simula un envío de 5 segundos
    }
  });