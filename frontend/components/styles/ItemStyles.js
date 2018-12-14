import styled from 'styled-components';

const Item = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 275px;
    object-fit: cover;
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-family: 'radnika_next';
      font-size: 1rem;
      padding: 1rem;
    }
  }
  .signedOutButtonList {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-family: 'radnika_next';
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export default Item;
