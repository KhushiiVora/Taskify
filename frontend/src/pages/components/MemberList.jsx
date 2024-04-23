import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useGetMembers from "../../hooks/useGetMembers";
import MemberCard from "./MemberCard";
import { ToastContainer } from "react-toastify";

const MemberList = () => {
  const { workspaceId } = useParams();
  const { loading } = useGetMembers(workspaceId);
  const { members } = useSelector((state) => state.members);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {members.map((member, idx) => (
        <MemberCard key={member._id} member={member} />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
      <ToastContainer />
    </div>
  );
};
export default MemberList;
