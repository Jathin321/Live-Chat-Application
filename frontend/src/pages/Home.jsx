import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Home() {

  let navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("userEmail")){
      navigate("/chat")
    }
    else{
      navigate("/signup")
    }
  }, []);

  useEffect
  return (
    <div>Home</div>
  )
}

export default Home