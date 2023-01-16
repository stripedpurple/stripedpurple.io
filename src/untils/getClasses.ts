export const getClasses = (classes: Object = {}): string => {
  return Object.keys(classes)
    .filter((key) => classes[key])
    .join(" ");
};
