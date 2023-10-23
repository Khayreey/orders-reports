/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, InputNumber } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

interface InputInterface {
  Icon: React.ReactNode;
  label: string;
  placeholder: string;
  required?: boolean;
  id: any;
  products: any;
  setProducts: any;
  product: any;
}
const CustomInputNumber = ({
  required = true,
  placeholder,
  Icon,
  label,
  id,
  products,
  setProducts,
  product,
}: InputInterface) => {
  const changeQuantity = (e: any) => {
    const newProducts = [...products];
    const isExist = newProducts.findIndex((e) => e.id === id);
    if (isExist === -1) {
      return;
    } else {
      newProducts[isExist] = { ...newProducts[isExist], quantity: e };
      setProducts(newProducts);
    }
  };
  return (
    <>
      <Form.Item
        style={{ direction: "rtl", margin: "8px 0px" }}
        hasFeedback
        label={label}
        validateTrigger="onBlur"
        name={`${id}quantity`}
        rules={[{ required: true, message: "لابد من ادخال ارقام فقط" }]}
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
          onChange={(e) => changeQuantity(e)}
          value={product.quantity}
        />
      </Form.Item>
    </>
  );
};
export default CustomInputNumber;
