import React, { useState, useEffect } from "react";
import CreateColumnButton from "./components/CreateColumnButton";
import CreateCard from "./components/CreateCard";
import List from "../../components/List";
import axios from "axios";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import * as S from "./styles";

function Board() {
  const [columns, setColumns] = useState([]);
  const [created, setCreated] = useState(false);

  useEffect(() => {

    axios.get("http://localhost:4000/columns2?_embed=items").then((res) => {
      let newCol = {};

      res.data.forEach((column) => {
        newCol[column.id] = {
          ...column,
        };
      });

      setColumns(newCol);
    });
  }, []);

  useEffect(() => {
    if (created)
      axios.get("http://localhost:4000/columns2?_embed=items").then((res) => {
        let newCol = {};

        res.data.forEach((column) => {
          newCol[column.id] = {
            ...column,
          };
        });

        setColumns(newCol);
      });

    setCreated(false);
  }, [created]);

  useEffect(() => console.log(columns), [columns]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    let newColumns = {};

    if (source.droppableId !== destination.droppableId) {

      const sourceColumn = columns[source.droppableId];
      const item = sourceColumn.items[source.index];

      axios.put(`http://localhost:4000/items/${item.id}`, {
        ...item,
        columns2Id: destination.droppableId,
      });

      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      newColumns = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };

      setColumns(newColumns);
      runColumnScript(item, destination.droppableId)
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      newColumns = {
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      };
      setColumns(newColumns);
    }

  };

  const runColumnScript = async (item, columnId) => {
    const { data } = await axios.get(`http://localhost:4000/columns2/${columnId}`);
    const columnScript = data.script.split('(');

    if(columnScript[1].substring(0, 4) === "name")
      eval(`${columnScript[0]}('${item.name}')`)
  }

  const deleteColumn = async (columnId) => {
    const { data } = await axios.get(`http://localhost:4000/columns2/${columnId}?_embed=items`);
    data.items.forEach(item => axios.delete(`http://localhost:4000/items/${item.id}`));
    await axios.delete(`http://localhost:4000/columns2/${columnId}`);

    setCreated(true);
  }

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
              <button onClick={() => deleteColumn(columnId)}>Remover</button>
              <CreateCard created={setCreated} columnId={columnId} column={column} />

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
                        created={setCreated}
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
