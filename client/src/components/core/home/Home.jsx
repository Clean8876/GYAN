import * as React from 'react';
import Image from '../../common/imagesComponents/Boy';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Worldmap from '../../common/imagesComponents/Worldmap';
import Footer from '../../common/Footer';
import CTAButton from "./Button";

function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-y-auto">
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
            <Box sx={{ flexBasis: { md: '60%', lg: '80%' }, marginBottom: { xs: '30px', md: 0 } }}>
              <p className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[36px] tracking-[0] leading-tight mb-6">
                <span className="text-gray-900 font-popo">Empower Your Future with </span>
                <span className="text-[#ff6525] font-popo">Coding Skills</span>
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
              {<Image />}
            </Box>
          </Box>
        </Container>
      </React.Fragment>
      <Container maxWidth="50%">
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
            position: 'relative',
          }}
        >
          <div className="flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="text-[#FF6525] font-popo text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[3px] text-center">
              Join The Community
            </div>
            <div className="text-gray-900 font-mono font-semibold text-lg sm:text-xl lg:text-4xl tracking-tight leading-relaxed max-w-[740px] text-center mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
              Build the community of learning together, and make the world joy of learning coding
            </div>
            <div className="mt-[100px]">
             <Worldmap />
            </div>
          </div>
        </Box>
      </Container>
      <div className='bg-pure-greys-5 text-gray-700'>
        <div className='homepage_bg h-[310px]'>
          <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
            <div className='h-[150px]'></div>
            <div className='flex flex-row gap-7 text-gray'>
              <CTAButton active={true} linkto={"/signup"}>
                <div className='flex items-center gap-3'>
                  Explore Full Catalog
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div>
                  Learn more
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
          <div className='flex flex-col lg:flex-row gap-5 mb-10 mt-[95px]'>
            <div className='text-3xl lg:text-4xl font-semibold w-full lg:w-[45%]'>
              Get the Skills you need for a
            </div>
            <div className='flex flex-col gap-10 w-full lg:w-[40%] items-start'>
              <div className='text-[16px]'>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>
                  Learn more
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
