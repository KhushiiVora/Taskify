import { useSelector } from "react-redux";

export default function Workspace(props) {
  const { workspaceId } = props;

  const workspaceData = useSelector((state) =>
    state.workspaces.workspaces.find(
      (workspace) => workspace._id === workspaceId
    )
  );
  console.log("workspaceData", workspaceData);

  return (
    <section>
      <h1>{workspaceData?.name}</h1>
      <h1>Workspace details</h1>
    </section>
  );
}
