export function hideCreditCard(cardNumber) {
  const length = cardNumber.length;

  // splice the last four characters
  const lastFour = cardNumber.slice(-4);
  const remaining = cardNumber.slice(0, length - 4);

  // mask the remaining numbers with asterisks
  const masked = '*'.repeat(remaining.length) + lastFour;

  return masked;
}
