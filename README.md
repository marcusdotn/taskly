![taskly image](https://github.com/marcusdotn/taskly/blob/master/image.png?raw=true)

# Taskly

Taskly is my attempt at making a to-do list mobile application using React, Capacitor and PocketBase as my tools. It's mostly just a prototype for me to learn more about cross-platform development and use of BaaS.

Taskly features

- Creating, updating and deleting tasks, which are organized by day
- A simple, pretty design
- Authentication
- Back-end configurable via PocketBase's sleek interface

As of right now, there is no official server for Taskly and curious developers will need to host it themselves, which I've made simple by adding an automatic docker server script.

## Usage

### Installation

#### Required dependencies

- **[bun](https://bun.sh)**

#### Instructions

- Clone the repository

  ```bash
  git clone https://github.com/marcusdotn/taskly.git
  ```

- Enter the directory

  ```bash
  cd taskly
  ```

- Install dependencies

  ```bash
  bun i
  ```

- Build the application

  ```bash
  bun run build
  ```

- Start the development server

  - This will set up a temporary development server for you to experiment with.

  ```bash
  bun run server
  ```

- Run the application locally **(recommended)**

  ```bash
  bun run local
  ```

- Run the application on your Android device
  
  - **You might also need to configure API_HOST in config.ts**

  ```bash
  bun run android
  ```
