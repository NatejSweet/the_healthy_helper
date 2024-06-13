import { Card, CardMedia, Box, Button, TextField } from "@mui/material";
import { Player } from "../../types/player";
import { usePlayersContext } from "../../context/playerContextProvider";

export default function EditablePlayerCard(props: {
  player: Player;
  index: number;
}) {
  const {
    handleNameChange,
    handleArmorChange,
    handleMaxHealthChange,
    handleRemovePlayer,
  } = usePlayersContext();
  if (
    handleNameChange == null ||
    handleArmorChange == null ||
    handleMaxHealthChange == null ||
    handleRemovePlayer == null
  ) {
    throw new Error("Players context not found");
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        padding: "5px",
        height: "auto",
        marginRight: 0,
        marginLeft: "auto",
        width: "99%",
        border: "2px solid #3A506B",
        backgroundColor: "#333333",
        borderRadius: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiTextField-root": { m: 1, width: "15ch" },
          width: "75%",
        }}
      >
        <TextField
          label="Name"
          value={props.player.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleNameChange(props.index, event)
          }
          sx={{ minWidth: "100%" }}
          InputLabelProps={{
            shrink: true,
            style: { color: "#ededed" },
          }}
          InputProps={{
            style: { color: "#ededed", borderColor: "#3A506B" },
          }}
        />
        <TextField
          label="Armor"
          value={props.player.armor}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleArmorChange(props.index, event)
          }
          sx={{ minWidth: "100%" }}
          InputLabelProps={{
            shrink: true,
            style: { color: "#ededed" },
          }}
          InputProps={{
            style: { color: "#ededed", borderColor: "#3A506B" },
          }}
        />
        <TextField
          label="Max Health"
          value={props.player.maxHealth}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleMaxHealthChange(props.index, event)
          }
          sx={{ minWidth: "100%" }}
          InputLabelProps={{
            shrink: true,
            style: { color: "#ededed" },
          }}
          InputProps={{
            style: { color: "#ededed", borderColor: "#3A506B" },
          }}
        />
      </Box>
      <Box
        sx={{
          width: "25%",
          position: "relative",
        }}
      >
        <Button
          onClick={() => {
            handleRemovePlayer(props.index);
          }}
          sx={{
            color: "#ededed",
            backgroundColor: "#0a4a44",
            borderColor: "#0a4a44",
            "&:hover": { backgroundColor: "#09665d" },
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
}
