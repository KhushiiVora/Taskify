import { useSelector } from "react-redux";

import Button from "../../atoms/Button";
import { RiAddCircleFill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import {
  InnerStyledSection,
  OuterStyledSection,
} from "../../../styles/workspaceList.styles";
import { StyledSearchBar } from "../../../styles/searchbar.styles";
import { useState } from "react";

export default function WorkspaceList(props) {
  const { members, openedWorkspaceId, handleWorkspaceOpen, handleDialogOpen } =
    props;
  const workspaces = useSelector((state) => state.workspaces.workspaces);

  const [searchFocus, setSearchFocus] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredWorkspaces, setFilteredWorkspaces] = useState([]);

  const displayWorkspaces = filteredWorkspaces.length
    ? filteredWorkspaces
    : workspaces;

  const handleChange = (event) => {
    setSearchInput(event.target.value);

    if (event.target.value) {
      setFilteredWorkspaces(
        workspaces.filter((workspace) =>
          workspace.name.toLowerCase().includes(event.target.value)
        )
      );
    } else {
      setFilteredWorkspaces([]);
    }
  };

  return (
    <OuterStyledSection>
      <div className="workspace_list__header">
        <Button
          className="icon_button"
          type="button"
          title="New Workspace"
          icon={<RiAddCircleFill className="icons" />}
          onClick={handleDialogOpen}
        />
        {workspaces.length ? (
          <StyledSearchBar>
            <div
              className={`searchbar__container workspace_search ${
                searchFocus ? "searchbar__container--focused" : ""
              } ${
                searchInput.length && !filteredWorkspaces.length
                  ? "searchbar__container--error"
                  : ""
              }`}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            >
              <input
                type="text"
                placeholder="Search"
                autoComplete="off"
                onChange={handleChange}
                value={searchInput}
              />
              <IoSearch className="searchbar--icon" />
            </div>
            <span
              className={`searchbar--error ${
                searchInput.length && !filteredWorkspaces.length
                  ? "display"
                  : ""
              }`}
            >
              No Result Found
            </span>
          </StyledSearchBar>
        ) : (
          <></>
        )}
      </div>
      {workspaces.length ? (
        <InnerStyledSection>
          {displayWorkspaces.map((workspaceData) => {
            return (
              <div
                className={`list_item divider ${
                  openedWorkspaceId === workspaceData._id ? "selected" : ""
                }`}
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
                {/* <hr /> */}
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
