# Iranian Bank Cards OCR

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/iran-bank-cards-ocr.svg)](https://www.npmjs.com/package/iran-bank-cards-ocr)
[![GitHub stars](https://img.shields.io/github/stars/your-username/iran-bank-cards-ocr.svg)](https://github.com/your-username/iran-bank-cards-ocr/stargazers)

A TypeScript library to detect Iranian bank names, logos, and validate card numbers using OCR (Tesseract.js) and the Luhn algorithm.

## Features

- **Bank Detection**: Detect Iranian bank names (in English and Persian) and logos based on card numbers.
- **Card Validation**: Validate card numbers using the Luhn algorithm.
- **OCR Integration**: Extract card numbers from images using Tesseract.js.
- **Easy to Use**: Simple and intuitive API for quick integration.

## Installation

You can install the package via npm:

```bash
npm install iran-bank-cards-ocr
```

Or using yarn:

```bash
yarn add iran-bank-cards-ocr
```

## Usage

Here's a quick example to get you started:

```typescript
import readBankCard from 'iran-bank-card-reader';

async function main() {
  const { cardNumber, bankInfo } = await readBankCard();

  if (cardNumber && bankInfo) {
    console.log(`Card Number: ${cardNumber}`);
    console.log(`Bank Name (English): ${bankInfo.en}`);
    console.log(`Bank Name (Persian): ${bankInfo.fa}`);
    console.log(`Bank Logo URL: ${bankInfo.logo}`);
  } else {
    console.log('No valid card number found in the image.');
  }
}

main();
```

## API

### `readBankCard()`

Captures an image from the camera, processes it to extract the card number, and detects the bank information.

**Returns**: A promise that resolves to an object with the following properties:

- `cardNumber`: The extracted card number (string | null).
- `bankInfo`: An object containing the bank name (in English and Persian) and logo URL (object | null).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tesseract.js](https://github.com/naptha/tesseract.js) for OCR capabilities.
- [Luhn Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) for card number validation.

---

Made with ❤️ by [Peyman Pirzadeh](https://github.com/peymanprd)
