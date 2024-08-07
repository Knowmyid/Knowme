import React from 'react';
import MainContent from './MainContent';
import DataRetrieve from './DataRetrieve';
import AadhaarUpload from './AadharUpload';
import HomePage from '../pages/homePage';


import {createBrowserRouter,RouterProvider} from "react-router-dom";

const Body = () => {
    const appRouter= createBrowserRouter([
        {path:"/",
        element:<HomePage/>,
        children:[
          {
            path:"/data",
            element:<DataRetrieve/>
          },
        {
          path:"/upload",
          element:<AadhaarUpload/>
        },
        {
          path:"/",
          element:<MainContent/>
        }]
        }
    ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
