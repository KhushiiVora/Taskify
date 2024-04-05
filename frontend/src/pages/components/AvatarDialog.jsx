import { useState } from "react";
import AvatarGrid from "./AvatarGrid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { StyledSection } from "../../styles/dialog.styles";

export default function AvatarDialog(props) {
  const { open, handleDialogClose } = props;
  const [value, setValue] = useState("girl");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <>
      {open ? (
        <>
          <StyledSection onClick={handleDialogClose}>
            <div className="dialog_container">
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                  centered
                >
                  <Tab value="girl" label="Girl" />
                  <Tab value="boy" label="Boy" />
                </Tabs>
              </Box>
              <AvatarGrid isGirl />
            </div>
          </StyledSection>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
