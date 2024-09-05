"use client"
import axios from 'axios';
import React, { useState } from 'react';


const Example = () => {
const[state, setState] = useState()
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
    .then((res)=>{
        console.log(res.data);
        setState(res.data)
    })
    .catch((error)=>{
        console.error(error);
    })
  return (
    <div>
      <h1>Example</h1>
      <ul>
        {state?.map((item)=>{
            return (<>
            <p>{item?.title}</p>
            </>)
        })}
      </ul>
    </div>
  );
};

export default Example;
