import { useState } from "react";

import AddTaskCategory from "./AddTaskCategory";
import ProgressBar from "../ProgressBar";
import Button from "../../atoms/Button";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import {
  StyledDiv,
  menuItemEditStyling,
  menuItemDeleteStyling,
} from "../../../styles/taskCategoryCard.styles";

function TaskCategoryCard(props) {
  const {
    workspaceId,
    setTaskCategories,
    category,
    isLeader,
    handleExpand,
    setOpenConfirmDialog,
    setCategoryToDelete,
  } = props;

  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledDiv>
      <div className="category_content">
        <div>
          {categoryToEdit && categoryToEdit._id === category._id ? (
            <AddTaskCategory
              isNewCategory={false}
              workspaceId={workspaceId}
              setTaskCategories={setTaskCategories}
              categoryToEdit={categoryToEdit}
              setCategoryToEdit={setCategoryToEdit}
            />
          ) : (
            <h4>{category.name}</h4>
          )}
          <div>
            {`${category.progress}/${category.tasks.length}`} tasks completed
          </div>
          <Button
            className="link_button"
            text="Go to Tasks"
            onClick={(event) => handleExpand(event, category._id)}
          />
        </div>
        {isLeader && (
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                sx={menuItemEditStyling}
                onClick={() => {
                  setCategoryToEdit(category);
                  handleClose();
                }}
              >
                <AiFillEdit className="icons" /> Edit
              </MenuItem>
              <MenuItem
                sx={menuItemDeleteStyling}
                onClick={() => {
                  setCategoryToDelete(category);
                  setOpenConfirmDialog(true);
                  handleClose();
                }}
              >
                <MdDelete className="icons" /> Delete
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
      <ProgressBar value={category.progress} total={category.tasks.length} />
    </StyledDiv>
  );
}

export default TaskCategoryCard;
