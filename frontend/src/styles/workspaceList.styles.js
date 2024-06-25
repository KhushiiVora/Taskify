import styled from "styled-components";

const InnerStyledSection = styled.section`
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow-y: scroll;
  padding-top: 1rem;

  .divider {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
  .list_item {
    padding: 0.2rem;
    margin: 0 0.2rem 0 0;
    /* border-bottom: 1px solid ${(props) => props.theme.borderColor}; */
    border-radius: 0.5rem;
  }
  .selected {
    background-color: ${(props) => props.theme.bgColor2};
  }
`;

const OuterStyledSection = styled.section`
  width: 20%;
  height: 100%;
  box-shadow: 0px 0px 8px 2px ${(props) => props.theme.bgColor1};
  border-radius: 1rem;

  .workspace_list__header {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }
`;

export { InnerStyledSection, OuterStyledSection };
