
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from "react"
//import { toast } from "react-hot-toast"
//import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../services/operations/authApi"
import Tab from '../components/common/Tab';
import { ACCOUNT_TYPE } from '../utils/constants';
import { setSignUp } from '../slices/AuthSlice';


function Signup() {
     // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const navigate = useNavigate()
  const dispatch = useDispatch()



  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

 /*  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false) */
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords Do Not Match");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };

    // Dispatch signup data to the state
    dispatch(setSignUp(signupData));
    // Send OTP to the user
    dispatch(sendOtp(formData.email, navigate));

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };
      const tabData = [
        {
          id: 1,
          tabName: "Student",
          type: ACCOUNT_TYPE.STUDENT,
        },
        {
          id: 2,
          tabName: "Instructor",
          type: ACCOUNT_TYPE.INSTRUCTOR,
        },
      ]
  return (
   
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#FF6525' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Tab tabData={tabData} field={accountType} setField={setAccountType} />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleOnSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            value={formData.firstName}
              onChange={handleOnChange}
            sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6525',
                  },
                },
                
              '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                  color: '#000000',
                },
              },
              }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={formData.lastName}
              onChange={handleOnChange}
            sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6525',
                  },
                },
                
              '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                  color: '#000000',
                },
              },
              }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
              onChange={handleOnChange}
            sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6525',
                  },
                },
                
              '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                  color: '#000000',
                },
              },
              }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
              onChange={handleOnChange}
            sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6525',
                  },
                },
                
              '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                  color: '#000000',
                },
              },
              }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
              onChange={handleOnChange}
            sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6525',
                  },
                },
                
              '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                  color: '#000000',
                },
              },
              }}
          />
        </Grid>
    
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,bgcolor:'#FF763D','&:hover': {
                background: '#FF6525', 
              }}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
   
  )
}

export default Signup