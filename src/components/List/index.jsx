import React from "react";
import { Draggable } from "react-beautiful-dnd";
import axios from "axios";
//import * as S from "./styles";

function List({ snapshot, provided, column, created }) {

  async function submitRemove(cardId) {
    await axios.delete(`http://localhost:4000/items/${cardId}`);
    created(true);
  }

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
                  <div>
                    <button type="submit" onClick={() => submitRemove(item.id) }>Remover</button>
                  </div>
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
