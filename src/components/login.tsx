import {
  useUserContext,
  googleSignIn,
  logOut,
} from "../context/userContextProvider";
import { Button, Typography, Box } from "@mui/material";
const Login = () => {
  const user = useUserContext();

  function handleLogOut() {
    logOut();
  }

  function handleGoogleSignIn() {
    googleSignIn();
  }

  return (
    <Box sx={{ width: "100%", margin: "auto" }}>
      {user ? (
        <Button
          sx={{
            color: "#ededed",
            backgroundColor: "#0a4a44",
            borderColor: "#0a4a44",
            "&:hover": { backgroundColor: "#09665d" },
          }}
          variant="contained"
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      ) : (
        <Button
          sx={{
            margin: "auto",
            color: "#ededed",
            backgroundColor: "#0a4a44",
            borderColor: "#0a4a44",
            "&:hover": { backgroundColor: "#09665d" },
          }}
          variant="contained"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
      )}
    </Box>
  );
};

export default Login;
