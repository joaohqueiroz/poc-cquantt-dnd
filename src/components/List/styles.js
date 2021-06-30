import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    padding: 0 15px;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
    width: 220px;
    height: 100%;
    background-color: ${props => props.snapshot.isDragginOver ? "lightblue" : "lightgray"};

    color: black;
    outline: 0;
    border: 0;
`;

export const Title = styled.span`
    display: flex;
    align-content: center;
    justify-content: center;

    height: 15px;
    margin-bottom: 12px;
    font-size: large;
`;