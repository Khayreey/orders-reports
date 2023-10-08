/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, InputNumber } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

interface InputInterface {
  Icon: React.ReactNode;
  label: string;
  placeholder: string;
  required?: boolean;
  id : any , 
  products : any, 
  setProducts :any, 
}
const CustomInputNumber = ({
  required = true,
  placeholder,
  Icon,
  label,
  id , 
  products , 
  setProducts 
}: InputInterface) => {

 
  const [quantity , setQuantity] = useState(1)
  useEffect(()=>{
    const newProducts = [...products] 
    const isExist = newProducts.findIndex((e)=>e.id === id) 
    if(isExist === -1) {
     return 
    }
    else {
      setQuantity(newProducts[isExist].quantity)
    }
  } , [products])
  const changeQuantity = (e : any)=>{
    
    const newProducts = [...products] 
    const isExist = newProducts.findIndex((e)=>e.id === id) 
    if(isExist === -1) {
     return 
    }
    else {
      newProducts[isExist] = {...newProducts[isExist] , quantity : e}
      setProducts(newProducts)

    }
  }
  return (
    <>
      <Form.Item
        style={{ direction: "rtl", margin: "8px 0px" }}
        hasFeedback
        label={label}
        validateTrigger="onBlur"
        required={required}
        tooltip={
          required
            ? "  مطلوب"
            : { title: "إختياري", icon: <InfoCircleOutlined /> }
        }
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder={placeholder}
          prefix={Icon}
          size="large"
          onChange={(e)=>changeQuantity(e)}
          value={quantity}
        />
      </Form.Item>
    </>
  );
};

export default CustomInputNumber;
