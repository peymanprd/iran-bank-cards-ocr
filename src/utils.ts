import { banks } from './banks';
/**
 * Validate a card number using the Luhn algorithm.
 * @param {string} cardNumber - The card number to validate.
 * @returns {boolean} True if the card number is valid, otherwise false.
 */
export function validateCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.split('').map(Number);
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let digit = digits[digits.length - 1 - i];
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  return sum % 10 === 0;
}

/**
 * Detect the bank info (name and logo) based on the card number's prefix.
 * @param {string} cardNumber - The card number.
 * @returns {{ en: string; fa: string; logo: string } | null} The bank info (name in English, Persian, and logo URL) or null if not recognized.
 */
export function detectBankInfo(
  cardNumber: string
): { en: string; fa: string; logo: string } | null {
  const prefix = cardNumber.substring(0, 4);
  return banks[prefix] || null;
}

/**
 * Preprocess the image by cropping and resizing it.
 * @param {string} imageDataUrl - The image data URL.
 * @returns {Promise<string>} A promise that resolves to the processed image data URL.
 */
export async function preprocessImage(imageDataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageDataUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      // Crop the image to focus on the card area (adjust as needed)
      const cropWidth = img.width * 0.8;
      const cropHeight = img.height * 0.5;
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx.drawImage(
        img,
        (img.width - cropWidth) / 2, // Center the crop
        (img.height - cropHeight) / 2, // Center the crop
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      // Resize the image for better OCR accuracy
      const resizedCanvas = document.createElement('canvas');
      const resizedCtx = resizedCanvas.getContext('2d')!;
      resizedCanvas.width = 800; // Adjust as needed
      resizedCanvas.height = 600; // Adjust as needed

      resizedCtx.drawImage(
        canvas,
        0,
        0,
        resizedCanvas.width,
        resizedCanvas.height
      );

      resolve(resizedCanvas.toDataURL('image/jpeg'));
    };

    img.onerror = (error) => {
      reject(new Error(`Error loading image: ${error}`));
    };
  });
}
