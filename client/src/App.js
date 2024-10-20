// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Header from './components/Header/Header';
// import Login from './components/Login/Login';
// import Register from './components/Register/Register';
// import { AuthProvider, useAuth } from './components/Auth/Auth';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           {/* <Route path="/home" element={ <ProtectedRoute> <Header /> </ProtectedRoute> } /> */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/home" element={<Header />} />
//             {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//           </Route>
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { AuthProvider } from './components/Auth/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import LoginRedirect from './components/Login/LoginRedirect';
import AuctionForm from './components/Auction/AuctionForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <LoginRedirect>
                <Login />
              </LoginRedirect>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/home" element={<Header />} />
            <Route path="/auctions" element={<AuctionForm />} /> */}
            <Route path="/home" element={<Header />}>
              {/* Nested routes for /home */}
              <Route path="auctions" element={<AuctionForm />} />
              {/* You can add more routes here */}
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
