# Professional Recruitment Software

A full-stack web application built with **React** and **Django** designed for professional recruitment. This application integrates with **RapidAPI** to provide additional functionality, utilizes **prop drilling** in React for state management, and is backed by **PostgreSQL** as the database. It follows industry standards for development and deployment.

## Features

- **React Frontend**: Modern React.js frontend, using functional components and hooks.
- **Django Backend**: Django API with **Django REST Framework (DRF)** for handling requests and responses.
- **RapidAPI Integration**: Uses external APIs through **RapidAPI** for additional functionality (e.g., job search, candidate profiles).
- **Prop Drilling**: Manages state through prop drilling in React components.
- **PostgreSQL Database**: Robust and scalable SQL database to store user and job-related data.

## Tech Stack

- **Frontend**: 
  - React.js
  - HTML5, CSS3, JavaScript
  - Axios (for API requests)
  - Prop drilling for state management

- **Backend**:
  - Django (Python)
  - Django REST Framework (DRF)
  - PostgreSQL for data persistence

- **External Services**:
  - RapidAPI for integration with various APIs (e.g., compiler api's)

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (for React.js) [Install here](https://nodejs.org/)
- **Python 3.x** (for Django) [Install here](https://www.python.org/downloads/)
- **PostgreSQL** [Install here](https://www.postgresql.org/download/)
- **pip** (Python package manager)
- **virtualenv** (for Python environment)

### Setting Up Backend (Django)

1. Clone the repository:

    ```bash
    git clone https://github.com/ZainabRafaqat/professional-recruitment-application.git
    cd professional-recruitment-application/backend
    ```

2. Create and activate a virtual environment:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

4. Set up your PostgreSQL database:
   - Make sure you have PostgreSQL running.
   - Create a new database and update `settings.py` to use your database credentials.

5. Apply migrations:

    ```bash
    python manage.py migrate
    ```

6. Create a superuser (optional, for admin access):

    ```bash
    python manage.py createsuperuser
    ```

7. Start the Django server:

    ```bash
    python manage.py runserver
    ```

   The backend should now be running on `http://localhost:8000`.

---

### Setting Up Frontend (React)

1. Navigate to the frontend folder:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

