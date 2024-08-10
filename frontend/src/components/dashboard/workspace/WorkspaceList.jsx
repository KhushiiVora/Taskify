import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
import axios from "../../../axiosConfig";

import Button from "../../atoms/Button";
import { RiAddCircleFill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import {
  InnerStyledSection,
  OuterStyledSection,
} from "../../../styles/workspaceList.styles";
import { StyledSearchBar } from "../../../styles/searchbar.styles";
import { restored as workspacesRestored } from "../../../state/workspaceSlice";

export default function WorkspaceList(props) {
  const { members, openedWorkspaceId, handleWorkspaceOpen, handleDialogOpen } =
    props;

  const [workspaces, setWorkspaces] = useState(
    useSelector((state) => state.workspaces.workspaces)
  );

  const [searchFocus, setSearchFocus] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredWorkspaces, setFilteredWorkspaces] = useState([]);

  const navigate = useNavigate();
  const { clearState } = useLogout();
  const dispatch = useDispatch();

  const displayWorkspaces = filteredWorkspaces.length
    ? filteredWorkspaces
    : workspaces;

  useEffect(() => {
    const timer = setInterval(getUpdatesOfWorkspace, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getUpdatesOfWorkspace = async () => {
    await axios
      .get(`/user/workspaces`, { withCredentials: true })
      .then((response) => response.data)
      .then((data) => {
        if (data.length < workspaces.length) {
          dispatch(workspacesRestored(data));
          handleWorkspaceOpen(null, "");
        }
        setWorkspaces(data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          setTimeout(() => {
            clearState();
            navigate("/login");
          }, 3000);
        }
      });
  };

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
