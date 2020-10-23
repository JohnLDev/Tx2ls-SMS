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
export const InventoryContainer = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
  .storage {
  }
`
export const Storage = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;
  h2 {
    color: #4169e1;

    margin-bottom: 20px;
    margin-top: 10%;
    text-align: center;
  }
  .lastsell {
    h2 {
      color: #4169e1;

      margin-bottom: 20px;
      margin-top: 10%;
      text-align: center;
    }
    background: #f8f8ff;
    height: 70%;
    max-height: 70%;
    width: 90%;

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
        display: flex;
        justify-content: center;
        align-items: center;

        border: 0;
        background: 0;

        height: 100%;
      }
      td {
        width: 25%;
        text-align: center;
        border: 1px solid #d3d3d3;
      }
    }
  }
`

export const AddStorage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50%;
  height: 100%;
  .lastsell {
    h2 {
      color: #4169e1;

      margin-bottom: 20px;
      margin-top: 10%;
      text-align: center;
    }
    background: #f8f8ff;
    height: 50%;
    max-height: 50%;
    width: 70%;
    margin-top: 5%;

    border: 1px solid #d3d3d3;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h2 {
    color: #4169e1;

    margin-bottom: 20px;
    margin-top: 10%;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 20px;
  }
`

export const SellButton = styled.button`
  width: 30%;
  height: 8.61%;
  margin-top: 15px;
  margin-bottom: 15px;
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
