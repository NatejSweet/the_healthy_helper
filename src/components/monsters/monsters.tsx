import { useMonstersContext } from "../../context/monstersContextProvider";
import { useUserContext } from "../../context/userContextProvider";
import MonsterCard from "./monsterCard";
import MonsterForm from "./monsterForm";
import { Box, Container } from "@mui/material";
export default function Monsters() {
  const { monsters } = useMonstersContext();
  const user = useUserContext();

  return (
    <Box sx={{ width: "100%", padding: 0, margin: 0 }}>
      <MonsterForm />
      <Container
        sx={{
          width: "100%",
          padding: 0,
          margin: 0,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridRowGap: "10px",
          gridColumnGap: "5px",
          alignItems: "start",
        }}
      >
        {monsters?.map((monster, index) => {
          return <MonsterCard key={index} index={index} monster={monster} />;
        })}
      </Container>
    </Box>
  );
}
