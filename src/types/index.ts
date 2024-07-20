export // Define an interface for the item type
interface Item {
  id: string;
  content: BlockDescriptor;
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
  "ContactInfo" = "Contact Info",
  "Title" = "Title",
  "Name" = "Name",
  "Education" = "Education",
  "Skills" = "Skills",
  "Experience" = "Experience",
  "Description" = "Description",
  "Certifications" = "Certifications",
  "References" = "References",
}
