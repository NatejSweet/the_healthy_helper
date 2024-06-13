import { usePlayersContext } from "../../context/playerContextProvider";
import { useUserContext } from "../../context/userContextProvider";
import { Player } from "../../types/player";
import { Box, Typography } from "@mui/material";
import EditablePlayerCard from "./editablePlayerCard";
import PlayerCard from "./playerCard";
import PlayersControls from "./playersControls"; // Add the import statement for PlayersControls

export default function Players() {
  const { editPlayers, setEditPlayers, players, setPlayers } =
    usePlayersContext();
  const user = useUserContext();

  if (!players || !setPlayers || editPlayers == null || !setEditPlayers) {
    throw new Error("Players context not found");
  }

  return (
    <>
      {user ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "3px",
            margin: 0,
            width: "95%",
          }}
        >
          <PlayersControls />
          {players.map((player: Player, index: number) => {
            return editPlayers ? (
              <EditablePlayerCard key={index} player={player} index={index} />
            ) : (
              <PlayerCard key={index} player={player} index={index} />
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography variant="h5" sx={{ color: "ededed" }}>
            Please log in to use players
          </Typography>
        </Box>
      )}
    </>
  );
}
