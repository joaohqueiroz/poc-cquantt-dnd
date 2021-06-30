import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;

    padding: 0 15px;
`;

export const Button = styled.button`
    width: 220px;
    height: 42px;
    margin-top: 27px;
    background-color: lightgray;

    color: gray;
    cursor: pointer;
    outline: 0;
    border: 0;
`;

export const Form = styled.div`
    margin-top: 27px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
    width: 220px;
    max-height: 200px;
    background-color: lightgray;

    color: black;
    cursor: pointer;
    outline: 0;
    border: 0;
`;