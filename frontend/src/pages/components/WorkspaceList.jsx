import { useSelector } from "react-redux";

import Button from "../atoms/Button";
import { RiAddCircleFill } from "react-icons/ri";
import {
  InnerStyledSection,
  OuterStyledSection,
} from "../../styles/workspaceList.styles";

export default function WorkspaceList(props) {
  const { handleWorkspaceOpen, handleDialogOpen } = props;
  const workspaces = useSelector((state) => state.workspaces.workspaces);

  return (
    <OuterStyledSection>
      <Button
        className="workspace--add_button"
        type="button"
        icon={<RiAddCircleFill />}
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
                <p>{workspaceData.members.length} members</p>
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
