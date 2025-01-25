// Import Tesseract.js for OCR (Optical Character Recognition)
import Tesseract from 'tesseract.js';
// Import utility functions and bank data
import { detectBankInfo, validateCardNumber, preprocessImage } from './utils';
/**
 * Capture an image from the user's camera and return it as a data URL.
 * @returns {Promise<string>} A promise that resolves to the image data URL.
 */
async function captureImageFromCamera(): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        video.srcObject = stream;

        video.onloadedmetadata = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const context = canvas.getContext('2d');
          if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageDataUrl = canvas.toDataURL('image/jpeg');
            resolve(imageDataUrl);

            // Stop the video stream
            stream.getTracks().forEach((track) => track.stop());
          } else {
            reject(new Error('Could not get canvas context.'));
          }
        };
      })
      .catch((error) => {
        reject(new Error(`Error accessing camera: ${error.message}`));
      });
  });
}

/**
 * Extract the card number from an image using OCR.
 * @param {string} imageDataUrl - The image data URL.
 * @returns {Promise<string | null>} A promise that resolves to the extracted card number or null if not found.
 */
async function extractCardNumberFromImage(
  imageDataUrl: string
): Promise<string | null> {
  try {
    // Preprocess the image (crop and resize)
    const processedImage = await preprocessImage(imageDataUrl);

    // Use Tesseract.js to recognize text from the processed image
    const { data } = await Tesseract.recognize(processedImage, 'eng', {
      logger: (m) => console.log(m), // Log progress (optional)
    });

    // Use a regex to find a 16-digit number (assumed to be the card number)
    const cardNumberRegex = /\b\d{16}\b/;
    const match = data.text.match(cardNumberRegex);

    return match ? match[0] : null;
  } catch (error) {
    console.error('Error processing image:', error);
    return null;
  }
}

/**
 * Main function to capture an image, extract the card number, and detect the bank info.
 * @returns {Promise<{ cardNumber: string | null; bankInfo: { en: string; fa: string; logo: string } | null }>} An object containing the card number and bank info (name and logo).
 */
async function readBankCard(): Promise<{
  cardNumber: string | null;
  bankInfo: { en: string; fa: string; logo: string } | null;
}> {
  try {
    console.log('Capturing image from camera...');
    const imageDataUrl = await captureImageFromCamera();

    console.log('Processing image to extract card number...');
    const cardNumber = await extractCardNumberFromImage(imageDataUrl);

    if (cardNumber && validateCardNumber(cardNumber)) {
      const bankInfo = detectBankInfo(cardNumber);
      if (bankInfo) {
        return { cardNumber, bankInfo };
      } else {
        console.log('Bank not recognized for the given card number.');
        return { cardNumber, bankInfo: null };
      }
    } else {
      console.log('No valid card number found in the image.');
      return { cardNumber: null, bankInfo: null };
    }
  } catch (error) {
    console.error('Error reading bank card:', error);
    return { cardNumber: null, bankInfo: null };
  }
}

// Export the main function
export default readBankCard;
