import { useParams } from "react-router-dom";
import useGetMembers from "../../hooks/useGetMembers";
import MemberCard from "./MemberCard";

const MemberList = () => {
  // const { workspaceId } = props;
  const { workspaceId } = useParams();
  const { loading, members } = useGetMembers(workspaceId);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {members.map((member, idx) => (
        <MemberCard key={member._id} member={member} />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default MemberList;
