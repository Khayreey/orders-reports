/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useRef } from "react";

import { useReactToPrint } from "react-to-print";
import Bills from "./Bills";
import { Button } from "antd";


export default function PrintBills() {
  const componentRef = useRef<any>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 

// 

  return (
    <>
      <Bills ref={componentRef} />
      <Button onClick={handlePrint}>Print</Button>
       {/* {aa.map(()=>{
        return <BillOfLading ref={componentRef}/>
       })}
       <Button onClick={handlePrint}>Print</Button> */}
    </>
  );
}
