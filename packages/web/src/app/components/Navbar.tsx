import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <AccountBalanceIcon />
        </IconButton>
        <Typography variant="h6">Mini Bank</Typography>
      </Toolbar>
    </AppBar>
  );
};