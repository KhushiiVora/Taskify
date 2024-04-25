import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import useGetMembers from "../../hooks/useGetMembers";
import Button from "../atoms/Button";
import MemberCard from "./MemberCard";
import { ToastContainer } from "react-toastify";
import { IoArrowBackCircle } from "react-icons/io5";

const MemberList = () => {
  const { workspaceId } = useParams();
  const { loading } = useGetMembers(workspaceId);
  const { members } = useSelector((state) => state.members);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <>
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
      {members.map((member, idx) => (
        <MemberCard key={member._id} member={member} />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
      <ToastContainer />
    </>
  );
};
export default MemberList;
