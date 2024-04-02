// import { useSocketContext } from "../../context/SocketContext";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const MemberCard = ({ member }) => {
  const { socket } = useSelector((state) => state.socket);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  // let isOnline = onlineUsers.includes(member._id);

  useEffect(() => {
    console.log("inside membercard online users");
    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [onlineUsers]);

  useEffect(() => {
    console.log("inside setOnline useEffect");
    setIsOnline(onlineUsers.includes(member._id));
  });

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
      >
        <div>
          <b>{isOnline ? "online" : "offline"}</b>
          {console.log("online users", onlineUsers)}
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
