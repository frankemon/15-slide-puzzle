// Util function used in the app to capitalize the first letter of a string
const capitalizeText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default capitalizeText;
