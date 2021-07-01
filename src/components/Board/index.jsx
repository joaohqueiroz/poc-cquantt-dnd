import React, { useState, useEffect } from "react";
import CreateColumnButton from "./components/CreateColumnButton";
import List from "../../components/List";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import * as S from "./styles";

function Board() {
  const [columns, setColumns] = useState([]);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/columns").then((res) => {
      setColumns(res.data);
    });
  }, []);

  useEffect(() => {
    if (created)
      axios.get("http://localhost:4000/columns").then((res) => {
        setColumns(res.data);
      });

    setCreated(false);
  }, [created]);

  useEffect(() => console.log(columns), [columns]);

  const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      console.log(destination);
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <S.Container>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <List
                        provided={provided}
                        snapshot={snapshot}
                        key={columnId}
                        title={column.name}
                        script={column.script}
                        column={column}
                      />
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
        <CreateColumnButton created={setCreated} />
      </DragDropContext>
    </S.Container>
  );
}

export default Board;
