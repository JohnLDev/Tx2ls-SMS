import styled from 'styled-components'

export const Border = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  width: 100vw;
  height: 100vh;

  background: linear-gradient(to bottom right, #fff, #fff, #00bfff, #1e90ff);
`
export const Page = styled.div`
  height: 85%;
  width: 90%;

  box-shadow: 1px 1px 50px #d3d3d3;

  display: flex;
  flex-direction: row;
  align-items: center;

  .login {
    height: 100%;
    width: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background: linear-gradient(to bottom, #00bfff, #1e90ff);
    position: relative;
    a {
      color: #363636;
      transition: color 0.2s;
      position: absolute;
      left: 0;
      top: 0;

      margin: 20px;
      &:hover {
        color: #000000;
      }
    }
    .input-block {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      width: 80%;
      .input {
        width: 55%;
      }
    }
  }
  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;

    background: #fff;
    img {
      max-width: 100%;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #fff, #fff, #00bfff, #1e90ff);
    .login {
      width: 80%;
    }
    .image-container {
      width: 80%;
    }
  }
`
export const Title = styled.h1`
  font-weight: 900;
  font-size: 28px;
  color: #fff;
  line-height: 28px;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    font-size: 18px;
  }
`

export const Input = styled.input`
  height: 45px;
  width: 50%;

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
export const Label = styled.label`
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  padding-bottom: 10px;
  color: #363636;
`

export const Button = styled.button`
  height: 45px;
  width: 50%;

  border: 0;
  border-radius: 20px;
  background: #3cb371;
  color: #fff;
  font-weight: 900;
  transition: background-color 0.2s;
  margin-top: 10px;
  @media (max-width: 600px) {
    font-size: 18px;
    font-weight: 600;

    height: 35px;
    width: 60%;
  }

  &:hover {
    background: #2e8b57;
  }
`
