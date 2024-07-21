import React, { useContext } from "react";
import { DroppableProvidedProps } from "react-beautiful-dnd";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";

function Container({
  widthInPixels,
  heightInPixels,
  backgroundColor,
  children,
  droppableInnerRef,
  section,
  droppableProps,
}: {
  widthInPixels: number;
  heightInPixels: number;
  children: React.ReactNode;
  section?: "header" | "primary" | "secondary";
  backgroundColor?: string;
  droppableProps?: DroppableProvidedProps;
  droppableInnerRef?: (element: HTMLElement | null) => void;
}) {
  const { selectedSection, setSelection } = useContext(TemplateBuilderContext);
  return (
    <div
      {...droppableProps}
      ref={droppableInnerRef}
      onClick={() => {
        if (!section) return;
        selectedSection === section
          ? setSelection({ section: null })
          : setSelection({ section });
      }}
      style={{
        width: `${widthInPixels}px`,
        height: `${heightInPixels}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor || "transparent",
        borderBottom: "1px solid black",
      }}
    >
      {children}
    </div>
  );
}

export default Container;
