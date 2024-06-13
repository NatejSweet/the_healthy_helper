import { TextField, Box, Button } from "@mui/material";
import { useMonstersContext } from "../../context/monstersContextProvider";
import { useState } from "react";
import monsterNames from "../../assets/data/monsterNames.json";
export default function MonsterForm() {
  const { monsters, setMonsters } = useMonstersContext();
  const [hp, setHp] = useState(0);
  const [armor, setArmor] = useState(0);
  const [numberToSpawn, setNumberToSpawn] = useState(0);

  function handleAddMonsters() {
    if (monsters && setMonsters) {
      if (numberToSpawn > 0 && hp > 0) {
        const newMonsters = [...monsters];
        for (let i = 0; i < numberToSpawn; i++) {
          const randomName =
            monsterNames[Math.floor(Math.random() * monsterNames.length)];
          newMonsters.push({
            armor: armor,
            maxHealth: hp,
            currentHealth: hp,
            name: randomName,
          });
        }
        setMonsters(newMonsters);
        setNumberToSpawn(0);
      }
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        padding: "5px",
        width: "auto",
        margin: "5px",
        justifyContent: "space-between",
        border: "2px solid #3A506B",
        backgroundColor: "#333333",
        borderRadius: "5px",
      }}
    >
      <TextField
        id="outlined-number"
        label="Hp"
        type="number"
        value={hp}
        onChange={(e) => setHp(Number(e.target.value))}
        InputLabelProps={{
          shrink: true,
          style: { color: "#ededed" },
        }}
        InputProps={{
          style: { color: "#ededed", borderColor: "#3A506B" },
        }}
        variant="outlined"
      />
      <TextField
        id="outlined-number"
        label="Armor"
        type="number"
        value={armor}
        onChange={(e) => setArmor(Number(e.target.value))}
        InputLabelProps={{
          shrink: true,
          style: { color: "#ededed", borderColor: "#3A506B" },
        }}
        InputProps={{
          style: { color: "#ededed", borderColor: "#3A506B" },
        }}
        variant="outlined"
      />
      <TextField
        id="outlined-number"
        label="Number to Spawn"
        type="number"
        value={numberToSpawn}
        onChange={(e) => setNumberToSpawn(Number(e.target.value))}
        InputLabelProps={{
          shrink: true,
          style: { color: "#ededed", borderColor: "#3A506B" },
        }}
        InputProps={{
          style: { color: "#ededed", borderColor: "#3A506B" },
        }}
        variant="outlined"
      />
      <Button
        sx={{
          color: "#ededed",
          backgroundColor: "#0a4a44",
          borderColor: "#0a4a44",
          "&:hover": { backgroundColor: "#09665d" },
        }}
        variant="contained"
        onClick={handleAddMonsters}
      >
        Add Monsters
      </Button>
    </Box>
  );
}
