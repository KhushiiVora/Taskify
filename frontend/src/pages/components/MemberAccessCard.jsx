import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

// import { StyledSection } from "../../styles/memberAccessPanel.styles";

function MemberAccessCard(props) {
  const { member, isLeader, handleRemove, setPublicProfile } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user } = useSelector((state) => state.user);
  const { leaders } = useSelector((state) => state.members);

  // const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className="panel__member"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar
          alt="avatar"
          src={member.profilePic}
          className="panel__member--avatar"
        />
        <div>
          <span className="panel__member--username">{`${member.username} ${
            member._id === user._id ? "(You)" : ""
          }`}</span>
          {isLeader && <span className="panel__member--leader">Leader</span>}
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => setPublicProfile(member)}>Profile</MenuItem>
        {member._id !== user._id && leaders.includes(user._id) && (
          <MenuItem onClick={handleClose}>{`${
            isLeader ? "Remove Leader" : "Make Leader"
          }`}</MenuItem>
        )}
        {member._id !== user._id && leaders.includes(user._id) && (
          <MenuItem onClick={() => handleRemove(member._id)}>Remove</MenuItem>
        )}
      </Menu>
    </>
  );
}

export default MemberAccessCard;
