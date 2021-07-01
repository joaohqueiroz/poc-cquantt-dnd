import React from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import * as S from "./styles";

function List({ title, snapshot, provided, column }) {
  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      style={{
        background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
        padding: 4,
        width: 250,
        minHeight: 500,
      }}
    >
      {column.items.map((item, index) => {
        return (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    userSelect: "none",
                    padding: 16,
                    margin: "0 0 8px 0",
                    minHeight: "50px",
                    backgroundColor: snapshot.isDragging
                      ? "#263B4A"
                      : "#456C86",
                    color: "white",
                    ...provided.draggableProps.style,
                  }}
                >
                  {item.content}
                </div>
              );
            }}
          </Draggable>
        );
      })}
      {provided.placeholder}
    </div>
  );
}

export default List;
