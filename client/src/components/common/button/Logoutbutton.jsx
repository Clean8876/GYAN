import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authApi';

function Logoutbutton() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
  const handelSubmit = ()=>{
    dispatch(logout())
    navigate('/')

  }
  return (
    <Button variant="contained" onClick={handelSubmit} sx={{ background:'#FF763D', borderRadius:'20px', textAlign:'center',
        color:'white',height:'40px',width:'120px',
        fontFamily:'"Inter" ','&:hover': {
          background: '#FF6525', // Change background color on hover
        },}}>Log Out</Button>
  )
}


export default Logoutbutton