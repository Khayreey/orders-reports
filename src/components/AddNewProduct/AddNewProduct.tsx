import { Form, Button } from "antd";
import { Formik } from "formik";
import CustomInput from "../CustomInput/CustomInput";
import { AiOutlineUser } from "react-icons/ai";
import MainContainer from "../../Containers/MainContainer/MainContainer";
import addProductSchema, { yupSync } from "../../validationSchema/addProductSchema";
const AddNewProduct = () => {
  return (
    <MainContainer title="اضافة منتج جديد">
      <Formik
        initialValues={{
          name: "",
          subName: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={addProductSchema}
      >
        {({ handleSubmit }) => {
          return (
            <Form layout="vertical" onSubmitCapture={handleSubmit}>
              <CustomInput
                Icon={<AiOutlineUser />}
                label="الاسم"
                name="name"
                placeholder="اسم المنتج"
                validation={yupSync}
              />
              <CustomInput
                Icon={<AiOutlineUser />}
                label="الاسم الفرعي"
                name="subName"
                placeholder="هل المنتج يحتوي علي نوع داخلي ؟"
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

export default AddNewProduct;
