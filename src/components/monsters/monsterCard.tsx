import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  ButtonGroup,
  ToggleButton,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Monster } from "../../types/monster";
import { useMonstersContext } from "../../context/monstersContextProvider";
import { set } from "firebase/database";
export default function MonsterCard(props: {
  monster: Monster;
  index: number;
}) {
  let [toggleAddSubButtons, setToggleAddSubButtons] = useState(false);
  let [numChange, setNumChange] = useState(0);
  let { monsters, setMonsters } = useMonstersContext();
  const handlePlusClick = () => {
    setToggleAddSubButtons(true);
  };

  const handleMinusClick = () => {
    setToggleAddSubButtons(false);
  };

  const handleApplyClick = () => {
    if (numChange > 0) {
      if (toggleAddSubButtons) {
        props.monster.currentHealth += numChange;
        if (props.monster.currentHealth > props.monster.maxHealth) {
          props.monster.currentHealth = props.monster.maxHealth;
        }
      } else {
        props.monster.currentHealth -= numChange;
        if (props.monster.currentHealth <= 0) {
          if (monsters && setMonsters) {
            let updatedMonsters = [...monsters];
            updatedMonsters.splice(props.index, 1);
            setMonsters(updatedMonsters);
          }
        }
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
        margin: "5px",
        width: "95%",
        border: "2px solid #3A506B",
        backgroundColor: "#333333",
        borderRadius: "5px",
      }}
    >
      <Typography component="div" variant="h6" sx={{ color: "#ededed" }}>
        Name: {props.monster.name}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            padding: 0,
            marginLeft: 0,
            marginRight: 0,
            width: "40%",
          }}
        >
          <Typography component="div" sx={{ color: "#ededed" }}>
            Armor: {props.monster.armor}
          </Typography>
          <Typography component="div" sx={{ color: "#ededed" }}>
            Max HP: {props.monster.maxHealth}
          </Typography>
          <Typography component="div" sx={{ color: "#ededed" }}>
            Current HP: {props.monster.currentHealth}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "60%" }}>
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
                value="plus"
                selected={toggleAddSubButtons}
                onClick={handlePlusClick}
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
              >
                +
              </ToggleButton>
              <ToggleButton
                value="minus"
                selected={!toggleAddSubButtons}
                onClick={handleMinusClick}
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
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              sx={{
                flexGrow: 1,
                flexShrink: 1,
                width: "20%",
                margin: "3px",
                height: "90%",
                minWidth: "50px",
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
              sx={{ flexGrow: 4, flexShrink: 1, width: "80%", margin: "3px" }}
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
