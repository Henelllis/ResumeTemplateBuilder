export interface Item {
  id: string; // Unique identifier for the item
  content: BlockDescriptor; // Block type of Item
  configType: ConfigType; // Type of configuration for the item
}

export interface BlockRules {
  disallowList: BlockDescriptor[];
}

export type Experience = {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  degree: string;
  major: string;
  university?: string; // Made optional for High School cases
  school?: string; // Made optional for University cases
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Certification = {
  name: string;
  date: string;
};

export type Skill = {
  name: string;
  score: number;
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  description: string;
  references: any[]; // Can be further defined based on reference structure
  linkedin: string;
  skills: Skill[];
};

export type TemplateLayout =
  | "HEADER_PRIMARY"
  | "HEADER_PRIMARY_SECONDARY"
  | "HEADER_SECONDARY_PRIMARY"
  | "SPLIT";

export type BlockListKey =
  | "headerBlockList"
  | "primaryBlockList"
  | "secondaryBlockList"
  | "selectionBlockList";

export enum BlockDescriptor {
  "ContactInfo" = "ContactInfo",
  "Title" = "Title",
  "Name" = "Name",
  "Education" = "Education",
  "Skills" = "Skills",
  "Experience" = "Experience",
  "Description" = "Description",
  "Certifications" = "Certifications",
  "References" = "References",
  "header" = "header",
  "document" = "document",
  "primary" = "primary",
  "secondary" = "secondary",
}

export type TemplateBuilderMode = "BLOCK_PLACEMENT_EDIT" | "HTML_EDIT";

export enum ConfigType {
  "LIST" = "LIST",
  "DETAIL" = "DETAIL",
  "TIME_SPAN" = "TIME_SPAN",
  "TEXT" = "TEXT",
  "EVENT" = "EVENT",
  "PERIOD_OF_TIME" = "PERIOD_OF_TIME",
  "CONTACT" = "CONTACT",
  "SECTION" = "PRIMARY",
  "DOCUMENT" = "DOCUMENT",
}

export const ConfigLayouts = {
  DOCUMENT: {
    primaryColor: {
      type: "string",
      default: "#FFFFFF",
    },
    secondaryColor: {
      type: "string",
      default: "#000000",
    },
    padding: {
      type: "number",
      default: 0,
      min: 0,
      max: 100,
    },
    margin: {
      type: "number",
      default: 0,
      min: 0,
      max: 100,
    },
    fontType: {
      type: "string",
      default: "Arial",
    },
    fontSize: {
      type: "number",
      default: 12,
      min: 8,
      max: 72,
    },
    fontColor: {
      type: "string",
      default: "#000000",
    },
    waterMarkLogo: {
      type: "string",
      default: "",
    },
  },
  HEADER: {
    backgroundColor: {
      type: "string",
      default: "#000000",
    },
    padding: {
      type: "number",
      default: 0,
      min: 0,
      max: 100,
    },
    margin: {
      type: "number",
      default: 0,
      min: 0,
      max: 100,
    },
  },
  TEXT: {
    fontSize: {
      type: "number",
      default: 12,
      min: 8,
      max: 72,
    },
    fontFamily: {
      type: "string",
      default: "Arial",
    },
    color: {
      type: "string",
      default: "#000000",
    },
  },
  TIME_SPAN: {
    startDate: {
      type: "string",
      default: "Start Date",
    },
    endDate: {
      type: "string",
      default: "End Date",
    },
    name: {
      type: "string",
      default: "Name",
    },
    title: {
      type: "string",
      default: "Title",
    },
  },
  EVENT: {
    title: {
      type: "string",
      default: "Event Title",
    },
    date: {
      type: "string",
      default: "Event Date",
    },
    location: {
      type: "string",
      default: "Event Location",
    },
  },
  CONTACT: {
    name: {
      type: "string",
      default: "Contact Name",
    },
    email: {
      type: "string",
      default: "Contact Email",
    },
    phone: {
      type: "string",
      default: "Contact Phone",
    },
    address: {
      type: "string",
      default: "Contact Address",
    },
  },
};

export interface Template {
  id: string; // Unique identifier for the template>
  name: string; // Name of the template
  layout: TemplateLayout; // Layout of the template
  headerBlocks: Item[]; // Blocks in the header
  primaryBlocks: Item[]; // Blocks in the primary section
  secondaryBlocks: Item[]; // Blocks in the secondary section
  config: {
    // Configuration for the Block or Layout Section
    [key: string]: any;
  };
}

export interface Resume {
  id: string; // Unique identifier for the resume
  userId: string; // Unique identifier for the user
  template: Template; // Template used for the resume
  templateData: {
    [key: string]: any; // Data for the template
  };
}

export const configState = {
  DOCUMENT: {
    primaryColor: "#FFFFFF",
    secondaryColor: "#000000",
    padding: 0,
    margin: 0,
    fontType: "Arial",
    fontSize: 12,
    fontColor: "#000000",
    waterMarkLogo: "",
  },
  HEADER: {
    backgroundColor: "#000000",
    padding: 0,
    margin: 0,
  },
  TEXT: {
    fontSize: 12,
    fontFamily: "Arial",
    color: "#000000",
  },
  TIME_SPAN: {
    startDate: "Start Date",
    endDate: "End Date",
    name: "Name",
    title: "Title",
  },
  EVENT: {
    title: "Event Title",
    date: "Event Date",
    location: "Event Location",
  },
  CONTACT: {
    name: "Contact Name",
    email: "Contact Email",
    phone: "Contact Phone",
    address: "Contact Address",
  },
};

export const blockConfigMap: Record<BlockDescriptor, ConfigType> = {
  [BlockDescriptor.Name]: ConfigType.TEXT,
  [BlockDescriptor.ContactInfo]: ConfigType.CONTACT,
  [BlockDescriptor.Education]: ConfigType.TIME_SPAN,
  [BlockDescriptor.Experience]: ConfigType.TIME_SPAN,
  [BlockDescriptor.Skills]: ConfigType.LIST,
  [BlockDescriptor.Description]: ConfigType.TEXT,
  [BlockDescriptor.Certifications]: ConfigType.DETAIL,
  [BlockDescriptor.References]: ConfigType.DETAIL,
  [BlockDescriptor.Title]: ConfigType.TEXT,
  [BlockDescriptor.header]: ConfigType.SECTION,
  [BlockDescriptor.document]: ConfigType.DOCUMENT,
  [BlockDescriptor.primary]: ConfigType.SECTION,
  [BlockDescriptor.secondary]: ConfigType.SECTION,
};

// Define the state for each block
export type BlockState = {
  fontSize: number;
  fontType: string;
  colorScheme: string;
  margin: number;
};

// Define a type for the block configuration
export type BlockConfig = {
  id: string;
  content: BlockDescriptor;
  configType: ConfigType;
  state: BlockState;
};

// Create the map with BlockDescriptor as the key and BlockState as the value
export const blockStateMap: Record<BlockDescriptor, BlockState> = {
  [BlockDescriptor.Name]: {
    fontSize: 14,
    fontType: "Arial",
    colorScheme: "light",
    margin: 1,
  },
  [BlockDescriptor.ContactInfo]: {
    fontSize: 14,
    fontType: "Arial",
    colorScheme: "light",
    margin: 1,
  },
  [BlockDescriptor.Education]: {
    fontSize: 14,
    fontType: "Arial",
    colorScheme: "light",
    margin: 1,
  },
  [BlockDescriptor.Experience]: {
    fontSize: 14,
    fontType: "Arial",
    colorScheme: "light",
    margin: 1,
  },
  [BlockDescriptor.Skills]: {
    fontSize: 14,
    fontType: "Arial",
    colorScheme: "light",
    margin: 1,
  },
  [BlockDescriptor.Description]: {
    fontSize: 14,
    fontType: "Arial",
    colorScheme: "light",
    margin: 1,
  },
  [BlockDescriptor.Certifications]: {
    fontSize: 14,
    fontType: "Arial",
    colorScheme: "light",
    margin: 1,
  },
  [BlockDescriptor.References]: {
    fontSize: 14,
    fontType: "Arial",
    colorScheme: "light",
    margin: 1,
  },
  [BlockDescriptor.Title]: {
    fontSize: 14,
    fontType: "Arial",
    colorScheme: "light",
    margin: 1,
  },
  [BlockDescriptor.header]: {
    fontSize: 16,
    fontType: "Helvetica",
    colorScheme: "light",
    margin: 2,
  },
  [BlockDescriptor.document]: {
    fontSize: 12,
    fontType: "Arial",
    colorScheme: "light",
    margin: 1,
  },
  [BlockDescriptor.primary]: {
    fontSize: 14,
    fontType: "Arial",
    colorScheme: "dark",
    margin: 1,
  },
  [BlockDescriptor.secondary]: {
    fontSize: 14,
    fontType: "Arial",
    colorScheme: "light",
    margin: 1,
  },
};
