import styled from 'styled-components'

export const Border = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  width: 100vw;
  height: 100vh;
  position: relative;

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
  color: #4169e1;
  .switch1 {
    position: absolute;
    top: 90px;
    left: 260px;
  }
  .switch2 {
    position: absolute;
    top: 100px;
    right: 260px;
  }
`
export const SalesContainer = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
  #barcode {
    width: 50%;
    height: 100%;

    display: flex;
    flex-direction: column;

    align-items: center;
    h2 {
      margin-bottom: 20px;
      margin-top: 15%;
    }
    .lastsell {
      background: #f8f8ff;
      height: 60%;
      width: 70%;
      margin-bottom: 30px;
      border: 1px solid #d3d3d3;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      h3 {
        text-align: center;
        width: 100%;
      }
      .table {
        max-width: 100%;
        margin: 10px;
        border: 1px solid #d3d3d3;
        color: #000;
        width: 95%;

        td {
          width: 25%;
          text-align: center;
          border: 1px solid #d3d3d3;
        }
      }
    }
    .inputs {
      width: 70%;

      height: 20%;
      display: flex;

      justify-content: center;
      align-items: center;
    }
    .inputs .input-block {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  #list {
    width: 50%;
    height: 100%;

    display: flex;
    flex-direction: column;

    align-items: center;
    h2 {
      margin-bottom: 20px;
      margin-top: 15%;
    }
    input {
      margin-left: 10%;
    }
    .label {
      margin-top: 17%;
    }
    .lastsell {
      background: #f8f8ff;
      height: 60%;
      max-height: 239px;
      width: 70%;
      margin-bottom: 30px;
      margin-top: 5%;
      border: 1px solid #d3d3d3;
      border-radius: 20px;
      display: flex;
      flex-direction: column;

      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      h3 {
        text-align: center;
        width: 100%;
      }
      .table {
        max-width: 100%;
        margin: 10px;
        border: 1px solid #d3d3d3;
        color: #000;

        td {
          width: 25%;
          text-align: center;
          border: 1px solid #d3d3d3;
        }
      }
    }

    .inputs {
      width: 70%;

      height: 20%;
      display: flex;

      justify-content: center;
      align-items: flex-end;
    }
    .inputs .input-block {
      display: flex;
      flex-direction: column;
      justify-content: center;

      width: 100%;
      height: 100%;
    }
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

export const InputMenor = styled.input`
  height: 45px;
  width: 20%;

  background: #fff;
  border: 1px solid #d3e2e5;
  border-radius: 20px;
  outline: none;
  color: #5c8599;

  margin-top: 5px;
  margin-bottom: 5px;
  @media (max-width: 600px) {
    height: 35px;
    width: 60%;
  }
`

export const SellButton = styled.button`
  width: 30%;
  height: 10%;
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

export const SellButtonRight = styled.button`
  width: 320px;
  height: 40px;

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
