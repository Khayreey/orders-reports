/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, FloatButton, Row } from "antd";


import CustomInputNumber from "../CustomInputNumber/CustomInputNumber";
import { MdFormatListNumberedRtl } from "react-icons/md";


import { MinusOutlined } from "@ant-design/icons";
import CustomVarSelect from "../CustomVarSelect/CustomVarSelect";

interface ProductInputInterface {
  isFirst : boolean , 
  deleteProductInput? : (ind : number)=> void , 
  id : number , 
  setProducts : any , 
  products : any
}

const ProductInput = ({id , isFirst , deleteProductInput , setProducts , products} : ProductInputInterface) => {
  

  const op = [{
    value: 'القاهرة',
    label: 'القاهرة',
    children: [
      {
        value: 'مصر الجديدة',
        label: 'مصر الجديدة',
       
      }]} , { value : 'fgfgf' , label : 'fdfdfd'} ]

  return (
    <Row style={{ justifyContent: "space-between", position: "relative" , alignItems : 'center'}}>
      <Col span={16}>
        <CustomVarSelect 
          placeholder="اختر المنتج"
          label="المنتج"
          options={op}
          id={id}
          setProducts={setProducts}
          products={products}
        />
      </Col>
      <Col span={6}>
        <CustomInputNumber
          Icon={<MdFormatListNumberedRtl />}
          label="الكمية"
          placeholder="الكمية"
          setProducts={setProducts}
          products={products}
          id={id}
        />
      </Col>
     {!isFirst 
     ?
     <FloatButton
          onClick={ deleteProductInput ? ()=>deleteProductInput(id) : ()=>{}}
          type="primary"
          icon={<MinusOutlined />}
          style={{
            position: "relative",
            top: "0px",
            left: "10px",
            alignSelf : 'center'
          }}
          tooltip={<div>طرح منتج</div>}
        />
     :
     null
     }
        
      
    </Row>
  );
};
export default ProductInput;
