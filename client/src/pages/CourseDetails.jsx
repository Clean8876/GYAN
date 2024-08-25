import  { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
//import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@mui/material"
import { MdOutlineRateReview } from 'react-icons/md'
//import ConfirmationModal from "../components/common/ConfirmationModal"
import {formatDate} from '../services/FormateDate.jsx'
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { styled } from '@mui/system';
//import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
//import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
//import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseApi"
import {buyCourse} from "../services/operations/PaymentApi"

//mport GetAvgRating from "../utils/avgRating"
//import Error from "./Error"

const StyledAccordion = styled(Accordion)(() => ({
    marginBottom:  '16px', // Default spacing if theme.spacing is undefined
    borderRadius:  '4px', // Default borderRadius if theme.shape is undefined
    boxShadow:  '0px 3px 1px -2px rgba(0,0,0,0.2)', // Default shadow if theme.shadows is undefined
    '&:before': {
        display: 'none',
    },
    '&.Mui-expanded': {
        margin: 'auto',
    },
}));

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  backgroundColor: '#F5F5F5',
  color: '#333333',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
  '&.Mui-expanded': {
    minHeight: '48px',
  },
  '& .MuiAccordionSummary-content.Mui-expanded': {
    margin: '12px 0',
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  backgroundColor: '#F9F9F9',
  padding: '20px',
  border: '1px solid #E0E0E0', // Light grey border
}));
function CourseDetails() {
  const user = useSelector((state) => state.profile?.user);
  useEffect(() => {
    console.log('Profile slice of state:');
    console.log('User object:', user);
  }, [user]);
  useEffect(() => {
    console.log('User ID:', user?._id);
  }, [user]);
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting courseId from url parameter
  const { courseId } = useParams()
const[response,setResponse] = useState(null)
const [confirmationModal, setConfirmationModal] = useState(null)
  // of the user buyed the course it will show go to course
  const handleBuyCourse = () => {
    if (token) {
      console.log("Buy button clicked");
      console.log('Token:', token);
    console.log('User:', user);
    buyCourse(token, [course_id], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

useEffect(() => {
  const fetchData = async () => {
    const res = await fetchCourseDetails(courseId);
    setResponse(res);
    console.log("Fetched course details:", res?.data);
  };
  fetchData();
}, [courseId]);
 // Total number of lectures which is looped from the conetent of the course
 const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
 useEffect(() => {
  let lectures = 0;
  response?.data?.courseContent?.forEach((sec) => {
    lectures += sec.subSection?.length || 0;
  });
  setTotalNoOfLectures(lectures);
}, [response]);

if (loading || !response) {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="spinner"></div>
    </div>
  );
}
 if (!response.success) {
   console.log("noting found")
 }
 const {
  _id: course_id,
  title,
  description,
  image,
  price,
  courseContent,
  instructor,
  students,
  createdAt,
} = response.data;





if (paymentLoading) {

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center overflow-y-auto">
      <div className="spinner"></div>
    </div>
  )
}



  return (
<>

<div className="container mx-auto my-12 px-4 py-8 bg-white rounded-lg shadow-md overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        {/* Course Details (75%) */}
        <div className="md:col-span-3">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-sans">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6 font-mono">
            {description}
          </p>

          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-8">
            {/* Course Information */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
                </svg>
                <span>
                  Course Price: Rs{" "}
                  <span className="font-semibold">{price}</span>
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="font-mono">
                  Students enrolled:{" "}
                  <span className="font-semibold">{students.length}</span>
                </span>
              </div>
            </div>

            {/* Instructor & Language */}
            <div className="flex flex-col space-y-2">
              <p className="font-mono">
                Created By {`${instructor.firstName} ${instructor.lastName}`}
              </p>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Thumbnail & Buttons (25%) */}
        <div className="md:col-span-1 relative">
          <img
            src={image}
            alt="course thumbnail"
            className="w-full h-auto rounded-md shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
          />

          <div className="absolute inset-x-4 bottom-4 flex flex-col space-y-3">
            {/* Buy Button */}
           
            <Button variant="contained"  sx={{ background:'#FF763D', borderRadius:'3px', textAlign:'center',
        color:'white',height:'40px',width:'100%',
        fontFamily:'"Poppins" ','&:hover': {
          background: '#FF6525', // Change background color on hover
        },}}onClick={handleBuyCourse} >BUY</Button>
            {/* Add to Cart Button */}
           
            <Button variant="outlined"  sx={{ background: '#FFF',
        textAlign: 'center',
        color: 'black',
        height: '40px',
        width: '100%',
        fontFamily: 'Poppins',
        fontWeight: '600',
        borderRadius:'3px',
        borderColor:'white',
        '&:hover': {
          
          borderColor: '#FF6525', // Orange border color on hover
          boxShadow: 'none', // Remove default box shadow on hover
        },
        '&:focus': {
          
          borderColor: '#FF6525', // Orange border color when focused
          boxShadow: 'none', // Remove default box shadow when focused
        },}}>Add To Cart</Button>
          </div>
        </div>
      </div>
     
    </div>
    <div className="container mx-auto my-[7px] px-4 py-[7px] bg-white rounded-lg ">
     <Box sx={{ width: '100%', maxWidth: '800px', margin: '0' }}>
      <p className="text-[28px] font-semibold font-popo">Course Content</p>
      <div className="flex gap-2">
                  <span className="font-mono">
                    {courseContent?.length} {`section(s)`}
                  </span>
                  <span className="font-mono">
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                 
                </div>
            {courseContent.map((section) => (
                <StyledAccordion key={section._id}>
                    <StyledAccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
                        aria-controls={`panel-${section._id}-content`}
                        id={`panel-${section._id}-header`}
                    >
                        <Typography variant="h6">{section.sectionName}</Typography>
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>
                        <List>
                            {section.subSection.map((subSection) => (
                                <ListItem key={subSection._id}>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'semibold', fontFamily:'JetBrains Mono'}}>{subSection.title}</Typography>
                                        
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </StyledAccordionDetails>
                </StyledAccordion>
            ))}
        </Box>
               {/* Author Details */}
               <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold font-popo">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg font-mono">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              
            </div></div>
 </>
   
  )
}

export default CourseDetails