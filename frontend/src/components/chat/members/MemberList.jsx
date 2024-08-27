import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import MemberCard from "./MemberCard";
import { ToastContainer } from "react-toastify";
import { IoArrowBackCircle } from "react-icons/io5";

const MemberList = () => {
  const { workspaceId } = useParams();
  const { members } = useSelector((state) => state.members);
  const { workspaces } = useSelector((state) => state.workspaces);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <>
      <div className="chatbox__sidebar--heading">
        <Button
          className="icon_button"
          title="Back"
          onClick={() =>
            navigate(`/dashboard/${user.username}`, {
              state: { workspaceId },
            })
          }
          type="button"
          icon={<IoArrowBackCircle className="icons" />}
        />
        <h2>
          {
            workspaces.filter((workspace) => workspace._id === workspaceId)[0]
              ?.name
          }
        </h2>
      </div>
      {members.map((member, idx) => (
        <MemberCard key={member._id} member={member} />
      ))}
      <ToastContainer />
    </>
  );
};
export default MemberList;
