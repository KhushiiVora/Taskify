import { useSelector } from "react-redux";

export default function WorkspaceList(props) {
  const workspaces = useSelector((state) => state.workspaces.workspaces);

  return (
    <>
      {workspaces.length ? (
        <section>
          {workspaces.map((workspaceData) => {
            return (
              <div key={workspaceData._id}>
                <h3>{workspaceData.name}</h3>
                <p>{workspaceData.members.length} members</p>
                <hr />
              </div>
            );
          })}
        </section>
      ) : (
        <div>Please Join or Create workspaces</div>
      )}
    </>
  );
}
