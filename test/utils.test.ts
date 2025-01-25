import { validateCardNumber, detectBankInfo } from '../src/utils';
import { banks } from '../src/banks';

describe('Bank Card Reader Utilities', () => {
  test('validateCardNumber should return true for valid card numbers', () => {
    const validCardNumber = '6037991234567890'; // Valid card number
    expect(validateCardNumber(validCardNumber)).toBe(true);
  });

  test('validateCardNumber should return false for invalid card numbers', () => {
    const invalidCardNumber = '1234567890123456'; // Invalid card number
    expect(validateCardNumber(invalidCardNumber)).toBe(false);
  });

  test('detectBankInfo should return correct bank info for known prefixes', () => {
    const cardNumber = '6037991234567890'; // Bank Melli Iran
    const bankInfo = detectBankInfo(cardNumber);
    expect(bankInfo).toEqual(banks['6037']);
  });

  test('detectBankInfo should return null for unknown prefixes', () => {
    const cardNumber = '0000123456789012'; // Unknown prefix
    const bankInfo = detectBankInfo(cardNumber);
    expect(bankInfo).toBeNull();
  });

  test('detectBankInfo should handle empty input', () => {
    const cardNumber = ''; // Empty input
    const bankInfo = detectBankInfo(cardNumber);
    expect(bankInfo).toBeNull();
  });
});
