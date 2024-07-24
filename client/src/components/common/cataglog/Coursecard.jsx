/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
//import * as React from 'react';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
function Coursecard({ course }) {
    return (
        <Link to={`/courses/${course._id}`} className="block">
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: '130px' }}
          image={course?.image}
          title={course?.title}
        />
        <CardContent sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px',
      borderRadius: '16px',
      backgroundColor: '#F5F5F5', // Or your desired background color
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    }}>
          <Typography gutterBottom variant="h4" component="div" sx={{
        fontFamily: 'Poppins',
        fontWeight: 600,
        color: '#333',
      }}>
          {course?.title}
          </Typography>
          <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography variant="body2" sx={{
          fontFamily: 'JetBrains Mono',
          color: '#0e0c0c',
        }}>
          Rs. {course?.price}
        </Typography>
        {/* Add any additional elements here, like icons or buttons */}
      </Box>
        </CardContent>
      
      </Card>
      </Link>
  
    );
}

export default Coursecard;
    {/* <Link to={`/courses/${course._id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="relative h-64">
              <img
                  src={course?.image}
                  alt="course thumbnail"
                  className="w-full h-full object-cover"
              />
          </div>
          <div className="p-4">
              <p className="text-xl font-semibold text-richblack-5">{course?.courseName}</p>
              <p className="text-sm text-richblack-50">
                  {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>
              <p className="text-lg font-semibold text-richblack-5">Rs. {course?.price}</p>
          </div>
      </div>
  </Link> */}