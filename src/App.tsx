import './App.css'
import Navbar from "./components/Navbar.tsx";
import HomePage from "./components/HomePage.tsx";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import MealPage from "./components/MealPage.tsx";
import {Fragment} from "react";
import TypePage from "./components/TypePage.tsx";
import {MetadataType} from "./utils/filterData.ts";
import {homeRoute} from "./utils/routesData.ts";

function App() {
  return (
      <>
          <Router>
              <Fragment>
                  <Navbar/>
                  <Routes>
                      <Route path="/" element={<Navigate to={homeRoute}/>}/>
                      <Route path={homeRoute} element={<HomePage />} />
                      <Route path="/meals/:id" element={<MealPage />}/>
                      <Route path="/meals/category/:category" element={<TypePage type={MetadataType.CATEGORY}/>}/>
                      <Route path="/meals/country/:country" element={<TypePage type={MetadataType.COUNTRY}/>}/>
                  </Routes>
              </Fragment>
          </Router>
      </>
  )
}

export default App
