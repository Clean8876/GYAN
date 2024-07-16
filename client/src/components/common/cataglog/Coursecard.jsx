/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
//import * as React from 'react';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Coursecard({ course }) {
    return (
        <Link to={`/courses/${course._id}`} className="block">
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: '130px' }}
          image={course?.image}
          title={course?.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
          {course?.title}
          </Typography>
          <Typography variant="body3" color="text.secondary">
          Rs. {course?.price}
          </Typography>
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