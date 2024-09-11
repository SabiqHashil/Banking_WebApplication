# Banking Application

A MERN stack banking application featuring user registration, login, transaction management, and an admin dashboard. Users can view their account details and manage transactions, while admins can oversee user accounts and application details.

## Project Description

This application allows users to:

- Register and log in
- View their dashboard
- Add and withdraw money

Admins can:

- Log in to the admin dashboard
- Manage user accounts

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Setup and Installation

### Prerequisites

- Node.js (>=14.x)
- MongoDB

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SabiqHashil/Banking_WebApplication.git
   ```

2. **Navigate to the backend directory:**

   ```bash
   cd ../client
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env` file in the backend directory with the following content:**

   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5174
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend development server:**

   ```bash
   npm start
   ```

4. **Open your browser and go to `http://localhost:5173` to view the application.**

## Working Steps

1. **Register a new user:**

   - Navigate to the registration page and complete the form.

2. **Log in as a user:**

   - Use the user login page to access the dashboard.

3. **Manage transactions:**
   - Use the Add and Withdraw buttons on the user dashboard to manage your account transactions.

## Admin Login

To log in as an admin:

1. **Navigate to `http://localhost:5173/admin/login`.**

2. **Enter the following credentials:**

   - **Phone Number:** `1234567890`
   - **Password:** `admin`

3. **Access the admin dashboard to manage user accounts and view application details.**
