## Articles App

Articles app build in react (front-end) and nodejs (back-end).

## Installation

1. Clone the repository
2. Go to backend folder `cd backend`
3. Run `npm install` to install the backend dependencies
4. Run `npm start` to start the development server

   > _Optional: To populate with mock data, use the following endpoints:_

   - `http://localhost:8001/api/mock/load-users`
   - `http://localhost:8001/api/mock/load-articles`

5. Go to backend folder `cd ../frontend`
6. Run `npm install` to install the frontend dependencies
7. Run `npm start` to start the development server

## Usage

- Create an account using the signup form
  > _If the database are populated with mock data, you can use the following accounts:_
  - username: `admin` password: `123`
  - username: `demo` password: `123`
- Login with your account
- In main main, you are able to see the published articles and can mark has favorite or remove them using the heart icon
- In `My Bookmarks` you can see your favorites articles and can remove from the list using the heart icons
- Inside `My Articles` you can create, update or delete your articles and add or remove your favorites
- `My Account` allow user see your info (username, role, how many articles are published or drafted, and how many favorites they have)
- If the user role is `Administrator`, he can see the `Admin`page. In this page he can get the users list, change their role and/or delete them

## Technologies Used

- React
- Nodejs
