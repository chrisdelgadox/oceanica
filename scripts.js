// Configuramos el "Worker" desde el CDN para que procese el PDF
const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Nombre exacto de tu archivo
const url = './d5d52086-eef3-4d88-936a-400c629a67f4.pdf';
const container = document.getElementById('pdf-canvas-wrapper');

async function loadPDF() {
    try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        
        // Limpiamos el contenedor
        container.innerHTML = '';

        // Renderizamos todas las páginas
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            
            // Ajuste Responsive: Calculamos la escala basada en el ancho del dispositivo
            const clientWidth = document.getElementById('pdf-viewer-container').clientWidth - 20;
            const viewportDefault = page.getViewport({ scale: 1 });
            const scale = clientWidth / viewportDefault.width;
            const viewport = page.getViewport({ scale: scale });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            container.appendChild(canvas);

            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
        }
    } catch (error) {
        console.error("Error visualizando el PDF:", error);
        container.innerHTML = `<p style="color:white; text-align:center; padding:20px;">
            El documento no pudo ser verificado. <br> Error: ${error.message}</p>`;
    }
}

window.addEventListener('load', loadPDF);
