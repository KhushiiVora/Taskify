import { useEffect, useState } from "react";

import { StyledBar } from "../../styles/progressBar.styles";

function ProgressBar(props) {
  const { value, total } = props;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (total) setPercent((value / total) * 100);
  }, [value]);

  return (
    <>
      {total ? (
        <StyledBar>
          <div className="progress--bar">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value}
              className="progress--status"
              style={{
                transform: `scaleX(${percent / 100})`,
                transformOrigin: "left",
              }}
            ></div>
          </div>
          <span className="progress--value">
            <b>Progress: {percent}%</b>
          </span>
        </StyledBar>
      ) : (
        <></>
      )}
    </>
  );
}
export default ProgressBar;
