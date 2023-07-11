import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/main/home';
import HomePhotoDetailedPage from './pages/main/photo-detailed';
import ErrorHandler from './pages/loading&error/error';
import HomeVideoDetailedPage from './pages/main/play-video';
import NavigationBar from './pages/navs/nav';
import  { createBrowserRouter,createRoutesFromElements,Outlet,Route,RouterProvider } from "react-router-dom"
import UploadFiles from './pages/upload/upload';
function Main(){

  const router = createBrowserRouter(createRoutesFromElements(
   <>
    <Route path='/' element={<NavigationBar/>}>
      <Route index element={<HomePage />}></Route>
      <Route path=":homePhotoId" element={<HomePhotoDetailedPage />}/>
      <Route path='video/:videoId' element={<HomeVideoDetailedPage />}/> 
      <Route path='upload' element={<UploadFiles /> }/>
    </Route>
    <Route path='*' element={<h2>404 PAGE GO BACK TO HOME OLODO</h2>}/>
   </>
  ))

  return(
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

const  root = ReactDOM.createRoot(document.querySelector("#root")).render(<Main />)