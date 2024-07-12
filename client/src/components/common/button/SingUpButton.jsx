import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function SingUpButton() {
  const navigate = useNavigate()
  const handelSubmit = ()=>{
    navigate('/signup')
  }
  return (
    <Button variant="contained" onClick={handelSubmit} sx={{ background:'#FF763D', borderRadius:'20px', textAlign:'center',
        color:'white',height:'40px',width:'120px',
        fontFamily:'"Inter" ','&:hover': {
          background: '#FF6525', // Change background color on hover
        },}}>Sign up</Button>
  )
}


export default SingUpButton