"use client";
import Image from "next/image";
import Login from "../components/login";
import Players from "../components/players/players";
import Monsters from "../components/monsters/monsters";
import DiceColumn from "../components/diceColumn";
import MonsterForm from "../components/monsters/monsterForm";
import PlayersControls from "../components/players/playersControls";
import { Box, Button, Container } from "@mui/material";
import { useState, useEffect, use } from "react";
import { UserContextProvider } from "../context/userContextProvider";
import { PlayersContextProvider } from "../context/playerContextProvider";
import { MonstersContextProvider } from "@/context/monstersContextProvider";
import { Player } from "../types/player";
import { Monster } from "../types/monster";
import { set } from "firebase/database";

export default function Home() {
  return (
    <UserContextProvider>
      <PlayersContextProvider>
        <MonstersContextProvider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "3px",
              margin: 0,
              width: "100%",
              height: "100vh",
            }}
          >
            <Box
              sx={{
                width: "18%",
                height: "100%",
                padding: 0,
                margin: "3px",
                overflowY: "auto",
              }}
            >
              <Login />
              <DiceColumn />
            </Box>
            <Box
              sx={{
                width: "55%",
                height: "100%",
                padding: 0,
                margin: "3px",
                overflowY: "auto",
              }}
            >
              <Monsters />
            </Box>
            <Box
              sx={{
                width: "27%",
                height: "100%",
                padding: 0,
                margin: "3px",
                overflowY: "auto",
              }}
            >
              <Players />
            </Box>
          </Box>
        </MonstersContextProvider>
      </PlayersContextProvider>
    </UserContextProvider>
  );
}
