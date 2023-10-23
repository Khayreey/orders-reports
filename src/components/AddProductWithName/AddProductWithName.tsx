import { Button, Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { FaLuggageCart } from "react-icons/fa";
const AddProductWithName = () => {
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [isFormError, setIsFormError] = useState(false);
  useEffect(() => {
    if (productQuantity === "" || productName === "") {
      setIsFormError(true);
      return;
    } else {
      setIsFormError(false);
    }
  }, [productQuantity, productName]);

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
          prefix={<FaLuggageCart />}
        />
      </Form.Item>
      <Form.Item
        style={{ direction: "rtl", margin: "8px 0px" }}
        hasFeedback
        label="الكمية"
        validateTrigger="onBlur"
        name="quantity"
        rules={[{ required: true, message: "لابد من ادخال ارقام فقط" }]}
        tooltip={"مطلوب"}
      >
        <InputNumber
          style={{ width: "100%" , margin : '8px 0px' }}
          placeholder="كمية المنتج"
          prefix={<MdFormatListNumberedRtl />}
          size="large"
          onChange={(e) => setProductQuantity(e || "")}
          value={productQuantity}
        />
      </Form.Item>
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
export default AddProductWithName;
