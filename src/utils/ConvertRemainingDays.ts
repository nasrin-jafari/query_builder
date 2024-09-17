export function ConvertRemainingDays(remainingDays: number): string {
  // Ensure the input is a positive number
  if (remainingDays < 0) {
    return 'Invalid input';
  }

  const years = Math.floor(remainingDays / 365);
  const months = Math.floor((remainingDays % 365) / 30);
  const days = (remainingDays % 365) % 30;

  let remainingText = '';

  if (years > 0) {
    remainingText += `${years} سال و `;
  }

  if (months > 0) {
    remainingText += `${months} ماه و `;
  }

  remainingText += `${days} روز`;

  return remainingText;
}
