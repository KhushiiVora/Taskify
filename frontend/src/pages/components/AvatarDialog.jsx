import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saved as userSaved } from "../../state/userSlice";

import axios from "../../axiosConfig";
import AvatarGrid from "./AvatarGrid";
import Button from "../atoms/Button";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { StyledSection } from "../../styles/dialog.styles";

export default function AvatarDialog(props) {
  const { open, handleDialogClose } = props;
  const [isGirl, setIsGirl] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    setIsGirl(value);
    setSelectedImage("");
    console.log(value);
  };

  const handleSelectAvatar = async (event) => {
    await axios
      .patch(
        `/profile/edit/${user._id}/pic`,
        { profilePic: selectedImage },
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        dispatch(userSaved(data));
      })
      .catch((error) => console.log(error));

    handleDialogClose(event);
  };

  return (
    <>
      {open ? (
        <>
          <StyledSection onClick={handleDialogClose}>
            <div className="dialog_container">
              <h1>Select your favourite avatar</h1>
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={isGirl}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                  // centered
                >
                  <Tab value={1} label="Girl" />
                  <Tab value={0} label="Boy" />
                </Tabs>
              </Box>
              <AvatarGrid
                isGirl={isGirl}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
              <div>
                <Button
                  type="button"
                  text="Select"
                  onClick={handleSelectAvatar}
                  name="selectAvatarButton"
                />
              </div>
            </div>
          </StyledSection>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
