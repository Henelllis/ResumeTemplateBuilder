import React from "react";
import { DroppableProvidedProps } from "react-beautiful-dnd";

function Container({
  widthInPixels,
  heightInPixels,
  backgroundColor,
  children,
  droppableInnerRef,
  droppableProps,
}: {
  widthInPixels: number;
  heightInPixels: number;
  children: React.ReactNode;
  backgroundColor?: string;
  droppableProps?: DroppableProvidedProps;
  droppableInnerRef?: (element: HTMLElement | null) => void;
}) {
  return (
    <div
      {...droppableProps}
      ref={droppableInnerRef}
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
