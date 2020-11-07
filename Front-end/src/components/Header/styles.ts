import styled from 'styled-components'

export const Header = styled.header`
  width: 100%;
  height: 10%;
  min-height: 40px;
  border: 1px solid #d3d3d3;

  background: #4682b4;

  display: flex;
  align-items: center;

  color: #fff;

  .logo {
    display: flex;
    align-items: center;

    height: 100%;
    margin-left: 11%;
  }
  img {
    max-width: 10%;
    max-height: 100%;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-child {
      margin-left: 2%;
    }
    &:last-child {
      margin-left: 32%;
    }

    color: #fff;
    background: #4682b4;
    border: 0;
    &:hover {
      color: #d3d3d3;
    }
    margin-right: 10px;

    .icon {
      margin-right: 10px;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 7%;
    margin-right: 10px;

    text-decoration: none;
    color: #fff;
    &:hover {
      color: #d3d3d3;
    }

    .icon {
      margin-right: 10px;
    }
  }
`
