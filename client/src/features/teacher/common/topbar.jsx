import './UserSidebar.css'
import { CgProfile } from "react-icons/cg";
import * as React from 'react';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const user = {
  name: 'Ahsan Raza',
};

function Topbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="topBar">
      <h3>Learning Managment System</h3>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
        }}
      >
        <Button
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
          startIcon={<KeyboardArrowDownIcon />}
          sx={{  // Using the 'sx' prop for styling
            '& .MuiAvatar-root': {
              width: 50,
              height: 50,
              marginLeft: '10px',
            },
          }}
        >
          {user.name}
          <CgProfile className='avatar' />
        </Button>
      </div>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem > <Link to={"/teacher/accountsettings"} style={{ textDecoration: 'none' }}>
                  Profile
                  </Link></MenuItem>
        <MenuItem onClick={handleClose} >Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default Topbar;
