import { createContext, useState } from "react";
import { BlockDescriptor, BlockRules, Item } from "../types";

export interface BlockContextValue {
  blocks: {
    headerBlockList: Array<Item>;
    primaryBlockList: Array<Item>;
    secondaryBlockList: Array<Item>;
    selectionBlockList: Array<Item>;
  };
  blockRules: {
    headerBlockList: BlockRules;
    primaryBlockList: BlockRules;
    secondaryBlockList: BlockRules;
    selectionBlockList: BlockRules;
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
  blockRules: {
    headerBlockList: {
      disallowList: [],
    },
    primaryBlockList: {
      disallowList: [],
    },
    secondaryBlockList: {
      disallowList: [],
    },
    selectionBlockList: {
      disallowList: [],
    },
  },
  setBlocks: () => {},
});

function BlockContextProvider({ children }: { children: any }) {
  const [contextValue, setContextValue] = useState<Omit<
    BlockContextValue,
    "setBlocks" | "blockRules"
  > | null>(null);

  function setBlocks(args: {
    headerBlockList: Array<Item>;
    primaryBlockList: Array<Item>;
    secondaryBlockList: Array<Item>;
    selectionBlockList: Array<Item>;
  }): void {
    console.log(args);
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
    blockRules: {
      headerBlockList: {
        disallowList: [
          BlockDescriptor.Education,
          BlockDescriptor.Experience,
          BlockDescriptor.References,
          BlockDescriptor.Certifications,
          BlockDescriptor.Skills,
        ],
      },
      primaryBlockList: {
        disallowList: [
          BlockDescriptor.Name,
          BlockDescriptor.Title,
          BlockDescriptor.ContactInfo,
        ],
      },
      secondaryBlockList: {
        disallowList: [BlockDescriptor.Name, BlockDescriptor.Title],
      },
      selectionBlockList: {
        disallowList: [], // No disallowed blocks
      },
    },
    setBlocks,
  };

  return (
    <BlockContext.Provider value={value}>{children}</BlockContext.Provider>
  );
}

export default BlockContextProvider;
