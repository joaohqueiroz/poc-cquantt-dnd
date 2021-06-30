import React from 'react';

import * as S from './styles';

function List({ title, snapshot }) {
  return (
      <S.Container>
          <S.Title>{title}</S.Title>
          <S.Column snapshot={snapshot} />
      </S.Container>
  );
}

export default List;