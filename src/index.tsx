import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Providers } from './lib/Provider';
import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import AuthGurad from './components/AuthGurad';
import Setting from './pages/Setting';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const LayOut=()=>{
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

const router=createBrowserRouter([
  {
    path:'/',
    element:<LayOut />,
    children:[
      {
        path:'/',
        element:<App />
      },
      {
        path:'sign-up',
        element:<SignUp />
      },{
        path:'sign-in',
        element:<SignIn />
      },
      {
        path:'/user/settings',
        element:<Setting />
      }
    ]
  }
])
root.render(
  <Providers>
      <AuthProvider>
        <AuthGurad>
          <RouterProvider router={router}/>
          <ToastContainer />
        </AuthGurad>
      </AuthProvider>
  </Providers>
);

