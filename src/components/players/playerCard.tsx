import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  ButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useUserContext } from "../../context/userContextProvider";
import { usePlayersContext } from "../../context/playerContextProvider";
import { useState, useEffect } from "react";
import { Player } from "../../types/player";
import { set } from "firebase/database";

export default function PlayerCard(props: { player: Player; index: number }) {
  let User = useUserContext();
  let [isTmpButtonDisabled, setIsTmpButtonDisabled] = useState(true);
  let [toggleAddSubButtons, setToggleAddSubButtons] = useState(false); //starting on -
  let [toggleMaxTempButtons, setToggleMaxTempButtons] = useState(true); //starting on max
  let [numChange, setNumChange] = useState(0);
  const { handleHealing, handleTmpHealing, handleDamage } = usePlayersContext();

  const handlePlusClick = () => {
    setToggleAddSubButtons(true);
    setIsTmpButtonDisabled(false);
  };

  const handleMinusClick = () => {
    setToggleAddSubButtons(false);
    setIsTmpButtonDisabled(true);
    setToggleMaxTempButtons(true);
  };

  const handleMaxClick = () => {
    setToggleMaxTempButtons(true);
  };

  const handleTempClick = () => {
    setToggleMaxTempButtons(false);
  };

  const handleApplyClick = () => {
    if (numChange > 0 && handleHealing && handleTmpHealing && handleDamage) {
      if (toggleAddSubButtons) {
        //adding
        if (toggleMaxTempButtons) {
          //max health
          handleHealing(props.index, numChange);
        } else {
          //temp health
          handleTmpHealing(props.index, numChange);
        }
      } else {
        //subtracting
        handleDamage(props.index, numChange);
      }
      setNumChange(0);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        height: "auto",
        margin: 0,
        marginTop: "5px",
        marginBottom: "5px",
        width: "99%",
        border: "2px solid #3A506B",
        backgroundColor: "#333333",
        borderRadius: "5px",
      }}
    >
      <Typography component="div" variant="h6" sx={{ color: "#ededed" }}>
        Name: {props.player.name}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 0,
            marginLeft: 0,
            marginRight: 0,
            justifyContent: "space-evenly",
            width: "50%",
          }}
        >
          <Typography component="div" sx={{ color: "#ededed" }}>
            Armor: {props.player.armor}
          </Typography>
          <Typography component="div" sx={{ color: "#ededed" }}>
            Max HP: {props.player.maxHealth}
          </Typography>
          <Typography component="div" sx={{ color: "#ededed" }}>
            Temp HP: {props.player.tmpHealth}
          </Typography>
          <Typography component="div" sx={{ color: "#ededed" }}>
            Current HP: {props.player.currentHealth}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <ButtonGroup>
              <ToggleButton
                sx={{
                  width: "50%",
                  margin: "3px",
                  color: "#ededed",
                  backgroundColor: "#07332f",
                  borderColor: "#0a4a44",
                  "&:hover": { backgroundColor: "#09665d" },
                  "&.Mui-selected": {
                    backgroundColor: "#09665d",
                    color: "#ededed",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#09665d",
                    color: "#ededed",
                  },
                }}
                value="plus"
                selected={toggleAddSubButtons}
                onClick={handlePlusClick}
              >
                +
              </ToggleButton>
              <ToggleButton
                sx={{
                  width: "50%",
                  margin: "3px",
                  color: "#ededed",
                  backgroundColor: "#07332f",
                  borderColor: "#0a4a44",
                  "&:hover": { backgroundColor: "#09665d" },
                  "&.Mui-selected": {
                    backgroundColor: "#09665d",
                    color: "#ededed",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#09665d",
                    color: "#ededed",
                  },
                }}
                value="minus"
                selected={!toggleAddSubButtons}
                onClick={handleMinusClick}
              >
                -
              </ToggleButton>
            </ButtonGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <ButtonGroup>
              <ToggleButton
                sx={{
                  width: "50%",
                  margin: "3px",
                  backgroundColor: "#07332f",
                  borderColor: "#0a4a44",
                  color: "#ededed",
                  "&:hover": { backgroundColor: "#09665d" },
                  "&.Mui-selected": {
                    backgroundColor: "#09665d",
                    color: "#ededed",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#09665d",
                    color: "#ededed",
                  },
                }}
                value="max"
                selected={toggleMaxTempButtons}
                onClick={handleMaxClick}
              >
                max
              </ToggleButton>
              <ToggleButton
                sx={{
                  width: "50%",
                  margin: "3px",
                  backgroundColor: "#07332f",
                  borderColor: "#0a4a44",
                  color: "#ededed",
                  "&:hover": { backgroundColor: "#09665d" },
                  "&.Mui-selected": {
                    backgroundColor: "#09665d",
                    color: "#ededed",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#09665d",
                    color: "#ededed",
                  },
                }}
                value="temp"
                selected={!toggleMaxTempButtons}
                disabled={isTmpButtonDisabled}
                onClick={handleTempClick}
              >
                temp
              </ToggleButton>
            </ButtonGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "30%",
                margin: "3px",
                height: "90%",
                color: "#ededed",
                backgroundColor: "#0a4a44",
                borderColor: "#0a4a44",
                "&:hover": { backgroundColor: "#09665d" },
              }}
              onClick={handleApplyClick}
            >
              Apply
            </Button>
            <TextField
              id="outlined-basic"
              label={toggleAddSubButtons ? "Healing" : "Damage"}
              value={numChange}
              onChange={(e) => setNumChange(Number(e.target.value))}
              variant="outlined"
              sx={{ width: "70%", margin: "3px" }}
              InputLabelProps={{
                shrink: true,
                style: { color: "#ededed" },
              }}
              InputProps={{
                style: { color: "#ededed", borderColor: "#3A506B" },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
