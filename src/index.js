import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/main/home';
import HomePhotoDetailedPage from './pages/main/photo-detailed';
import HomeVideoDetailedPage from './pages/main/play-video';
import NavigationBar from './pages/navs/nav';
import  { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom"
import UploadFiles from './pages/upload/upload';
import CreateUser from './pages/auth/signup-page';
import Login from './pages/auth/login-page';
import UploadedFiles from './pages/upload/recent-uploads';
import UserCollections from './pages/collection/collections';
import PageNotFound from './pages/loading&error/page-not-found';

function Main(){

  const router = createBrowserRouter(createRoutesFromElements(
   <>
    <Route path='*' element={<PageNotFound />}/>
    <Route path='/' element={<NavigationBar/>}>
      <Route index element={<HomePage />}></Route>
      <Route path=":homePhotoId" element={<HomePhotoDetailedPage />}/>
      <Route path='video/:videoId' element={<HomeVideoDetailedPage />}/> 
      <Route path='profile' element={<PageNotFound />}/>
      <Route path='upload' element={<UploadFiles /> }/>
      <Route path='myupload' element={<UploadedFiles />}/>
      <Route path='collections' element={<UserCollections />}/>
      <Route path='signup' element={<CreateUser/>}/>
      <Route path='login' element={<Login />}/>
    </Route>
   </>
  ))

  return(
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

const  root = ReactDOM.createRoot(document.querySelector("#root")).render(<Main />)