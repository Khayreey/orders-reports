/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useRef } from "react";

import { useReactToPrint } from "react-to-print";
import Bills from "./Bills";
import { Button } from "antd";

import {PrinterOutlined } from '@ant-design/icons'
import SheetBills from "./SheetBills";
interface PrintBillsInterface {
  data : any
}
export default function PrintBills({data} : PrintBillsInterface) {
  
  const componentRef = useRef<HTMLDivElement>(null);
  
  const sheetRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 

  const handlePrintSheets = useReactToPrint({
    content: () => sheetRef.current,
  });
// 

  return (
    <>
         {data && data.length > 0 ? 
         <>
     <SheetBills ref={sheetRef} data={data}/> 
     <Bills ref={componentRef} data={data}/>
     <Button onClick={handlePrint} icon={<PrinterOutlined />} >طباعة البوالص</Button>
     <Button onClick={handlePrintSheets} icon={<PrinterOutlined />} >طباعة شيت الشحن</Button>
     </>
     : 
     null 
    }
     
    </>
  );
}
