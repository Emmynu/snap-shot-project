import React from 'react';
import ReactDOM from 'react-dom/client';
import NavigationBar from './pages/nav';
import HomePage from './pages/home';
import HomePhotoDetailedPage from './pages/home-detailed';
import ErrorHandler from './pages/error';
import  {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom"
function Main(){

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<NavigationBar/>}>
      <Route index element={<HomePage />}></Route>
      <Route path=":homePhotoId" element={<HomePhotoDetailedPage />}/>
      <Route path='*' element={<ErrorHandler/>}/>
    </Route>
  ))

  return(
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

const  root = ReactDOM.createRoot(document.querySelector("#root")).render(<Main />)