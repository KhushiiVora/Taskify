import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saved as userSaved } from "../../state/userSlice";

import axios from "../../axiosConfig";
import AvatarGrid from "./AvatarGrid";
import Button from "../atoms/Button";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledSection } from "../../styles/dialog.styles";

export default function AvatarDialog(props) {
  const { open, handleDialogClose, setOpenAvatarDialog } = props;
  const [isGirl, setIsGirl] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    setIsGirl(value);
    setSelectedImage("");
  };

  const handleSelectAvatar = async (event) => {
    if (selectedImage) {
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
          dispatch(userSaved(data));
          setSelectedImage("");
        })
        .catch((error) => {
          toast.error(error.response.data, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          });
        });
      setOpenAvatarDialog(false);
    }
  };

  return (
    <>
      {open ? (
        <>
          <StyledSection onClick={handleDialogClose}>
            <div className="dialog_container dialog_container__avatar">
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
                  className="filled_button"
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
      <ToastContainer />
    </>
  );
}
