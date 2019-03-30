import styled from "styled-components";

export const StyledBox = styled.div`
  height: ${props => props.height + "px"};
  width: ${props => props.width + "px"};
  background-color: ${props => props.bgColor};
  border: 1px solid #b69233;
  box-sizing: border-box;
`;
