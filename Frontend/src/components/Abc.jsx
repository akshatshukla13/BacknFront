import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Abc() {

    const logedin = useSelector((state) => state.vis.logedin);
    const uname = useSelector((state) => state.vis.username);
    const navigate = useNavigate()


    useEffect(() => {
      
        navigate('/'+uname)
        
    }, [uname])
    

  return (
    <div>
      hii
    </div>
  )
}

export default Abc
