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
