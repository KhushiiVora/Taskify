import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AvatarDialog from "./AvatarDialog";

export default function Profile() {
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.isSignedUp) setOpenAvatarDialog(true);
  }, []);

  const handleDialogOpen = () => {
    setOpenAvatarDialog(true);
  };
  const handleDialogClose = (event) => {
    if (event.target.tagName === "SECTION" || event.type === "submit") {
      setOpenAvatarDialog(false);
    }
  };

  return (
    <>
      <div>Profile page</div>
      {/* fields */}
      <AvatarDialog
        open={openAvatarDialog}
        handleDialogClose={handleDialogClose}
      />
    </>
  );
}
