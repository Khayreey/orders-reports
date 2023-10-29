/* eslint-disable @typescript-eslint/no-explicit-any */
import { FloatButton, Form, Input, InputNumber, List } from "antd";
import ExpandProductItem from "../ExpandProductItem/ExpandProductItem";
import { AiOutlineCheck } from "react-icons/ai";
import { useEffect,  useRef,  useState } from "react";
import { useDispatch } from "react-redux";
import DispatchInterface from "../../types/DispatchInterface";
import {
  deleteProductType,
  updateProduct,
} from "../../store/productSlice/productSlice";

import { FormInstance } from "antd";
import ClearForm from "../../helpers/ClearForm/ClearForm";

interface ExpandProductListInterface {
  product: any;
}
const ExpandProductList = ({ product }: ExpandProductListInterface) => {
  
  const  formRef = useRef<FormInstance<any>>(null);
  const dispatch: DispatchInterface = useDispatch();
  const [typeName, setTypeName] = useState(product.name);
  const [addedQuantity, setAddedQuantity] = useState("");
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  
  useEffect(() => {
    if (
      typeName !== product.name ||
      addedQuantity !== "" ||
      Number(addedQuantity) !== 0
    ) {
      setIsUpdateOpen(true);
    } else {
      setIsUpdateOpen(false);
    }
    if (Number(addedQuantity) + product.quantity < 0) {
      setIsUpdateOpen(false);
    }
  }, [typeName, addedQuantity, product]);

  const changeQuantityHandler = (e: string | null) => {
    if (e !== null) setAddedQuantity(e);
  };

  const confirmDelete = (id: any) => {
    // delete function
    dispatch(
      deleteProductType({
        url: `product/remove/${product.key}`,
        data: { typeId: id },
        toastMessage: "تم حذف النوع بنجاح",
      })
    );
  };
  
  const updateProductNameOrQuantity = () => {
    setAddedQuantity('')
    ClearForm(formRef)
    dispatch(
      updateProduct({
        data: { name: typeName, totalQuantity: addedQuantity },
        url: `product/${product.key}`,
        toastMessage: "تم تعديل المنتج بنجاح",
      })
    );
  };

  return (
    <>
      <Form ref={formRef}
        layout="vertical"
        style={{ display: "flex", justifyContent: "flex-start", gap: "20px" }}
      >
        <Form.Item
          hasFeedback
          label="اسم المنتج"
          name={"treter"}
          validateTrigger="onBlur"
          rules={[{ required: true, message: "اسم النوع مطلوب" }]}
          tooltip={"  مطلوب"}
        >
          <Input
            placeholder="اسم النوع"
            onChange={(e) => setTypeName(e.target.value)}
            value={typeName}
            defaultValue={typeName}
          />
        </Form.Item>

        <Form.Item hasFeedback label="الكمية المتاحة">
          <InputNumber value={product.quantity} disabled readOnly={true} />
        </Form.Item>

        {product.type.length === 0 ? (
          <>
            <Form.Item
             
              hasFeedback
              label="تزويد الكمية"
              validateTrigger="onChange"
              name="vcvcv "
              rules={[
                {
                  validator: async () => {
                    if (Number(addedQuantity) === 0) {
                      return Promise.reject(new Error("ادخل عدد صالح"));
                    }
                    if (Number(addedQuantity) + product.quantity < 0) {
                      return Promise.reject(new Error("الكمية غير متاحة"));
                    }
                  },
                },
              ]}
            >
              <InputNumber
                placeholder="الكمية "
                value={addedQuantity}
                onChange={(e) => changeQuantityHandler(e)}
              />
            </Form.Item>
            {isUpdateOpen ? (
              <FloatButton
                type="primary"
                onClick={updateProductNameOrQuantity}
                icon={<AiOutlineCheck style={{ color: "white" }} />}
                style={{
                  position: "relative",
                  top: "0px",
                  left: "10px",
                  alignSelf: "center",
                  boxShadow: "none",
                }}
                tooltip={<div>تأكيد</div>}
              />
            ) : null}
          </>
        ) : null}
      </Form>
      {product.type.length > 0 ? (
        <>
          <h3>الانواع الداخلية</h3>
          <List
            bordered
            dataSource={product.type}
            renderItem={(e, index) => (
              <ExpandProductItem
                confirmDelete={confirmDelete}
                key={index}
                type={e}
                productId = {product.key}
              />
            )}
          />
        </>
      ) : null}
    </>
  );
};
export default ExpandProductList;
