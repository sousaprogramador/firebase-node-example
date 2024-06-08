# User Management Microservice with Firebase and Express

This project is a microservice for user management built with Firebase Realtime Database, Express, and TypeScript. It follows Domain-Driven Design (DDD) principles to ensure a clean architecture and maintainability.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Endpoints](#endpoints)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, Read, Update, and Delete (CRUD) operations for users
- Password encryption
- Unique email validation
- Error handling
- Clean architecture with Domain-Driven Design (DDD)

## Architecture

This project uses the hexagonal architecture (also known as ports and adapters) to decouple the business logic from external dependencies, such as Firebase and Express. The main layers are:

- **Domain**: Contains the core business logic and domain models
- **Application**: Contains use cases that orchestrate domain logic
- **Infrastructure**: Contains external dependencies and implementations, such as Firebase services
- **Adapters**: Contains adapters for external frameworks and libraries, such as Express controllers

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- Firebase CLI
- TypeScript

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. Install dependencies:

   ```sh
   cd functions
   npm install
   ```

3. Set up Firebase:

   ```sh
   firebase login
   firebase init functions
   ```

### Compilation

Compile the TypeScript code:

```sh
npm run build
```
