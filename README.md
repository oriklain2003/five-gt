# Ground Truth Data Creator for XGBoost

A full-stack web application for creating ground truth (GT) data for machine learning models, specifically designed for XGBoost training data generation.

## Features

### 🎯 Training Mode
- **Interactive Map**: Click to add points representing object paths
- **Object Selection**: Choose from Drone, Plane, Bird, or Unknown
- **Point Management**: Drag points, edit altitude/timestamp, delete points
- **Visual Path**: Connected lines showing the complete course
- **Automatic Metrics**: Distance, speed changes, direction changes, altitude changes

### 🧪 Testing Mode
- **Random Courses**: Load pre-created courses for identification practice
- **Blind Testing**: Object type is hidden, user must identify
- **Performance Tracking**: Accuracy statistics and learning progress
- **Immediate Feedback**: Instant results with correct answers

### 📊 Data Export
- **CSV Export**: Download courses.csv and points.csv files
- **Firestore Integration**: All data persisted in Google Cloud Firestore
- **Batch Operations**: Export all training data at once

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Ant Design** for UI components
- **Leaflet** with React-Leaflet for interactive maps
- **Axios** for API communication

### Backend
- **Node.js** with TypeScript
- **Express.js** web framework
- **Firebase Admin SDK** for Firestore
- **CSV Writer** for data export
- **CORS** enabled for cross-origin requests

### Database
- **Google Cloud Firestore** with the following schema:

#### Courses Collection
```
courses/
├── {courseId}/
│   ├── object_type: string
│   ├── mode: "training" | "testing"
│   ├── created_by: string
│   ├── total_distance: number (meters)
│   ├── avg_speed: number (m/s)
│   ├── total_speed_changes: number
│   ├── total_direction_changes: number
│   ├── total_altitude_changes: number (meters)
│   ├── starting_point: { lat: number, lon: number }
│   ├── ending_point: { lat: number, lon: number }
│   ├── created_at: timestamp
│   ├── updated_at: timestamp
│   └── points/ (subcollection)
│       └── {pointId}/
│           ├── point_id: string
│           ├── lat: number
│           ├── lon: number
│           ├── altitude: number (meters)
│           └── timestamp: timestamp
```

#### Testing Sessions Collection
```
testing_sessions/
└── {sessionId}/
    ├── course_id: string
    ├── selected_object_type: string
    ├── correct_object_type: string
    ├── is_correct: boolean
    └── answered_at: timestamp
```

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Google Cloud Project with Firestore enabled
- Firebase service account key (for production)

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Backend Configuration

Create a `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=development

# For development (uses Firebase emulator)
# For production, add your Firebase service account key
FIREBASE_SERVICE_ACCOUNT_KEY=

# Optional: Path to service account file
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
```

### 3. Frontend Configuration

Create a `.env` file in the `frontend` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

1. **Start the Backend**:
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

2. **Start the Frontend**:
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000`

### Production Mode

1. **Build the Backend**:
```bash
cd backend
npm run build
npm start
```

2. **Build the Frontend**:
```bash
cd frontend
npm run build
# Serve the build folder with your preferred web server
```

## API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID with points
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `GET /api/courses/random/testing` - Get random course for testing

### Points
- `GET /api/points/course/:courseId` - Get points for a course
- `POST /api/points/course/:courseId` - Add point to course
- `PUT /api/points/course/:courseId/:pointId` - Update point
- `DELETE /api/points/course/:courseId/:pointId` - Delete point

### Export
- `GET /api/export/csv` - Export courses and points as CSV
- `GET /api/export/download/:filename` - Download CSV file
- `POST /api/export/testing-session` - Submit testing result
- `GET /api/export/testing-stats` - Get testing statistics

## Usage Instructions

### Training Mode
1. Toggle to "Training Mode"
2. Select the object type (Drone, Plane, Bird, Unknown)
3. Click on the map to add points along the object's path
4. Drag points to adjust positions
5. Edit altitude and timestamp for each point
6. Click "Save Course" to store the data
7. Use "Export Data" to download CSV files

### Testing Mode
1. Toggle to "Testing Mode"
2. Study the course path displayed on the map
3. Analyze the movement patterns
4. Select what you think the object type is
5. Click "Submit Answer" to see if you're correct
6. A new random course will be loaded automatically

## CSV Export Format

### courses.csv
```
course_id,object_type,mode,total_distance,avg_speed,total_speed_changes,total_direction_changes,total_altitude_changes,starting_point_lat,starting_point_lon,ending_point_lat,ending_point_lon,created_by
```

### points.csv
```
course_id,point_id,object_type,lat,lon,altitude,timestamp
```

## Firebase Setup (Production)

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Create a service account and download the JSON key
4. Set the `FIREBASE_SERVICE_ACCOUNT_KEY` environment variable with the JSON content
5. Configure Firestore security rules as needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please create an issue in the repository or contact the development team.
