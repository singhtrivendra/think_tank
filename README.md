# Think Tank - A Smart Content Organizer

## Introduction

In the modern digital age, information is spread across various platforms like Twitter, YouTube, and Google Docs. While we save links, they often get buried in bookmarks, notes, or countless tabs. **Think Tank** offers a smart, centralized solution for managing knowledge efficiently.
## Key Features

- **Unified Content Collection**
  - Save links from Twitter, YouTube, Google Docs, and more.
  - Automatically extract metadata, thumbnails, and key insights for each saved resource.

- **Visual Organization with Card-Based UI**
  - Easily navigate and manage saved content.
  
- **Privacy & Offline Access**
  - Users can self-host their instance to keep control over their data.
  - Support for offline access to previously fetched content.

## Tech Stack

- **Frontend:** React (TypeScript) + TailwindCSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/singhtrivendra/think_tank
cd Think Tank
```

### 2. Configure URLs
#### **Backend Setup**
Modify the **CORS middleware** in `backend/index.ts` to set the correct frontend URL:
```ts
app.use(cors({
    origin:  // add your frontend url here 
    credentials: true,
}));
```

#### **Frontend Setup**
Update the **backend URL** in `frontend/config.ts`:
```ts
export const Backend_URL = "/api";
```

### 3. Install Dependencies
#### **think_front**
```sh
cd think_front
npm install
```

#### **thinktank_backend**
```sh
cd thinktank_backend
npm install
```

### 4. Set Up Environment Variables
Create a `.env` file in the `backend` directory based on `.env.example` and set the required values:
```
JWT_SECRET=
MongoUrl=
```

### 5. Run the Project
#### **think_front**
```sh
npm run dev
```

#### **Backend**
```sh
npm run dev
```

## Contributing
Feel free to submit issues or open pull requests to improve **Think Tank**!
