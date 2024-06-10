# Reverse Proxy Management Dashboard

This project is a web application built with Next.js and Chakra UI to manage reverse proxy configurations. It includes features like importing CSV files to create reverse proxy IPs, aliases, server groups, web services, and inbound rules.

## Table of Contents

- [Dependencies](#dependencies)
- [Installation](#installation)
  - [Windows](#windows)
  - [Linux](#linux)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)

## Dependencies

The project relies on the following dependencies:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Axios](https://axios-http.com/)
- [PapaParse](https://www.papaparse.com/)
- [next-auth](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

## Installation

### Windows

1. **Install Node.js and npm**

   Download and install Node.js from the [official website](https://nodejs.org/). npm is included with Node.js.

2. **Clone the repository**


3. Install dependencies
- npm install
- npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
- npm install axios
- npm install papaparse
- npm install next-auth
- npm install tailwindcss postcss autoprefixer
- npx tailwindcss init -p
- npm install cors
- npm install http-proxy-middleware

4. Run the application
- npm run dev 

## Linux (Ubuntu)

1. **Install Node.js and npm**

- curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
- sudo apt-get install -y nodejs

For other distributions, refer to the https://nodejs.org/

2. Clone the repository


3. Install dependencies

- npm install
- npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
- npm install axios
- npm install papaparse
- npm install next-auth
- npm install tailwindcss postcss autoprefixer
- npx tailwindcss init -p
- npm install cors
- npm install http-proxy-middleware

4. Run the application
- npm run dev
