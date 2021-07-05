import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import uuid from "uuid/v4";
import axios from "axios";

import * as S from "./styles";

function CreateColumnButton({ created }) {
  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState("");
  const [script, setScript] = useState("");

  const switchClicked = () => {
    setClicked(!clicked);
  };

  const createColumn = async () => {

    await axios.post("http://localhost:4000/columns2", {
      id: uuid(),
      name,
      script,
    });

    created(true);
  };

  return (
    <>
      {!clicked ? (
        <S.Container>
          <S.Button onClick={() => switchClicked()}>
            <MdAdd size={24} color="#FFF" />
          </S.Button>
        </S.Container>
      ) : (
        <S.Form>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="script"
            value={script}
            onChange={(e) => setScript(e.target.value)}
          />
          <button
            onClick={() => {
              createColumn();
              switchClicked();
            }}
          >
            Salvar
          </button>
        </S.Form>
      )}
    </>
  );
}

export default CreateColumnButton;
