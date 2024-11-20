import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

function UserLayout({ children }) {
  return (
   <>
   <Header/>
   <div style={{minHeight: "65vh"}}>
    {children}
   </div>
 
    <Footer/>
   </>
  )
}

export default UserLayout