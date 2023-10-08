import {  Form, Button } from "antd";
import { Formik } from "formik";
import CustomInput from "../CustomInput/CustomInput";
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import MainContainer from "../../Containers/MainContainer/MainContainer";
import addShipSchema, { yupSync } from "../../validationSchema/addShipSchema";
const AddNewShip = () => {
  return (
    <MainContainer title="اضافة مسئول شحن" isCollapse={true}>
        <Formik
          initialValues={{
            name: "",
            phone: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={addShipSchema}
        >
          {({ handleSubmit }) => {
            return (
              <Form layout="vertical" onSubmitCapture={handleSubmit}>
                <CustomInput
                  Icon={<AiOutlineUser />}
                  label="الاسم"
                  name="name"
                  placeholder="اسم مسئول الشحن"
                  validation={yupSync}
                />
                <CustomInput
                  Icon={<AiOutlinePhone />}
                  label="الهاتف"
                  name="phone"
                  placeholder="رقم الهاتف"
                  validation={yupSync}
                />

                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", marginTop: "1rem" }}
                >
                  سجل مسئول الشحن
                </Button>
              </Form>
            );
          }}
        </Formik>
        </MainContainer>
  );
};

export default AddNewShip;
