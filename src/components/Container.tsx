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
  backgroundColor: string;
  children: React.ReactNode;
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
        backgroundColor,
      }}
    >
      {children}
    </div>
  );
}

export default Container;
