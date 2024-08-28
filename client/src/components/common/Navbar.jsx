import { useState ,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import SingUpButton from './button/SingUpButton';
import Typography from '@mui/material/Typography';
import LogInButton from './button/LogInButton';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import logo from '../../assets/gyanlogo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Logoutbutton from './button/Logoutbutton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { fetchCourseCategories } from '../../services/operations/courseApi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { logout } from '../../services/operations/authApi';

// import axios from 'axios';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const token = useSelector((state) => state.auth?.token);
  const { user } = useSelector((state) => state.profile)
  
  //const user  = useSelector((state) => state.profile?.user);


  // Commented out the axios part, you can uncomment and use it
  /* useEffect(() => {
    // Fetch menu items from the backend dynamically
    axios.get('/api/course')
      .then(response => {
        setMenuItems(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []); */
  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCourseCategories();
      setMenuItems(categories);
    };

    getCategories();
  }, []);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleCategoryClick = (item) => {
    const categoryName = item.name.replace(/\s+/g, '-');
    navigate(`/category/${categoryName}`);
    handleMenuClose();
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleHome = ()=>{
    navigate('/')
  }
  const handleLogoutClick = () => {
    dispatch(logout())
    navigate('/')
    handleCloseUserMenu();
  };
  const handleDashboardClick = () => {
  navigate('/dashboard')
    handleCloseUserMenu();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
      <Divider />
      <List>
        <ListItem key="home">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem key="Category" onClick={handleMenuOpen}>
          <ListItemText primary="Category" />
        </ListItem>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {menuItems.map((item) => (
            <MenuItem key={item.id} onClick={() => handleCategoryClick(item)}>
              {item.name}
            </MenuItem>
          ))}
        </Menu>
        <ListItem key="about-us">
          <ListItemText primary="About Us" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="xl" sx={{ paddingLeft: '70px', paddingRight: '70px' }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', paddingLeft: '30px', paddingRight: '30px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: '60px', marginRight: '10px' }} />
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Button key="home" onClick={handleHome} sx={{
  color: '#333333',
  backgroundColor: '#f5f5f5',
  fontWeight: '600',
  fontSize: '24px',
  fontFamily: 'Poppins',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#f86e33b7',
    cursor: 'pointer',
  },
}}>
              Home
            </Button>
            <Button key="Category" sx={{
color: '#333333', // Change text color to white for a premium feel
backgroundColor: '#f5f5f5', // Change background to dark for premium look
fontWeight: 'bold', // Adjust font weight for boldness
fontSize: '24px', // Adjust font size for flexibility
fontFamily: 'Poppins', // Maintain Poppins font
// Adjust padding for comfort
borderRadius: '3px', // Subtle border radius
boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
transition: 'all 0.2s ease-in-out', // Smooth hover effect
 // Space between text and icon
cursor: 'pointer', // Ensure pointer behavior,
'&:hover': {
  backgroundColor: '#f86e33b7', // Darken background on hover
  cursor: 'pointer',
  // ... other hover styles if needed
}
}} onClick={handleMenuOpen} endIcon={<ExpandMoreIcon sx={{ color: '#333333' }} />}>
              Category 
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}
            >
              {menuItems.map((item) => (
                <MenuItem key={item.id} onClick={handleMenuClose}>
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
            <Button key="about-us" sx={{
  color: '#333333',
  backgroundColor: '#f5f5f5',
  fontWeight: '600',
  fontSize: '24px',
  fontFamily: 'Poppins',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#f86e33b7',
    cursor: 'pointer',
  },
}}>
              About Us
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4px' }}>
      {token ? (
        <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={user.image} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
         <MenuItem onClick={handleDashboardClick}>
        <Typography textAlign="center">Dashboard</Typography>
      </MenuItem>
      <MenuItem onClick={handleLogoutClick}>
        <Typography textAlign="center">Logout</Typography>
      </MenuItem>
        </Menu>
      </Box>
      ) : (
        <>
          <SingUpButton />
          <LogInButton />
        </>
      )}
    </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color="black" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;