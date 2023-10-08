/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ProductInput from "../ProductInput/ProductInput";
import { Button, Col, FloatButton, Form, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MainContainer from "../../Containers/MainContainer/MainContainer";
const AddNewWareHouse = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [productArray, setProductArray] = useState([{ product: "" }]);
  const addProductInput = () => {
    setProductArray((state) => {
      return [...state, { product: "" }];
    });
  };

  const deleteProduct = (ind: number) => {
    const newArray = [...productArray];
    const filteredArray = newArray
      .slice(0, ind)
      .concat(newArray.slice(ind + 1));
    setProductArray(filteredArray);
  };
  return (
    <MainContainer title="اضافة منتجات للمحزن" isCollapse={true}>
      <Form layout="vertical">
        {productArray.map((_, index) => {
          return (
            <ProductInput
              setProducts={setProducts}
              id={index}
              isFirst={index === 0 && productArray.length === 1}
              key={index}
              products={products}
              deleteProductInput={deleteProduct}
            />
          );
        })}
        <Row justify="space-between">
          <Col>
            {productArray.length < 10 ? (
              <FloatButton
                type="primary"
                icon={<PlusOutlined />}
                onClick={addProductInput}
                style={{
                  position: "relative",
                  top: "0px",
                  right: "10px",
                }}
                tooltip={<div>اصافة منتج</div>}
              />
            ) : null}
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", marginTop: "1rem" }}
        >
          اضافة للمخزن
        </Button>
      </Form>
    </MainContainer>
  );
};

export default AddNewWareHouse;
