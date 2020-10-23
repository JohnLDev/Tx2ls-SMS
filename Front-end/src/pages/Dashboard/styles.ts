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
  height: 90%;
  width: 90%;

  box-shadow: 1px 1px 50px #d3d3d3;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Dash = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  justify-content: space-between;
  align-items: center;

  padding-top: 20px;
  padding-bottom: 20px;

  width: 80%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const MiniHeader = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f8ff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  height: 40px;
`
export const Block = styled.div`
  display: flex;
  flex-direction: column;

  width: 350px;
  height: 220px;
  margin-left: 20px;
  margin-bottom: 25px;

  border-radius: 20px;

  background: #f8f8ff;
  /* border-radius: 20px; */
  border: 1px solid #d3d3d3;

  a {
    text-decoration: none;
    color: #6495ed;
    height: 100%;
    width: 100%;
  }
  img {
    height: 178px;
    width: 348px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`
