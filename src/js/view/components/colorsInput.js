const root = document.querySelector(":root");

export const changeRootColor = function (color) {
  if (color === "green-color") {
    root.style.setProperty("--color-primary", "#50D890");
  }
  if (color === "blue-color") {
    root.style.setProperty("--color-primary", "#4649FF");
  }
  if (color === "purple-color") {
    root.style.setProperty("--color-primary", "#5d23c9");
  }
};

export const changeRootModeColors = function (color) {
  if (color === "normal-mode") {
    root.style.setProperty("--color-grey-light-1", "#faf9f9");
    root.style.setProperty("--color-grey-light-2", "#f4f2f2");
    root.style.setProperty("--color-grey-light-3", "#f0eeee");
    root.style.setProperty("--color-grey-light-4", "#ccc");
    root.style.setProperty("--color-grey-dark-1", "#333");
    root.style.setProperty("--color-grey-dark-2", "#777");
    root.style.setProperty("--color-grey-dark-3", "#999");
  }
  if (color === "dark-mode") {
    root.style.setProperty("--color-grey-light-1", "#151515");
    root.style.setProperty("--color-grey-light-2", "#301B3F");
    root.style.setProperty("--color-grey-light-3", "#B4A5A5");
    root.style.setProperty("--color-grey-light-4", "#3C415C");
    root.style.setProperty("--color-grey-dark-1", "#2A2438");
    root.style.setProperty("--color-grey-dark-2", "#faf9f9");
    root.style.setProperty("--color-grey-dark-3", "#343434");
  }
  if (color === "black-mode") {
    root.style.setProperty("--color-grey-light-1", "#000000");
    root.style.setProperty("--color-grey-light-2", "#181818");
    root.style.setProperty("--color-grey-light-3", "#100720");
    root.style.setProperty("--color-grey-light-4", "#100F0F");
    root.style.setProperty("--color-grey-dark-1", "#040303");
    root.style.setProperty("--color-grey-dark-2", "#faf9f9");
    root.style.setProperty("--color-grey-dark-3", "#343434");
  }
};
