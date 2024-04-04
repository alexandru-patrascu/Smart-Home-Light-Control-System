# Smart Home Control System

Welcome to the Smart Home Control System! This system allows users to control various smart home devices remotely through a web interface.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **Remote Control**: Users can remotely control smart home devices from anywhere with an internet connection.

<img width="1728" alt="Screenshot 2024-04-04 at 16 44 23" src="https://github.com/alexandru-patrascu/Smart-Home-Light-Control-System/assets/54136057/51b53427-e371-4d07-9be9-d9092252663e">

- **Users Management**: Administrators can manage users, roles within the system.

<img width="1728" alt="Screenshot 2024-04-04 at 16 13 46" src="https://github.com/alexandru-patrascu/Smart-Home-Light-Control-System/assets/54136057/0797f31a-42a2-4af5-a8e0-36c9879e99eb">

- **Device Management**: Add, remove, and configure smart home devices easily through the interface.

<img width="1728" alt="Screenshot 2024-04-04 at 16 16 34" src="https://github.com/alexandru-patrascu/Smart-Home-Light-Control-System/assets/54136057/001544f0-4869-4a50-9cd0-65b55f83b156">

- **Room Management**: Users can organize devices into rooms for easier management and control.

<img width="1728" alt="Screenshot 2024-04-04 at 16 16 39" src="https://github.com/alexandru-patrascu/Smart-Home-Light-Control-System/assets/54136057/f2320446-d492-4dc3-ac21-98c7c787cfb3">

- **Scenes Management**: Users can create and manage scenes, allowing them to control multiple devices simultaneously with a single command.

<img width="1728" alt="Screenshot 2024-04-04 at 16 16 49" src="https://github.com/alexandru-patrascu/Smart-Home-Light-Control-System/assets/54136057/eba47f5e-6663-4c06-bd3d-e72ee95019b2">

- **Customizable Settings**: Users can customize settings for individual devices and create Scenes.
- **Security**: Secure authentication and authorization mechanisms to ensure only authorized users can access the system.
- **Responsive Interface**: The user interface is responsive and works seamlessly across different devices and screen sizes.

<img width="952" alt="Screenshot 2024-04-04 at 16 17 56" src="https://github.com/alexandru-patrascu/Smart-Home-Light-Control-System/assets/54136057/54680204-d434-44a5-8315-e74feee2e9f3">

## Technologies Used

- **Frontend**:
  - React
  - HTML5/CSS3
  - Typescript
  - React Context (for state management)
  - Material-UI (for UI components)
- **Backend**:
  - Node.js
  - Typescript
  - Express.js
  - MongoDB (for database storage)
  - Rest APIs

## Installation

1. Clone the repository:

```bash
git clone https://github.com/alexandru-patrascu/Smart-Home-Light-Control-System.git
```

2. Navigate to the project directory:

```bash
cd Smart-Home-Light-Control-System
```

3. Install Dependencies

```bash
cd client && npm i
cd ..
```

```bash
cd server npm i
cd ..
```

4. Create .env file for client and paste:
```bash
REACT_APP_API_URL = http://localhost:3001
```

5. Create .env file for server and paste:
```bash
PORT = 3001
JWT_SECRET = randomString
MONGO_URI = mongodb://localhost:27017/smart-home-system
```

6. You will need to have mongoDB installed and running

7. Start the client

```bash
cd client && npm start
```

8. Start the server (will need a new terminal)

```bash
cd server && npm run dev
```

## Usage

1. The client will run on `localhost:3000` while the server will run on `localhost:3001`
2. Open your web browser and navigate to the URL where the frontend server is running.
3. Login using

```bash
username: admin
password: Password123!
```

4. Explore the dashboard to view and control your smart home devices.
5. Customize settings, add new devices, rooms, users, or create scenes as needed.
