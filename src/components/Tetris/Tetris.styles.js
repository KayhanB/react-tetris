import styled from "styled-components";

export const StyledMap = styled.div`
  background-color: #2d323a;
  height: ${props => props.height + "px"};
  width: ${props => props.width + "px"};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
