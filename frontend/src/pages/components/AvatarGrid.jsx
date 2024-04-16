import { useEffect, useState } from "react";
import {
  AVATAR_URL,
  TOTAL_PAGES,
  AVATARS_COUNT_PER_PAGE,
} from "../../utils/constants";

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { StyledDiv } from "../../styles/avatarGrid.styles";

function AvatarGrid(props) {
  const { isGirl, selectedImage, setSelectedImage } = props;
  const [avatarLinks, setAvatarLinks] = useState([]);

  const [page, setPage] = useState(1);

  const fetchAvatars = async () => {
    let response = [];

    if (isGirl) {
      response = [...new Array(AVATARS_COUNT_PER_PAGE)].map((_, index) => {
        return (
          AVATAR_URL +
          `${(page - 1) * AVATARS_COUNT_PER_PAGE + (index + 1) + 75}`
        );
      });
    } else {
      response = [...new Array(AVATARS_COUNT_PER_PAGE)].map((_, index) => {
        return (
          AVATAR_URL +
          `${(page - 1) * AVATARS_COUNT_PER_PAGE + (index + 1) + 0}`
        );
      });
    }
    setAvatarLinks(response);
  };

  useEffect(() => {
    fetchAvatars();
  }, [page, isGirl]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= TOTAL_PAGES && pageNumber !== page) {
      setPage(pageNumber);
    }
  };
  return (
    <StyledDiv>
      {avatarLinks.length && (
        <div className="avatars_container">
          {avatarLinks.map((link, index) => {
            return (
              <div
                key={`${link}-${index}`}
                className={`avatars_container__avatar ${
                  link === selectedImage ? "avatar--selected" : ""
                }`}
              >
                <img
                  src={link}
                  alt="avatar image"
                  onClick={() => setSelectedImage(link)}
                />
                {/* <h4>{link.title}</h4> */}
              </div>
            );
          })}
        </div>
      )}
      {avatarLinks.length && (
        <div className="pagination">
          {
            <>
              <span
                className={`pagination--left ${page === 1 ? "disabled" : ""}`}
                onClick={() => handlePageChange(page - 1)}
              >
                <FaChevronLeft />
              </span>
              {[...Array(TOTAL_PAGES)].map((_, index) => {
                return (
                  <span
                    key={`${index}`}
                    className={`pagination--page_number ${
                      page === index + 1 ? "selected" : ""
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </span>
                );
              })}
              <span
                className={`pagination--right ${
                  page === TOTAL_PAGES ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(page + 1)}
              >
                <FaChevronRight />
              </span>
            </>
          }
        </div>
      )}
    </StyledDiv>
  );
}

export default AvatarGrid;
