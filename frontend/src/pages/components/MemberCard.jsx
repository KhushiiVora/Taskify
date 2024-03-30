// import { useSocketContext } from "../../context/SocketContext";

const MemberCard = ({ member }) => {
  // const { onlineUsers } = useSocketContext();
  // const isOnline = onlineUsers.includes(member._id);
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
      >
        {/* <div className={`avatar ${isOnline ? "online" : ""}`}> this line is replacement of below line after socket*/}
        <div>
          <div className="w-12 rounded-full">
            <img src={member.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{member.username}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default MemberCard;
