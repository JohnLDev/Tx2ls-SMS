import styled from 'styled-components'

export const Border = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  background: linear-gradient(to bottom right, #fff, #fff, #00bfff, #1e90ff);
`
export const Page = styled.div`
  height: 90%;
  width: 90%;

  box-shadow: 1px 1px 50px #d3d3d3;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`
export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`
export const HisyoryDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
  h2 {
    color: #4169e1;

    margin-bottom: 20px;
    margin-top: 5px;
    text-align: center;
  }
  .history {
    h2 {
      color: #4169e1;

      margin-bottom: 20px;
      margin-top: 10%;
      text-align: center;
    }
    background: #f8f8ff;
    height: 80%;
    max-height: 80%;
    width: 60%;

    border: 1px solid #d3d3d3;
    border-radius: 20px;
    display: flex;
    flex-direction: column;

    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .table {
      max-width: 100%;
      margin: 10px;
      border: 1px solid #d3d3d3;
      button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        border: 0;
        background: 0;
        height: 100%;
      }

      td {
        width: 15%;
        text-align: center;
        border: 1px solid #d3d3d3;
      }
    }
  }
`

export const FindHistory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30%;

  margin-left: 10px;
  margin-right: 10px;

  width: 100%;

  h2 {
    margin-top: 1%;
    color: #4169e1;

    margin-bottom: 20px;
  }
  .inputs {
    display: flex;
    align-items: center;
  }

  .inputs .input-block {
    width: 60%;
    color: #4169e1;
  }
`

export const Input = styled.input`
  height: 45px;
  width: 90%;

  background: #fff;
  border: 1px solid #d3e2e5;
  border-radius: 20px;
  outline: none;
  color: #5c8599;

  margin-top: 5px;
  margin-bottom: 5px;
  &:first-child {
    margin-right: 10px;
  }

  @media (max-width: 600px) {
    height: 35px;
    width: 60%;
  }
`

export const SellButton = styled.button`
  width: 35%;
  height: 40%;
  margin-top: 15px;
  margin-bottom: 5px;
  border-radius: 20px;
  border: 0;
  background: #3cb371;
  color: #fff;
  font-weight: 900;
  transition: background-color 0.2s;

  &:hover {
    background: #2e8b57;
  }
`
