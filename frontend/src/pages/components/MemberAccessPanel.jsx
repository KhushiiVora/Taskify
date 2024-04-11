import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axiosConfig";
import { refreshPage } from "../../utils/refreshPage";

import { membersRestored } from "../../state/memberSlice";

import MemberAccessCard from "./MemberAccessCard";

import { StyledSection } from "../../styles/memberAccessPanel.styles";
import PublicProfile from "./PublicProfile";

function MemberAccessPanel(props) {
  const { workspaceId, setOpenMemberAccessPanel } = props;
  const [publicProfile, setPublicProfile] = useState(null);
  const { leaders, members } = useSelector((state) => state.members);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    if (event.target.tagName === "SECTION") setOpenMemberAccessPanel(false);
  };

  const handleRemove = async (memberId) => {
    // console.log(member);
    await axios
      .patch(
        `/dashboard/members/${workspaceId}/member/remove`,
        { memberId },
        { withCredentials: true }
      )
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        dispatch(membersRestored(data));
      })
      .catch((error) => {
        refreshPage(error.response.status);
        console.log(error);
      });
  };

  const handleLeaderChange = async (memberId) => {
    // leaders.includes(memberId);
    await axios
      .patch(
        `/dashboard/members/${workspaceId}/edit/leader`,
        { memberId, userId: user._id },
        { withCredentials: true }
      )
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        dispatch(membersRestored(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <StyledSection onClick={(event) => handleClick(event)}>
      <div className="panel">
        {publicProfile ? (
          <PublicProfile
            member={publicProfile}
            setPublicProfile={setPublicProfile}
          />
        ) : (
          <>
            <h2>Members</h2>
            {members.map((member) => {
              return (
                <MemberAccessCard
                  key={member._id}
                  handleRemove={handleRemove}
                  handleLeaderChange={handleLeaderChange}
                  member={member}
                  isLeader={leaders.includes(member._id)}
                  setPublicProfile={setPublicProfile}
                />
              );
            })}
          </>
        )}
      </div>
    </StyledSection>
  );
}

export default MemberAccessPanel;
