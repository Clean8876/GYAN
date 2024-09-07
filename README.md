# Gyan - Ed-Tech Platform

**Gyan** is a fully functional educational platform that enables users to create, consume, and rate educational content. Built using the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS), the platform allows seamless management and delivery of educational resources, empowering users to share and access learning materials with ease.

## Features
- **Create Educational Content**: Users can create and upload educational courses with descriptions, lessons, and thumbnails.
- **Consume Educational Content**: Browse and enroll in courses to learn new skills, watch videos, and read educational materials.
- **Rate and Review**: Users can rate courses and leave feedback to help others choose the best content.
- **Cloudinary Integration**: Course content and thumbnails are uploaded and stored securely using Cloudinary.
  
## Tech Stack
- **MongoDB**: NoSQL database to store user data, course details, and ratings.
- **ExpressJS**: Backend framework for routing, API creation, and server-side logic.
- **ReactJS**: Frontend framework for building a dynamic and responsive user interface.
- **NodeJS**: JavaScript runtime used for backend operations and managing requests.
- **Cloudinary**: For storing and managing course images and media files.

## Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14.x or higher)
- **MongoDB** (local or cloud-based)
- **Cloudinary account** for media uploads

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Clean8876/GYAN.git
   cd gyan
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd client
   npm install  # Install ReactJS dependencies

   cd ../server
   npm install  # Install ExpressJS, MongoDB, and NodeJS dependencies
   ```

3. Configure environment variables:
   - Create a `.env` file in the root of the server directory and add the following:
     ```bash
     MONGO_URI=your_mongodb_connection_string
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

4. Start the development server:
   - Backend (Express):
     ```bash
     cd server
     npm start
     ```
   - Frontend (React):
     ```bash
     cd client
     npm start
     ```

5. Open your browser and go to `http://localhost:3000` to view the platform.

## File Structure
```
gyan-edtech-platform/
├── client/                    # ReactJS frontend
│   ├── public/                # Static assets
│   ├── src/                   # Main React components and pages
│   └── package.json           # Frontend dependencies
├── server/                    # NodeJS backend
│   ├── models/                # MongoDB models (User, Course, Rating)
│   ├── routes/                # API routes (Courses, Users, Ratings)
│   ├── controllers/           # Controllers for handling requests
│   └── server.js              # Express server setup
├── .env                       # Environment variables (not shared publicly)
├── package.json               # Backend dependencies
└── README.md                  # Project documentation
```

## Key Features
- **User Authentication**: Secure sign-up and login functionality with JWT-based authentication.
- **Course Management**: Create, edit, and delete courses as a content creator.
- **Rating System**: Rate and review courses to share feedback with other learners.
- **Cloudinary Integration**: Upload and manage media files (course thumbnails and content) using Cloudinary.
  
## Future Enhancements
- **Live Streaming**: Enable live classes for real-time interaction between educators and learners.
- **Payment Integration**: Integrate a payment gateway for paid courses and premium content.
- **Advanced Search and Filtering**: Improve content discovery with filters based on categories, ratings, and popularity.

## Contributing
If you'd like to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to contribute, report issues, or suggest features!
