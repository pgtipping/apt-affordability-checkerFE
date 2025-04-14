/**
 * Formats a number into a US dollar currency string with commas and two decimal places.
 * e.g., 12345.67 -> $12,345.67
 * Handles null, undefined, and non-numeric values gracefully.
 *
 * @param {number|string|null|undefined} value The number to format.
 * @returns {string} The formatted currency string, or '$ -' if input is invalid or zero. Consider returning '$0.00' if explicit zero display is preferred.
 */
export const formatCurrency = (value) => {
  const number = Number(value);

  // Return a placeholder if the value is null, undefined, NaN, or zero
  // Adjust the placeholder ('$ -', '$0.00', '') as needed for UI consistency
  if (value === null || value === undefined || isNaN(number) || number === 0) {
    // Let's return $0.00 for explicit zero, and '$ -' otherwise for clarity
    return isNaN(number) || value === null || value === undefined
      ? "$ -"
      : "$0.00";
  }

  // Use toLocaleString for robust currency formatting
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
