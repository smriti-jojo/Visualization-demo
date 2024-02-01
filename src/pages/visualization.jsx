import React from 'react';
import logo from "../assets/smartifai.png";
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../component/Loader/Loader';
import instance from '../instance';
import Graph from '../component/Graph';

const Visualization = () => {
  const [labels,setlabels]=useState([]);
  const [datasets,setdatasets]=useState([]);
  const [open,setopen]=useState(false);
  const [url,seturl]=useState("");
  const [summaryDesc,setsummaryDesc]=useState("");
  const [desc,setDesc]=useState("");
  const [alert,setAlert]=useState(false);
  const [dialog,setDialog]=useState(false);
  const [buttonOpen,setButtonOpen]=useState(false);

  // useEffect(()=>{
  //   if(alert===true){
  //     GraphData();
  //   }
    
  // },[alert])


  const CreateProfile=async()=>{
    setopen(true);
    setButtonOpen(true);
    const key="chrexec_e98b9d61aa2d00eb4f3b2c166450ddf4";
    const id=url;
    // console.log("---data----");
    const res= await instance({
      url:`v1/user-profile/create?apikey=${key}&id=${id}`,
      method:'POST',
  })
  // console.log("data",res.data);
  const data1=res.data;
  if(data1?.results){
    // console.log("success");
    // add a dialog box for 1st time registration
      //  setDialog(true);
     setTimeout(async() => {
      //  setAlert(true);
      // setopen(true);
       await GraphData();
   }, 60000);
  //  setAlert(true);
//  await GraphData();
     
  }
  else{
    // console.log("---render---");
    setopen(true);
    GraphData();
  }
  }

  
  const GraphData=async()=>{
    // setopen(true);
  const key="chrexec_e98b9d61aa2d00eb4f3b2c166450ddf4";
  const id=url;
  const persona="sales";
    try{
    const res= await instance({
        url:`v1/user-profile?apikey=${key}&id=${id}&persona=${persona}`,
        method:'GET',
    })
    // console.log("GraphData",res.data.results);
    const results=res?.data?.results;
    // console.log("Summary",results.personality_analysis.summary);
    const Summary=results.personality_analysis.summary;
    const parameters=results.personality_analysis.ocean_assessment;
  //  console.log("KEYS",Object.keys(parameters));
   let dataset=[];
   for(let obj in parameters){
    // console.log("item",parameters[obj].score *10);
    dataset.push(parameters[obj].score *10);
   
   }
  //  console.log("dataset",dataset);
// const dataset=[20,50,10,3,30];
   setdatasets(dataset);
   setsummaryDesc(Summary.disc.description);
   setDesc(Summary.ocean.description);
   const labels1=Object.keys(parameters);
   setlabels(labels1);
   setButtonOpen(false);
   
  }
  catch(error){
    // console.log("error",error.response.data);
    setopen(false);
   
  }
}



  return (
    <div className='max-h-screen w-full'>
      <div className='flex justify-center'>
        <div className='flex-col '>
        <div><img  src={logo} alt='logo' className='w-[55%]'/></div> 
        <div className='text-blue-400 text-xl font-bold '> Contextual AI-Demo<div/></div>
    </div>
        </div>
        <div className='flex flex-col lg:flex-row mx-[10%]  mt-[3%]'>
          <div className='flex w-full'><div className='flex justify-center lg:mx-[5%]  text-blue-400 font-bold text-md lg:text-xl'>Enter the url :</div>
            <div><TextField variant='outlined' aria-label='url' size='small' className='!w-full lg:!w-[700px]' onChange={(e)=>seturl(e.target.value)}></TextField></div>
          </div> <div className='mx-0 lg:mx-5 flex justify-center mt-[5%] lg:mt-0'><Button variant='contained' className={buttonOpen?'!bg-yellow-400':' !bg-blue-600' }onClick={CreateProfile}>{buttonOpen?"Loading...":"Analyze"}</Button></div> 
            </div>
            <div className='flex mx-[15%] mt-[2%] '>
            {open? <div className='w-full '>
              {datasets.length===0 ?<Loader/>:<div className='flex flex-col lg:flex-row lg:justify-around'> <div className='w-[60vh]'><Graph datasets={datasets} labels={labels} /></div><div className='flex-col px-[5%] my-[5%] py-5 border-2 border-[#FFCA4B] rounded-lg'><div className=''><h1 className='font-bold text-lg text-gray-600 '> Profile Summary</h1>{summaryDesc.map((item)=><div className='text-md text-green-600'><li>{item}</li></div>)}</div><div className='mt-[5%]'><h1 className='font-bold text-lg text-gray-600'>Profile Description</h1>{desc.map((item)=><div className='text-blue-600'><li>{item}</li></div>)}</div></div></div>}
            </div>:<div></div>}
            </div>
           
    </div>
  )
}

export default Visualization
