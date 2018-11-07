import React from "react";
import Header from "./header.js"

function Page(props){
  return(
    <div className="page-main-grid">
    <Header/>
    <div className="page-content">
    {props.children}
    </div>
    <div className="footer-1"/>
    </div>
  )
}

export default Page
