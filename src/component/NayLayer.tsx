import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import ConnectButton from '../buttons/ConnectButton';

const useStyle = makeStyles((theme) => ({
  navStyle: {
    height: '50px',
    backgroundColor: 'rgba(255,255,255,1)',
    display: 'flex',
  },
}));

const NavLayer = () => {
  const classes = useStyle();
  
  return (
    <div className={classes.navStyle}>
      <ConnectButton />
    </div>
  );
};

export default NavLayer;
