import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from "uuid/v4";
import * as S from "./styles";

export default function CreateCard({ columnId, created }) {
  const [isCreateCard, setIsCreateCard] = useState(false);
  const [nameCard, setNameCard] = useState("");
  const [contentCard, setContentCard] = useState("");

  function handleCreateCard() {
    setIsCreateCard(!isCreateCard);
  }

  async function submitCreateCard() {
		if(contentCard === "") return;

    const newItens = {
      id: uuid(),
      content: contentCard,
      name: nameCard,
			columns2Id : columnId
    };

    await axios.post(`http://localhost:4000/items`, newItens);
    setIsCreateCard(!isCreateCard)
    created(true)
  }
  return (
    <S.Container>
      <button type="submit" onClick={() => handleCreateCard()}>
        {isCreateCard ? <span>Cancelar</span> : <span>Criar Card</span>}
      </button>

      {isCreateCard ? (
        <S.Form>
          <input
            type="text"
            placeholder="Nome do Card"
            value={nameCard}
            onChange={(e) => setNameCard(e.target.value)}
          />
          <textarea
            placeholder="Descrição do Card"
            value={contentCard}
            onChange={(e) => setContentCard(e.target.value)}
          />
          <button type="submit" onClick={() => submitCreateCard()}>
            Confirmar
          </button>
        </S.Form>
      ) : null}
    </S.Container>
  );
}
