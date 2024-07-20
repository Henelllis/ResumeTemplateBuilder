import { createContext, useState } from "react";
import { Item } from "../types";

export interface BlockContextValue {
  blocks: {
    headerBlockList: Array<Item>;
    primaryBlockList: Array<Item>;
    secondaryBlockList: Array<Item>;
    selectionBlockList: Array<Item>;
  };
  setBlocks: (blocks: {
    headerBlockList: Array<Item>;
    primaryBlockList: Array<Item>;
    secondaryBlockList: Array<Item>;
    selectionBlockList: Array<Item>;
  }) => void;
}

export const BlockContext = createContext<BlockContextValue>({
  blocks: {
    headerBlockList: [],
    primaryBlockList: [],
    secondaryBlockList: [],
    selectionBlockList: [],
  },
  setBlocks: () => {},
});

function BlockContextProvider({ children }: { children: any }) {
  const [contextValue, setContextValue] = useState<Omit<
    BlockContextValue,
    "setBlocks"
  > | null>(null);

  function setBlocks(args: {
    headerBlockList: Array<Item>;
    primaryBlockList: Array<Item>;
    secondaryBlockList: Array<Item>;
    selectionBlockList: Array<Item>;
  }): void {
    setContextValue({
      blocks: {
        headerBlockList: args.headerBlockList,
        primaryBlockList: args.primaryBlockList,
        secondaryBlockList: args.secondaryBlockList,
        selectionBlockList: args.selectionBlockList,
      },
    });
  }

  const value = {
    blocks: {
      headerBlockList: contextValue?.blocks.headerBlockList || [],
      primaryBlockList: contextValue?.blocks.primaryBlockList || [],
      secondaryBlockList: contextValue?.blocks.secondaryBlockList || [],
      selectionBlockList: contextValue?.blocks.selectionBlockList || [],
    },
    setBlocks,
  };

  return (
    <BlockContext.Provider value={value}>{children}</BlockContext.Provider>
  );
}

export default BlockContextProvider;
