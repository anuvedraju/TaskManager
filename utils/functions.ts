// Unique ID generator
// Unique ID generator (UUID v4 equivalent)
export const generateUniqueId = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0; // Random hex digit
    const value = char === "x" ? random : (random & 0x3) | 0x8; // Special handling for 'y'
    return value.toString(16); // Convert to hex
  });
};

export function getRandomColor() {
  const randomColor = () => Math.floor(Math.random() * 256);

  let r, g, b;

  do {
    r = randomColor();
    g = randomColor();
    b = randomColor();
  } while (r > 240 && g > 240 && b > 240); // Exclude near-white colors

  return `rgb(${r}, ${g}, ${b})`;
}

// Example usage
console.log(getRandomColor());

export const avatharColorMap: { [key: string]: any } = {
  0: "#DAA520",
  1: "#1E90FF",
  2: "#FF4500",
  3: "#228B22",
  4: "#6A0DAD",
  5: "#FFD700",
  6: "#DC143C",
  7: "#008080",
  8: "#2F4F4F",
  9: "#FF69B4",
  10: "#DAA520",
};
