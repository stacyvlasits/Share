import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


export default function SearchBar({ onClickMenu, disabled, open }) {
  const classes = useStyles();


  const onChange = e => {
    //console.log('SearchBar#onChange: ', e);
  };


  const onSubmit = e => {
    e.preventDefault();
    console.log('SearchBar#onSubmit: ', e);
    return false;
  };


  return (
    <Paper component='form' className={classes.root} onSubmit={onSubmit}>
      <IconButton
        className={classes.iconButton}
        aria-label='menu'
        onClick={onClickMenu}
        disabled={disabled}
      >
        {/* {open ? <CloseIcon /> : <MenuIcon />} */}
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder='Search IFC'
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange = {onChange}
      />
      <IconButton
        type='submit'
        className={classes.iconButton}
        aria-label='search'
      >
        <SearchIcon />
      </IconButton>
      {/* <Divider className={classes.divider} orientation="vertical" /> */}
      {/* <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <DirectionsIcon />
      </IconButton> */}
      </Paper>
  );
}
