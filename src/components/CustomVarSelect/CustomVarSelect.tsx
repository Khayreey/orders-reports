/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cascader, Divider, Form } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { yupSync } from "../../validationSchema/AddOrderSchema";



interface InputInterface {
  
  options :  any[] ,
  label: string;
  placeholder: string;
  required?: boolean;
  setProducts : any
  id : number , 
  products : any , 
  value : any
}
const CustomVarSelect = ({
  required = true,
  placeholder,
  label,
  options , 
  setProducts , 
  id , 
  products , 
  value
  
}: InputInterface) => {
 
  const addProduct = (value : any)=>{
    const newProducts = [...products] 
    const isExist = newProducts.findIndex((e)=>e.id === id) 
    if(isExist === -1) {
      setProducts((state: any)=>{
        return [...state , {value , id , quantity : 1}]
      })
    }
    else {
      newProducts[isExist] = {value , id , quantity : 1}
      setProducts(newProducts)
    }
    
    
 
  }
  
    const dropdownRender = (menus: React.ReactNode) => (
        <div >
          {menus}
          <Divider style={{ margin: 0 }} />
        
        </div>
      );

    
  return (
    <>
      <Form.Item
        style={{ direction: "rtl", margin: "8px 0px" }}
        hasFeedback
        label={label}
      
       
       
        validateTrigger="onBlur"
       
        rules={[yupSync]}
       
        tooltip={
          required
            ? "  مطلوب"
            : { title: "إختياري", icon: <InfoCircleOutlined /> }
        }
      >
        <Cascader 
        style={{width : '100%'}} size="large" options={options} dropdownRender={dropdownRender}
         placeholder={placeholder} 
         onChange={(e)=>addProduct(e)}
         value={value}
         />
      </Form.Item>
    </>
  );
};
export default CustomVarSelect;