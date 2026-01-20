import * as pdfjsLib from 'pdfjs-dist';

// Use a CDN for the worker to avoid complex vite configuration for now
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export const extractTextFromPdf = async (file: File): Promise<string> => {
    // Check file size before processing
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('PDF file too large. Maximum size is 10MB.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    // Process pages in batches to avoid blocking the UI thread
    for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) { // Limit to first 20 pages
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n\n';

        // Cap extraction at ~10,000 words to avoid context blowup or slow processing
        if (fullText.length > 50000) break;

        // Yield control back to the browser occasionally
        if (i % 5 === 0) {
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }

    return fullText.trim();
};
