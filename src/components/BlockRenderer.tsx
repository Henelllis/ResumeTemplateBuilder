import React from "react";

export enum BlockDescriptor {
  Name = "Name",
  ContactInfo = "ContactInfo",
  Education = "Education",
  Skills = "Skills",
  Experience = "Experience",
  Description = "Description",
  Certifications = "Certifications",
  References = "References",
  Title = "Title",
}

interface BlockProps {
  content: BlockDescriptor;
  isHeader: boolean;
}

const NameBlock: React.FC = () => <p>John Doe</p>;
const ContactInfoBlock: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "red",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      fontSize: "0.7em",
    }}
  >
    <p>john.doe@example.com</p>
    <p> (123) 456-7890</p>
    <p> AnyWhere, AnyTown</p>
  </div>
);
const ContactInfoHeaderBlock: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      backgroundColor: "red",
      width: "100%",
      justifyContent: "center",
      gap: "10px",
      fontSize: "0.7em",
    }}
  >
    <p>john.doe@example.com</p>
    <p> (123) 456-7890</p>
    <p> AnyWhere, AnyTown</p>
  </div>
);

const EducationBlock: React.FC = () => (
  <div
    style={{
      height: "100%",
      width: "100%",

      background: "green",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    Education Block
  </div>
);
const SkillsBlock: React.FC = () => (
  <div
    style={{
      height: "100%",
      width: "100%",
      background: "blue",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <p>Skill</p>
    <ul>
      <li>Skill 1</li>
      <li>Skill 2</li>
      <li>Skill 3</li>
    </ul>
  </div>
);
const ExperienceBlock: React.FC = () => (
  <div
    style={{
      height: "100%",
      width: "100%",
      background: "yellow",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    Experience Block
  </div>
);
const DescriptionBlock: React.FC = () => <div>Description Block</div>;
const CertificationsBlock: React.FC = () => <div>Certifications Block</div>;
const ReferencesBlock: React.FC = () => <div>References Block</div>;
const TitleBlock: React.FC = () => <div>Title Block</div>;

const BlockRenderer: React.FC<BlockProps> = ({ isHeader, content }) => {
  if (isHeader) {
    switch (content) {
      case BlockDescriptor.Name:
        return <NameBlock />;
      case BlockDescriptor.ContactInfo:
        return <ContactInfoHeaderBlock />;
      case BlockDescriptor.Description:
        return <DescriptionBlock />;
      case BlockDescriptor.Title:
        return <TitleBlock />;
      default:
        return null;
    }
  } else {
    switch (content) {
      case BlockDescriptor.ContactInfo:
        return <ContactInfoBlock />;
      case BlockDescriptor.Education:
        return <EducationBlock />;
      case BlockDescriptor.Skills:
        return <SkillsBlock />;
      case BlockDescriptor.Experience:
        return <ExperienceBlock />;
      case BlockDescriptor.Description:
        return <DescriptionBlock />;
      case BlockDescriptor.Certifications:
        return <CertificationsBlock />;
      case BlockDescriptor.References:
        return <ReferencesBlock />;
      default:
        return null;
    }
  }
};

export default BlockRenderer;
