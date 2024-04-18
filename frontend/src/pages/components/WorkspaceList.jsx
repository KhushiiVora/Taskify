import { useSelector } from "react-redux";

import Button from "../atoms/Button";
import { RiAddCircleFill } from "react-icons/ri";
import {
  InnerStyledSection,
  OuterStyledSection,
} from "../../styles/workspaceList.styles";

export default function WorkspaceList(props) {
  const { members, openedWorkspaceId, handleWorkspaceOpen, handleDialogOpen } =
    props;
  const workspaces = useSelector((state) => state.workspaces.workspaces);

  return (
    <OuterStyledSection>
      <Button
        className="icon_button"
        type="button"
        title="New Workspace"
        icon={<RiAddCircleFill className="icons" />}
        onClick={handleDialogOpen}
      />
      {workspaces.length ? (
        <InnerStyledSection>
          {workspaces.map((workspaceData) => {
            return (
              <div
                key={workspaceData._id}
                onClick={(event) =>
                  handleWorkspaceOpen(event, workspaceData._id)
                }
              >
                <h3>{workspaceData.name}</h3>
                <p>
                  {openedWorkspaceId === workspaceData._id
                    ? members.length
                    : workspaceData.members.length}{" "}
                  members
                </p>
                <hr />
              </div>
            );
          })}
        </InnerStyledSection>
      ) : (
        <></>
      )}
    </OuterStyledSection>
  );
}
