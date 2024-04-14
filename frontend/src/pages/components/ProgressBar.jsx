import { useEffect, useState } from "react";

import { StyledBar } from "../../styles/progressBar.styles";

function ProgressBar(props) {
  const { value, total } = props;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (total) setPercent((value / total) * 100);
  }, [value]);

  return (
    <StyledBar>
      <span
        className="progress--value"
        style={{ color: percent > 49 ? "white" : "black" }}
      >
        {/* {Math.min(MAX, Math.max(MIN, percent))}% */}
        <b>{percent}%</b>
      </span>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="progress--bar"
        style={{
          transform: `scaleX(${percent / 100})`,
          transformOrigin: "left",
        }}
      ></div>
    </StyledBar>
  );
}
export default ProgressBar;
