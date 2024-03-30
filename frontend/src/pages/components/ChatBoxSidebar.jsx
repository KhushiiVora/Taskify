import MemberList from "./MemberList";
// import LogoutButton from "./LogoutButton";

const ChatBoxSidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <div className="divider px-3"></div>
      <MemberList />
      {/* <LogoutButton /> */}
    </div>
  );
};

export default ChatBoxSidebar;
