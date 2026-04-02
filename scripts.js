document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema de Verificación Oceánica Activo");
    
    // Podemos añadir una validación de carga para el iframe
    const iframe = document.getElementById('pdf-frame');
    
    iframe.onerror = () => {
        alert("Error al cargar el documento de seguridad. Contacte a soporte.");
    };

    // Efecto de carga suave
    iframe.style.opacity = '0';
    iframe.onload = () => {
        iframe.style.transition = 'opacity 0.5s ease';
        iframe.style.opacity = '1';
    };
});
