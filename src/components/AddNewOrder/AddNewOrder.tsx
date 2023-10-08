/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Button, FloatButton, Form } from "antd";
import CustomInput from "../CustomInput/CustomInput";
import { Formik } from "formik";
import addOrderSchema, { yupSync } from "../../validationSchema/AddOrderSchema";
import { AiOutlineUser, AiOutlinePhone, AiOutlinePound } from "react-icons/ai";
import ProductInput from "../ProductInput/ProductInput";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import CustomSelect from "../CustomSelect/CustomSelect";
import countryptions from "../../data/countryData";
import CustomVarSelectFormik from "../CustomVarSelectFormik/CustomVarSelectFormik";
import CustomInputNumberFormik from "../CustomInputNumberFormik/CustomInputNumberFormik";
import MainContainer from "../../Containers/MainContainer/MainContainer";

const AddNewOrder = () => {
  const [productArray, setProductArray] = useState([{ product: "" }]);
  const [products, setProducts] = useState<any[]>([]);

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
    <MainContainer title="اضافة طلب جديد" isCollapse={true}>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          phoneT: "",
          address: "",
          city: undefined,
          details: "",
          price: "",
          ship: undefined,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={addOrderSchema}
      >
        {({ handleSubmit }) => {
          return (
            <Form onSubmitCapture={handleSubmit} layout="vertical">
              <CustomInput
                Icon={<AiOutlineUser />}
                label="الاسم"
                name="name"
                placeholder="اسم العميل"
                validation={yupSync}
              />
              <CustomInput
                Icon={<AiOutlinePhone />}
                label="الهاتف"
                name="phone"
                placeholder="رقم الهاتف"
                validation={yupSync}
              />
              <CustomInput
                Icon={<AiOutlinePhone />}
                required={false}
                label="هاتف بديل"
                name="phoneT"
                placeholder="رقم هاتف بديل"
                validation={yupSync}
              />
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
              <CustomVarSelectFormik
                placeholder="اختر المحافظة والمركز"
                label="المحافظة/المركز"
                options={countryptions}
                name="city"
              />
              <CustomInput
                Icon={<AiOutlinePhone />}
                isTextArea={true}
                label="العنوان التفصيلي"
                placeholder="قم بكتابة العنوان التفصيلي "
                name="address"
                validation={yupSync}
              />
              <CustomSelect
                Icon={<AiOutlinePhone />}
                options={[{ value: "mmm", label: "fdfd" }]}
                label="مسئول الشحن"
                placeholder="قم باختيار مسئول الشحن"
                name="ship"
              />
              <CustomInputNumberFormik
                Icon={<AiOutlinePound />}
                label="سعر الطلب"
                placeholder="ادحل اجمال السعر"
                name="price"
                validation={yupSync}
              />
              <CustomInput
                Icon={<AiOutlinePhone />}
                isTextArea={true}
                label="العنوان التفصيلي"
                placeholder="قم بكتابة العنوان التفصيلي "
                name="details"
                required={false}
                validation={yupSync}
              />
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                سجل الطلب
              </Button>
            </Form>
          );
        }}
      </Formik>
    </MainContainer>
  );
};

export default AddNewOrder;
