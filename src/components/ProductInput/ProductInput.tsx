/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, FloatButton, Row, Form, Input } from "antd";

import CustomInputNumber from "../CustomInputNumber/CustomInputNumber";
import { MdFormatListNumberedRtl } from "react-icons/md";

import { MinusOutlined } from "@ant-design/icons";
import CustomVarSelect from "../CustomVarSelect/CustomVarSelect";

interface ProductInputInterface {
  isFirst: boolean;
  deleteProductInput?: any;
  id: number;
  setProducts: any;
  products: any;
  isText?: boolean;
  placeholder?: string;
  Icon?: React.ReactNode;
  label?: string;
  product: any;
}

const ProductInput = ({
  isText,
  id,
  isFirst,
  deleteProductInput,
  setProducts,
  products,
  placeholder,
  Icon,
  label,
  product,
}: ProductInputInterface) => {
  const op = [
    {
      value: "القاهرة",
      label: "القاهرة",
      children: [
        {
          value: "مصر الجديدة",
          label: "مصر الجديدة",
        },
      ],
    },
    { value: "fgfgf", label: "fdfdfd" },
  ];
  const addProduct = (value: any) => {
    console.log(value);
    const newProducts = [...products];
    const filtered = newProducts.findIndex((e) => e.id === id);

    newProducts[filtered] = { ...newProducts[filtered], product: value };

    setProducts(newProducts);
  };

  return (
    <Row
      style={{
        justifyContent: "space-between",
        position: "relative",
        alignItems: "center",
      }}
    >
      <Col span={16}>
        {isText ? (
          <Form.Item
            style={{ direction: "rtl", margin: "15px 0px" }}
            hasFeedback
            validateTrigger="onBlur"
            label={label}
            name={id}
            rules={[
              { required: true, message: "لايد من ادخال اسم النوع" },
              { min: 3, message: "الاسم قصير للغاية" },
            ]}
            tooltip={"مطلوب"}
          >
            <Input
              size="large"
              value={product.value}
              placeholder={placeholder}
              prefix={Icon}
              onChange={(e) => addProduct(e.target.value)}
            />
          </Form.Item>
        ) : (
          <CustomVarSelect
            placeholder="اختر المنتج"
            label="المنتج"
            options={op}
            id={id}
            setProducts={setProducts}
            products={products}
          />
        )}
      </Col>
      <Col span={6}>
        <CustomInputNumber
          Icon={<MdFormatListNumberedRtl />}
          label="الكمية"
          placeholder="الكمية"
          setProducts={setProducts}
          products={products}
          id={id}
          product={product}
        />
      </Col>
      {!isFirst ? (
        <FloatButton
          onClick={deleteProductInput ? () => deleteProductInput(id) : () => {}}
          type="primary"
          icon={<MinusOutlined />}
          style={{
            position: "relative",
            top: "0px",
            left: "10px",
            alignSelf: "center",
          }}
          tooltip={<div>طرح منتج</div>}
        />
      ) : null}
    </Row>
  );
};
export default ProductInput;
