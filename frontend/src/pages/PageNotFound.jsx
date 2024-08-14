import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";

import page404 from "/img/page404.svg";
import { StyledSection } from "../styles/pageNotFound.styles";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <StyledSection>
      <div className="image_conatiner">
        <img src={page404} />
      </div>
      <div className="content_container">
        <h1>OPPS! PAGE NOT FOUND</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <div>
          <Button
            type="button"
            text="Home"
            onClick={() => {
              navigate(`/`);
            }}
            className="filled_button pink"
          />
        </div>
      </div>
    </StyledSection>
  );
};

export default PageNotFound;
