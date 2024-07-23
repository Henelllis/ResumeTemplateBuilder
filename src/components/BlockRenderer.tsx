import React, { useContext } from "react";
import { BlockDescriptor } from "../types";
import { ResumeFillingContext } from "../store/ResumeFillingContext";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import { BlockContext } from "../store/blockContext";

interface BlockProps {
  content: BlockDescriptor;
  isHeader: boolean;
}

const NameBlock: React.FC = () => {
  const { templateData } = useContext(ResumeFillingContext);

  let name = "John Doe";

  if (templateData && templateData[BlockDescriptor.Name]) {
    name = templateData[BlockDescriptor.Name];
  }

  return <h2>{name}</h2>;
};
const ContactInfoBlock: React.FC = () => {
  const { templateData } = useContext(ResumeFillingContext);
  const { selectedSection } = useContext(TemplateBuilderContext);
  const { blocks } = useContext(BlockContext);
  let email = "john.doe@example.com";
  let phone = "(123) 456-7890";
  let address = "AnyWhere, AnyTown";

  if (templateData && templateData[BlockDescriptor.ContactInfo]) {
    console.log(
      "templateData[BlockDescriptor.ContactInfo]",
      templateData[BlockDescriptor.ContactInfo]
    );
    email = templateData[BlockDescriptor.ContactInfo].email;
    phone = templateData[BlockDescriptor.ContactInfo].phone;
    address = templateData[BlockDescriptor.ContactInfo].address;
  }

  const { headerBlockList } = blocks;

  console.log("headerBlockList", headerBlockList);

  //determine if there is a Contact Info block in the header
  const hasContactInfoInHeader = headerBlockList.some(
    (block) => block.content === BlockDescriptor.ContactInfo
  );

  console.log("hasContactInfoInHeader", hasContactInfoInHeader);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: hasContactInfoInHeader ? "row" : "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        fontSize: "0.7em",
      }}
    >
      <p>{email}</p>
      <p> {phone}</p>
      <p> {address}</p>
    </div>
  );
};

const SkillsBlock: React.FC = () => {
  const { templateData } = useContext(ResumeFillingContext);

  let skills: Array<string> = [];
  if (templateData && templateData[BlockDescriptor.Skills]) {
    skills = templateData[BlockDescriptor.Skills];
  } else {
    skills = ["Leisure", "Salsa", "HTML"];
  }

  return (
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
      <h3>Skills</h3>
      <ul>
        {skills.map((skill) => (
          <li>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

const EducationBlock: React.FC<{ default: boolean }> = ({
  default: defaultProp,
}) => {
  const { templateData } = useContext(ResumeFillingContext);

  let education = [];
  if (templateData && templateData[BlockDescriptor.Education]) {
    education = templateData[BlockDescriptor.Education];
  } else {
    education = [
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
  }

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
      <h2>Education</h2>
      {education.map((experience: any) => (
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
        </div>
      ))}
    </div>
  );
};

const ExperienceBlock: React.FC<{ default: boolean }> = ({
  default: defaultProp,
}) => {
  const { templateData } = useContext(ResumeFillingContext);

  let experiences = [];
  if (templateData && templateData[BlockDescriptor.Experience]) {
    experiences = templateData[BlockDescriptor.Experience];
  } else {
    experiences = [
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
  }

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
      {experiences.map((experience: any) => (
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
const DescriptionBlock: React.FC = () => {
  const { templateData } = useContext(ResumeFillingContext);

  let description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque blanditiis soluta qui, aspernatur culpa veniam nobis cum enim pariatur quod. Excepturi cupiditate quidem ipsa et minima eum officia maiores voluptates!";

  if (templateData && templateData[BlockDescriptor.Description]) {
    description = templateData[BlockDescriptor.Description];
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: "40px",
      }}
    >
      <h2>Mission Statement</h2>
      <p>{description}</p>
    </div>
  );
};
const CertificationsBlock: React.FC = () => <div>Certifications Block</div>;
const ReferencesBlock: React.FC = () => <div>References Block</div>;
const TitleBlock: React.FC = () => <div>Title Block</div>;

const BlockRenderer: React.FC<BlockProps> = ({ isHeader, content }) => {
  switch (content) {
    case BlockDescriptor.Name:
      return <NameBlock />;
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
};

export default BlockRenderer;
