import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AvatarDialog from "./AvatarDialog";

export default function Profile() {
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.isSignedUp) setOpenAvatarDialog(true);
  }, []);

  return (
    <>
      <div>Profile page</div>
      <AvatarDialog open={openAvatarDialog} />
    </>
  );
}
