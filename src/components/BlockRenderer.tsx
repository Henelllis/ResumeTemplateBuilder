import React from "react";
import { BlockDescriptor } from "../types";

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

const SkillsBlock: React.FC = () => (
  <div
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
    }}
  >
    <p>Skills</p>
    <ul>
      <li>Leisure</li>
      <li>Salsa</li>
      <li>HTML</li>
    </ul>
  </div>
);

const EducationBlock: React.FC<{ default: boolean }> = ({
  default: defaultProp,
}) => {
  let education = [
    {
      title: "BS:Computer Science",
      establishment: "MIT",
      startDate: "2014",
      endDate: "2018",
      location: "Boston, MA",
      description: "",
    },
    {
      title: "AS:Liberat Arts",
      establishment: "Community College",
      startDate: "2012",
      endDate: "2014",
      location: "Anywhere, CA",
      description: "",
    },
  ];

  if (defaultProp) {
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: "40px",
      }}
    >
      <h2>Education</h2>
      {education.map((education) => (
        <div style={{ width: "90%", marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 0,
            }}
          >
            <h3 style={{ margin: 0 }}>{education.establishment}</h3>
            <p style={{ margin: 0 }}>
              {education.startDate} - {education.endDate}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 0,
            }}
          >
            <p style={{ margin: 0 }}>{education.title}</p>
            <p style={{ margin: 0 }}>{education.location}</p>
          </div>

          {education.description && (
            <p style={{ fontSize: ".9em" }}>{education.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

const ExperienceBlock: React.FC<{ default: boolean }> = ({
  default: defaultProp,
}) => {
  let experiences = [
    {
      title: "Software Engineer",
      establishment: "Google",
      startDate: "2019",
      endDate: "2021",
      description: "Worked on Google Search",
      location: "Mountain View, CA",
    },
    {
      title: "Software Engineer",
      establishment: "Facebook",
      startDate: "2017",
      endDate: "2019",
      description: "Worked on Facebook Ads",
      location: "Menlo Park, CA",
    },
  ];

  if (defaultProp) {
    // TODO : USE DIRECT STYLES FROM CONTEXT
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: "40px",
      }}
    >
      <h2>Experiences</h2>
      {experiences.map((experience) => (
        <div style={{ width: "90%" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 0,
            }}
          >
            <h3 style={{ margin: 0 }}>{experience.establishment}</h3>
            <p style={{ margin: 0 }}>
              {experience.startDate} - {experience.endDate}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 0,
            }}
          >
            <p style={{ margin: 0 }}>{experience.title}</p>
            <p style={{ margin: 0 }}>{experience.location}</p>
          </div>

          <p style={{ fontSize: ".9em" }}>*{experience.description}</p>
        </div>
      ))}
    </div>
  );
};
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
        return <EducationBlock default={true} />;
      case BlockDescriptor.Skills:
        return <SkillsBlock />;
      case BlockDescriptor.Experience:
        return <ExperienceBlock default={true} />;
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
