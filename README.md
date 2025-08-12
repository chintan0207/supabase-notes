📒 Notes App (Expo + Supabase)
A clean and mobile-friendly Notes app built with React Native (Expo) and Supabase.
Easily create, edit, delete, and view your notes — all synced instantly with Supabase.

🚀 Setup & Install
Clone the repo

sh
Copy
Edit
git clone https://github.com/your-username/notes-app.git
cd notes-app
Install dependencies

sh
Copy
Edit
npm install
or

sh
Copy
Edit
yarn install
Create a Supabase project at https://supabase.com

Add a table called notes with columns:

id (UUID, Primary key, default uuid_generate_v4())

title (Text)

content (Text)

created_at (Timestamp, default now())

Add your Supabase credentials
Create a file:

arduino
Copy
Edit
config/supabase.js
js
Copy
Edit
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_KEY = 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
▶ Running the App
Start the Expo dev server

sh
Copy
Edit
npx expo start
Scan the QR code with the Expo Go app on your phone.

✨ Features
📜 List all notes in a clean layout

➕ Add new notes instantly synced with Supabase

✏ Edit existing notes

🗑 Delete notes with a single tap

⚡ Real-time updates (Supabase magic)

📱 Mobile-friendly UI with smooth styling

📂 Folder Structure
bash
Copy
Edit
/components   → Reusable UI components
/screens      → App screens (Home, Add, Edit, View)
 /services    → Supabase queries & helpers
/config       → Supabase client setup
App.js        → App entry point
💡 Tech Stack
React Native (Expo)

Supabase

React Navigation
