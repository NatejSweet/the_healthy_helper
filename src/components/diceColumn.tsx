import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useUserContext } from "../context/userContextProvider";
import { useState } from "react";

export default function DiceColumn() {
  const user = useUserContext();
  const diceSizes: number[] = [2, 4, 6, 8, 10, 12, 20, 100];
  const [numDice, setNumDice] = useState<number[]>([1, 1, 1, 1, 1, 1, 1, 1]);
  const [rollValues, setRollValues] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [total, setTotal] = useState<number>(0);

  const calculateTotal = () => {
    let sum = 0;
    for (let i = 0; i < rollValues.length; i++) {
      sum += rollValues[i];
    }
    setTotal(sum);
  };

  const handleNumDiceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newNumDice = [...numDice];
    newNumDice[index] = parseInt(e.target.value);
    setNumDice(newNumDice);
  };

  const handleRoll = (index: number) => () => {
    const newRollValues = [...rollValues];
    let diceSize = diceSizes[index];
    let total = 0;
    for (let i = 0; i < numDice[index]; i++) {
      let result = Math.floor(Math.random() * diceSize) + 1;
      total += result;
    }
    newRollValues[index] = total;
    setRollValues(newRollValues);
  };

  const resetRoll = (index: number) => {
    const newRollValues = [...rollValues];
    newRollValues[index] = 0;
    setRollValues(newRollValues);
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginRight: "auto",
        marginLeft: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "auto",
      }}
    >
      {diceSizes.map((size, index) => (
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "5px",
            height: "auto",
            width: "auto",
            margin: "5px",
            alignItems: "center",
            justifyContent: "space-between",
            border: "2px solid #3A506B",
            backgroundColor: "#333333",
            borderRadius: "5px",
          }}
          key={index}
        >
          <TextField
            id="outlined-number"
            value={numDice[index]}
            type="number"
            size="small"
            sx={{
              minwidth: "15%",
              flexGrow: 1,
              maxWidth: "30%",
              padding: 0,
              "& input[type=number]::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
            }}
            InputLabelProps={{
              shrink: true,
              style: { color: "#ededed" },
            }}
            InputProps={{
              style: { color: "#ededed", borderColor: "#3A506B" },
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleNumDiceChange(event, index)
            }
          />
          <Box
            sx={{
              display: "flex",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                height: "100%",
                alignContent: "left",
                width: "10%",
                color: "#ededed",
              }}
            >
              d{size}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleRoll(index)}
            size="small"
            sx={{
              flexShrink: 1,
              margin: "5px",
              width: "15%",
              color: "#ededed",
              backgroundColor: "#0a4a44",
              borderColor: "#0a4a44",
              "&:hover": { backgroundColor: "#09665d" },
            }}
          >
            Roll
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                height: "100%",
                alignContent: "center",
                width: "auto",
                border: "2px solid #3A506B",
                color: "#ededed",
                padding: "3px",
              }}
            >
              {rollValues[index]}
            </Typography>
          </Box>
          <IconButton
            onClick={() => resetRoll(index)}
            sx={{ padding: 0, margin: "3px", color: "#ededed" }}
            size="small"
          >
            {" "}
            X
          </IconButton>
        </Card>
      ))}
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "5px",
          height: "auto",
          width: "auto",
          margin: "5px",
          alignItems: "center",
          justifyContent: "space-evenly",
          border: "2px solid #3A506B",
          backgroundColor: "#333333",
          borderRadius: "5px",
        }}
      >
        <Button
          variant="contained"
          onClick={calculateTotal}
          sx={{
            color: "#ededed",
            backgroundColor: "#0a4a44",
            borderColor: "#0a4a44",
            "&:hover": { backgroundColor: "#09665d" },
          }}
        >
          {" "}
          Calculate Total:{" "}
        </Button>
        <Typography
          sx={{
            height: "100%",
            alignContent: "center",
            width: "auto",
            margin: "5px",
            color: "#ededed",
          }}
        >
          {total}
        </Typography>
      </Card>
    </Box>
  );
}
