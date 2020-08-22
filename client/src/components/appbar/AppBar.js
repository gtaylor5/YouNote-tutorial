import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { MoreVert } from '@material-ui/icons';
import { Menu, MenuItem, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { useAuth } from '../auth/auth';

const CustomAppBar = () => {

  const [ shouldOpenMenu, setOpenMenu ] = useState(false);
  const [ menuAnchor, setMenuAnchor ] = useState(null);

  const { setUserName, username, setAuthToken } = useAuth();

  const closeMenu = () => {
    setOpenMenu(false);
  }

  const openMenu = (e) => {
    setOpenMenu(true);
    setMenuAnchor(e.currentTarget);
  }

  const logout = () => {
    setUserName();
    setAuthToken();
    closeMenu();
  }

  return (
    <AppBar position="static">
      {username ? 
      <Menu 
        id="menu" 
        anchorEl={menuAnchor} 
        keepMounted 
        open={shouldOpenMenu} 
        onClose={() => closeMenu()}>
          <MenuItem onClick={() => closeMenu()}>
            <Link to="/" style={{textDecoration: 'none', color: '#000'}}>Home</Link>
          </MenuItem>
          <MenuItem onClick={() => logout()}>
            <Link to="/" style={{textDecoration: 'none', color: '#000'}}>Logout</Link>
          </MenuItem>
        </Menu> : null}
        <Toolbar>
          {username ? <IconButton edge="start" color='inherit' onClick={e => openMenu(e)}>
            <MoreVert />
          </IconButton> : null}
          <Typography variant="h6">
            YouNote
          </Typography>
        </Toolbar>
    </AppBar>
  )
}

export default CustomAppBar;