import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .link-style {
    text-decoration: none;
    color: inherit;
    padding: 16px;
  }
`;

export const Content = styled.div`
  width: 80%;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;

  strong {
    font-size: 24px;
    text-align: center;
    width: 100%;
    margin-bottom: 16px;
  }

  a {
    color: ${({theme}) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${({theme}) => theme.colors.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in;

    &:hover {
      background: ${({theme}) => theme.colors.primary.main};
      color: #fff;
    }
  }
`;

export const ListContainer = styled.div`
  margin-top: 24px;

  header{
    margin-bottom: 8px;

    button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;

      span {
      margin-right: 8px;
      font-weight: bold;
      color: ${({theme}) => theme.colors.primary.main};
      ;
      }
    }
  }
`;

export const Card = styled.div`
  background: #fff;
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }

  .info {
    .classroom-name {
      display: flex;
      align-items: center;

      small {
        background: ${({theme}) => theme.colors.primary.lighter};
        color: ${({theme}) => theme.colors.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        padding: 4px;
        border-radius: 4px;
        margin-left: 8px;
      }
    }

    span{
      display: block;
      font-size: 14px;
      color: ${({theme}) => theme.colors.gray[200]};
    }
  }

  .actions {
      display: flex;
      align-items: center;

      button {
        background: transparent;
        border: none;
        margin-left: 8px;
      }
    }
`

export const LinkNew = styled.a`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-decoration: none;
  border: none;
  background: ${({ theme }) => theme.colors.primary.green};
  font-size: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  transition: background 0.2s ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.greenlighter};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.green};
  }

  &[disabled] {
    background: #ccc;
    cursor: default;
  }
`

export const ButtonContainer = styled.div`
  margin-top: 24px;
  width: 100%;
  height: 52px;
`;