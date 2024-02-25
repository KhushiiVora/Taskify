import { useSelector } from "react-redux";

import { StyledSection } from "../../styles/workspaceList.styles";

export default function WorkspaceList(props) {
  const { handleWorkspaceOpen } = props;
  const workspaces = useSelector((state) => state.workspaces.workspaces);

  return (
    <>
      {workspaces.length ? (
        <StyledSection>
          {workspaces.map((workspaceData) => {
            return (
              <div
                key={workspaceData._id}
                onClick={(event) =>
                  handleWorkspaceOpen(event, workspaceData._id)
                }
              >
                <h3>{workspaceData.name}</h3>
                <p>{workspaceData.members.length} members</p>
                <hr />
              </div>
            );
          })}
        </StyledSection>
      ) : (
        <div>Please Join or Create workspaces</div>
      )}
    </>
  );
}
