/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, Row, Col, FloatButton, Input } from "antd";
import { useEffect, useState } from "react";
import ProductInput from "../ProductInput/ProductInput";
import { AiOutlinePhone } from "react-icons/ai";
import { PlusOutlined } from "@ant-design/icons";

const AddProductWithType = () => {
  const [products, setProducts] = useState<any[]>([
    { product: "", quantity: 1, id: 0 },
  ]);
  const [productName, setProductName] = useState("");
  const [isFormError, setIsFormError] = useState(false);
  const addProductInput = () => {
    setProducts((state) => {
      const lastId = state.at(-1);
      if (!lastId) return [{ product: "", quantity: 1, id: 0 }];
      else {
        return [
          ...state,
          { product: "", quantity: 1, id: Number(lastId.id) + 1 },
        ];
      }
    });
  };

  useEffect(() => {
    products.map((e) => {
      if (e.product === "" || productName === "") return setIsFormError(true);
      if (e.quantity < 0 || productName === "") return setIsFormError(true);
      else return setIsFormError(false);
    });
  }, [products, productName]);

  const deleteProduct = (ind: number) => {
    const newArray = [...products];
    const filteredOne = newArray.filter((e) => e.id !== ind);

    setProducts(filteredOne);
  };
  return (
    <Form layout="vertical">
      <Form.Item
        hasFeedback
        name={"name"}
        validateTrigger="onBlur"
        label={"اسم المنتج"}
        rules={[{ required: true, message: "اسم المنتج مطلوب" }]}
        required={true}
        tooltip={"  مطلوب"}
      >
        <Input
          size="large"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder={"اسم المنتج"}
          prefix={<AiOutlinePhone />}
        />
      </Form.Item>
      {products.map((e, index) => {
        return (
          <ProductInput
            label="الاسم الفرعي"
            placeholder="اكتب اسم النوع الداخلي"
            Icon={<AiOutlinePhone />}
            setProducts={setProducts}
            product={e}
            id={e.id}
            isFirst={index === 0 && products.length === 1}
            key={index}
            isText={true}
            products={products}
            deleteProductInput={deleteProduct}
          />
        );
      })}
      <Row justify="space-between">
        <Col>
          {products.length < 10 ? (
            <FloatButton
              type="primary"
              icon={<PlusOutlined />}
              onClick={addProductInput}
              style={{
                position: "relative",
                top: "0px",
                right: "10px",
                marginTop: "20px",
              }}
              tooltip={<div>اصافة منتج</div>}
            />
          ) : null}
        </Col>
      </Row>
      <Button
        type="primary"
        disabled={isFormError}
        htmlType="submit"
        style={{ width: "100%", marginTop: "1rem" }}
      >
        إضافة المنتج
      </Button>
    </Form>
  );
};

export default AddProductWithType;
