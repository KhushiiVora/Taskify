import styled from "styled-components";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .profile_container {
    width: 40%;
  }

  .profile_page {
    margin-top: 3.2rem;
  }

  .profile_container thead,
  .profile_container tbody {
    width: 100%;
  }

  .profile_container th {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.iconColor};
  }

  .profile_container tr {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0.5rem;
  }

  .profile_container--avatar {
    position: relative;
  }

  .avatar--img {
    border: 1px solid ${(props) => props.theme.borderColor};
  }
  .avatar--icon {
    background-color: ${(props) => props.theme.bgColor1};
    box-shadow: 0px 0px 5px 3px ${(props) => props.theme.bgColor2} inset;
    border-radius: 50%;
    position: absolute;
    bottom: 1rem;
    right: 0;
  }

  .profile_container__data {
    width: 100%;
    padding: 0.5rem;
  }

  .profile_container__data div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .profile_container__data--title {
    font-weight: bold;
  }

  .profile_container__chips--chip {
    width: fit-content;
    font-size: 1rem;
    flex-grow: 1;
    background: none;
    color: ${(props) => props.theme.iconColor};
    border: 1px solid ${(props) => props.theme.iconColor};
  }

  .profile_container__data .profile_container__chips {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.3rem;
  }

  .profile_container__chips--chip:hover {
    background-color: ${(props) => props.theme.bgColor1};
  }

  .profile_container--icons {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: ${(props) => props.theme.iconColor};
  }
  .icon_edit {
    color: ${(props) => props.theme.color3};
  }
  .icon_save {
    color: ${(props) => props.theme.successColorDark};
  }

  .divider {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
`;

export { StyledSection };
