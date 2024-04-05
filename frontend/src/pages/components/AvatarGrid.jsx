import { useEffect, useState } from "react";

import { StyledDiv } from "../../styles/avatarGrid.styles";

function AvatarGrid() {
  const { isGirl } = props;
  const [avatarLinks, setAvatarLinks] = useState([]);

  const [page, setPage] = useState(1);
  const totalPages = 4;

  const fetchAvatars = async () => {
    let response = [];
    const avatarsCountPerPage = 6;

    if (isGirl) {
      response = new Array(6).map((_, index) => {
        return `https://avatar.iran.liara.run/public/${
          (page - 1) * avatarsCountPerPage + (index + 1) + 50
        }`;
      });
    } else {
      response = new Array(6).map((_, index) => {
        return `https://avatar.iran.liara.run/public/${
          (page - 1) * avatarsCountPerPage + (index + 1) + 0
        }`;
      });
    }
    setAvatarLinks(response);
  };

  useEffect(() => {
    fetchAvatars();
  }, [page]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== page) {
      setPage(pageNumber);
    }
  };
  return (
    <StyledDiv>
      {avatarLinks.length && (
        <div className="avatars_container">
          {avatarLinks.map((product) => {
            return (
              <div key={product.id} className="avatars_container__avatar">
                <img src={product.thumbnail} alt={product.title} />
                <h4>{product.title}</h4>
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
                ◀️
              </span>
              {[...Array(totalPages)].map((_, index) => {
                return (
                  <span
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
                className={`pagination--right ${page === 10 ? "disabled" : ""}`}
                onClick={() => handlePageChange(page + 1)}
              >
                ▶️
              </span>
            </>
          }
        </div>
      )}
    </StyledDiv>
  );
}

export default AvatarGrid;
