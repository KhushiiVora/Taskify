import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { membersRestored } from "../../state/memberSlice";
import axios from "../../axiosConfig";
import { refreshPage } from "../../utils/refreshPage";

import AddTaskCategory from "./AddTaskCategory";
import TaskCategoryList from "./TaskCategoryList";
import Button from "../atoms/Button";
import TaskList from "./TaskList";
// import MemberAccessPanel from "./MemberAccessPanel";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledSection } from "../../styles/workspace.styles";

export default function Workspace(props) {
  const { workspaceId, setOpenMemberAccessPanel } = props;

  const [openAddTaskCategory, setOpenAddTaskCategory] = useState(false);
  const [expand, setExpand] = useState(false);

  const [taskCategories, setTaskCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const workspaceData = useSelector((state) =>
    state.workspaces.workspaces.find(
      (workspace) => workspace._id === workspaceId
    )
  );
  const { user } = useSelector((state) => state.user);
  const { leaders, members } = useSelector((state) => state.members);

  useEffect(() => {
    axios
      .get(`/dashboard/taskCategories/${workspaceId}/`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => setTaskCategories(data))
      .catch((error) => {
        console.log(error.response);
        refreshPage(error.response.status);
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      });

    axios
      .get(`/dashboard/members/${workspaceId}/`, { withCredentials: true })
      .then((response) => response.data)
      .then((data) => {
        dispatch(membersRestored(data));
      })
      .catch((error) => {
        console.log(error);
        refreshPage(error.response.status);
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      });
  }, [workspaceId]);

  const handleClick = (event) => {
    setOpenAddTaskCategory(!openAddTaskCategory);
  };

  const handleExpand = (event, categoryId) => {
    setExpand(!expand);
    if (event.target.tagName !== "BUTTON") setSelectedCategoryId(categoryId);
  };

  return (
    <StyledSection>
      {expand ? (
        <section>
          <Button onClick={handleExpand} type="button" text="Back" />
          <TaskList categoryId={selectedCategoryId} workspaceId={workspaceId} />
        </section>
      ) : (
        <>
          <section>
            <h1>{workspaceData?.name}</h1>
            <h1>Workspace details</h1>
            {leaders.includes(user._id) ? (
              <Button
                type="button"
                onClick={handleClick}
                text="Create Task Category"
              />
            ) : (
              <></>
            )}
            <Button
              type="button"
              onClick={() => navigate(`/chatbox/${workspaceData._id}`)}
              text="Chat box"
            />
            {openAddTaskCategory ? (
              <AddTaskCategory
                setOpenAddTaskCategory={setOpenAddTaskCategory}
                workspaceId={workspaceId}
                setTaskCategories={setTaskCategories}
              />
            ) : (
              <></>
            )}
          </section>
          <div
            className="avater-container"
            onClick={() => {
              // console.log("div");
              setOpenMemberAccessPanel(true);
            }}
          >
            <AvatarGroup total={members.length}>
              {[
                ...new Array(
                  (members.length % 5) + (members.length >= 5 ? 3 : 0)
                ),
              ].map((_, index) => {
                return (
                  <Avatar
                    alt={members[index].username}
                    src={members[index].profilePic}
                  />
                );
              })}
            </AvatarGroup>
            {/* {openMemberAccessPanel && <MemberAccessPanel />} */}
          </div>
          {taskCategories.length ? (
            <section className="categories_container">
              <TaskCategoryList
                taskCategories={taskCategories}
                handleExpand={handleExpand}
              />
            </section>
          ) : (
            <>
              <h2>You dont have any taskCategory so please create one</h2>
            </>
          )}
        </>
      )}
      <ToastContainer />
    </StyledSection>
  );
}
