import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
export function LogInButton() {
  const navigate = useNavigate()
  const handleSubmision = ()=>{
    navigate('/login')
  }

  return (
    <Button variant="outlined" sx={{ background: '#FFF',
        textAlign: 'center',
        color: 'black',
        height: '40px',
        width: '120px',
        fontFamily: 'Inter',
        fontWeight: '600',
        borderRadius:'20px',
        borderColor:'white',
        '&:hover': {
          
          borderColor: '#FF6525', // Orange border color on hover
          boxShadow: 'none', // Remove default box shadow on hover
        },
        '&:focus': {
          
          borderColor: '#FF6525', // Orange border color when focused
          boxShadow: 'none', // Remove default box shadow when focused
        },}} onClick={handleSubmision}>Log In</Button>
  )
  
}

export default LogInButton