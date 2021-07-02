import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    padding: 0 15px;
`;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    padding: 15px;

    input, textarea {
        margin-bottom: 10px;
    }
`;