/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
import { useField } from "formik";
import { InfoCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

interface InputInterface {
  name: string;
  Icon?: React.ReactNode;
  label: string;
  placeholder: string;
  required?: boolean;
  isTextArea?: boolean;
  validation :  {
    validator({ field }: any, value: string): Promise<void>;
} 
}
const CustomInput = ({
  isTextArea,
  required = true,
  placeholder,
  name,
  Icon,
  label,
  validation
}: InputInterface) => {
  const [field, meta] = useField(name);

  return (
    <Form.Item
      hasFeedback
      label={label}
      {...field}
      name={name}
      validateTrigger="onBlur"
      {...meta}
      rules={!required && meta.value ==='' ? [] : [validation]}
      required={required}
      tooltip={
        required
          ? "  مطلوب"
          : { title: "إختياري", icon: <InfoCircleOutlined /> }
      }
    >
      {isTextArea ? (
        <TextArea size="large" rows={2} placeholder={placeholder} />
      ) : (
        <Input size="large" placeholder={placeholder} prefix={Icon} />
      )}
    </Form.Item>
  );
};

export default CustomInput;
