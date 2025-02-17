# Setup Guide for ChatbotPro

This guide provides detailed instructions for setting up the ChatbotPro project locally. Follow the steps below to get the project up and running on your machine.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 18 or higher)
- **npm** (Node Package Manager)
- **Docker** (optional, for containerized setup)
- **PostgreSQL** (for the database)

## Step 1: Clone the Repository

Clone the repository to your local machine using the following command:

```sh
git clone https://github.com/swaparup36/ai-bot-dcc-assignment.git
cd chatbot-dcc
```

## Step 2: Install Dependencies

Install the project dependencies using npm:

```sh
npm install
```

## Step 3: Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```sh
cp .env.example .env
```

## Step 4: Run Database Migrations

Run the Prisma migrations to set up the database schema:

```sh
npx prisma migrate dev --name init
```

## Step 5: Start the Application Locally

Start the development server:

```sh
npm run dev
```

The application should now be running on `http://localhost:3000`.

## Running the Project with Docker

If you prefer to run the project using Docker, follow these steps:

### Step 1: Build the Docker Image

Build the Docker image using the following command:

```sh
docker build -t chatbot-dcc .
```

### Step 2: Run the Docker Container

Run the Docker container:

```sh
docker run -p 3000:3000 chatbot-dcc
```

The application should now be running on `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.