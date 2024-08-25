import * as React from 'react';
import Image from '../../common/imagesComponents/Boy';
//import Navbar from '../../common/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Worldmap from '../../common/imagesComponents/Worldmap';
import CourseInfo from '../Dashboard/COURSEINFORMATION/CourseInfo';
import { useNavigate } from 'react-router-dom';


function Home() {


  return (
<div className="min-h-screen flex flex-col overflow-y-auto">
  {/* <Navbar /> */}
  <React.Fragment>
    <CssBaseline />
    <Container maxWidth="50%">
      <Box
        sx={{
          bgcolor: '#fff',
          minHeight: '400px',
          marginTop: '20px',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px',
          textAlign: { xs: 'center', md: 'left' },
          borderRadius: '10px',
          boxShadow: 'none',
        }}
      >
        <Box sx={{ flexBasis: { md: '60%',lg:'80%' }, marginBottom: { xs: '30px', md: 0 } }}>
          <p className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[36px] tracking-[0] leading-tight mb-6">
            <span className="text-gray-900 font-popo">Empower Your Future with </span>
            <span className="text-[#ff6525] font-popo" >Coding Skills</span>
          </p>
          <p className="text-gray-900 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl font-mono">
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
          </p>

        </Box>
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            flexBasis: { md: '40%' },
            '& .MuiBox-root': {
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
             
            },
           
          }}
        >
          <Image /> {/* Adjust the width and height as needed */}
        </Box>
      </Box>
    </Container>
  </React.Fragment>
  <Container maxWidth="50%"  >
  <Box
    sx={{
      bgcolor: '#fff',
      minHeight: '300px',
      marginTop: '0px',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px',
      textAlign: { xs: 'center', md: 'left' },
 
      boxShadow: 'none',
      position: 'relative', // Add position relative to the Box component
    }}
  >
 <div className="flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
  <div className="text-[#FF6525] font-popo text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[3px] text-center">
    Join The Community
  </div>
  <div className="text-gray-900 font-mono font-semibold text-lg sm:text-xl lg:text-4xl tracking-tight leading-relaxed max-w-[740px] text-center mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
  Build the community of learning together,
  and make the world joy of learning coding
 
</div>
  <div className="mt-[100px]">
    <Worldmap/>
  </div>
</div>
  </Box>
      </Container>
      <div className="container mx-auto my-6 p-6  max-w-3xl">
      <h2>Our Courses</h2> 
     
    </div>
 
</div>




    /* <div className="min-h-screen flex flex-col">
      
      <div className="flex-grow flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 lg:w-1/2 px-4 md:pl-[25px] md:pr-[50px] py-8 md:py-0">
          <p className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[36px] tracking-[0] leading-tight">
            <span className="text-black">Empower Your Future with </span>
            <span className="text-[#ff6525]">Coding Skills</span>
          </p>
          <p className="mt-4 text-black font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
          </p>
        </div>
        <div className="hidden md:block w-full md:w-1/2 lg:w-1/2">
          <div className="h-full w-full flex justify-end">
            <Image className="h-full object-cover" />
          </div>
        </div>
      </div>
    </div> */
  
      
     
  )
}

export default Home;