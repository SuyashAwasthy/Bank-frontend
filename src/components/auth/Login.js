import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const Login = () => {
    const [usernameOrEmail, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(usernameOrEmail)
        console.log(password)
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                "usernameOrEmail":usernameOrEmail,
                "password":password
               
            }
        );

            
            const token = response.data['accessToken']
            
            if (token) {
                localStorage.setItem('token', token);
                
                
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken.roles;

                if (userRole === 'ROLE_ADMIN') {
                    navigate('/admin');
                } else if (userRole === 'ROLE_USER') {
                    navigate('/admin');
                } else {
                    setError('Unrecognized role');
                }
            } else {
                setError('Token is undefined. Please check the login process.');
            }
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={usernameOrEmail}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

// import React, { useState } from 'react';
// import { login, verifyAdmin } from '../services/authService';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Login.css';
// import RegisterModal from './RegisterModal';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     try {
//       const token = await login(email, password);
//       if (token) {
//         localStorage.setItem('token', token); // Store token in local storage

//         const isAdmin = await verifyAdmin(); // Ensure `verifyAdmin` uses the token
//         if (isAdmin) {
//           navigate('/admin/dashboard');
//         } else {
//           navigate('/user/dashboard');
//         }
//       } else {
//         setError('Invalid credentials. Please try again.');
//       }
//     } catch (e) {
//       console.error(e);
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 login-container">
//       <div className="card p-4 shadow-lg" style={{ width: '35rem', borderRadius: '15px' }}>
//         <div className="row no-gutters">
//           <div className="col-md-6">
//             <div className="login-image"></div>
//           </div>
//           <div className="col-md-6">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-4">Login</h2>
//               {error && <div className="alert alert-danger text-center">{error}</div>}
//               <form onSubmit={handleLogin}>
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary btn-block mt-3 login-btn">
//                   Login
//                 </button>
//               </form>
//               <div className="text-center mt-3">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setShowRegisterModal(true)}
//                 >
//                   Register
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <RegisterModal
//         show={showRegisterModal}
//         handleClose={() => setShowRegisterModal(false)}
//       />
//     </div>
//   );
// };

// export default Login;