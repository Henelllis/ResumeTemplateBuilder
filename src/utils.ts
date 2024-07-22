import { Item } from "./types";

// Helper function to get a list by id
export const getListById = (
  id: string,
  lists: { [key: string]: Item[] }
): Item[] => {
  return lists[id] || [];
};

// Helper function to set a list by id
export const setListById = (
  id: string,
  items: Item[],
  lists: { [key: string]: Item[] },
  setLists: React.Dispatch<React.SetStateAction<{ [key: string]: Item[] }>>
) => {
  setLists((prevLists) => ({
    ...prevLists,
    [id]: items,
  }));
};

export const inchesToPixels = (inches: number, dpi: number) => inches * dpi;

export const getPrimaryAndSecondaryColor = (
  colorScheme: string
): [string, string] => {
  if (colorScheme === "Light") {
    return ["#FFFFFF", "#F0F0F0"]; // Very light shades
  } else if (colorScheme === "Dark") {
    return ["#A9A9A9", "#D3D3D3"]; // Light grey shades
  } else if (colorScheme === "Blue") {
    return ["#ADD8E6", "#B0E0E6"]; // Light blue shades
  } else if (colorScheme === "Green") {
    return ["#98FB98", "#90EE90"]; // Light green shades
  } else {
    return ["#A9A9A9", "#D3D3D3"]; // Default to light grey shades
  }
};
