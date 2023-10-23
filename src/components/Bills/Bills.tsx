/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {  Carousel } from 'antd';
import {GrNext , GrPrevious} from 'react-icons/gr'
import BillOfLading from '../BillOfLading/BillOfLading';



const Bills  = React.forwardRef((_ , ref) => 
{
    const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
 return (
  <>
    <Carousel  afterChange={onChange} arrows={true} dots={false} nextArrow={<GrNext />} prevArrow={<GrPrevious />}>
      <div style={{display : 'block'}} ref={ref}>
          <BillOfLading />
          <BillOfLading />
          <BillOfLading />
          <BillOfLading />
      </div>
     
    </Carousel>
    
    </>  
 )
} )

export default Bills;