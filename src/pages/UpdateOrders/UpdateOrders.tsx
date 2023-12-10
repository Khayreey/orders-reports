/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Input, Form, Cascader, Button } from "antd";
import { statusUpdateData } from "../../data/statusData";
import { updateOrders } from "../../store/orderSlice/orderSlice";
import { useDispatch , useSelector} from "react-redux";
import DispatchInterface from "../../types/DispatchInterface";
const { TextArea } = Input;

const UpdateOrders = () => {
  
  const {token} = useSelector((state : any)=>state.auth)
  
  const {isWaitingForUpdateManyOrders} = useSelector((state:any)=>state.order)
  const [orders, setOrders] = useState("");
  const [state, setState] = useState(undefined);
  const [notes, setNotes] = useState("");
  const [ids, setIds] = useState([""]);
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch: DispatchInterface = useDispatch();
  const handleTextAreaChange = (e: any) => {
    const textareaValue = e.target.value;
    setOrders(textareaValue);
    const ordersArray = textareaValue.split("\n");
    setIds(ordersArray);
  };
  // useEffect to check is form valid or note
  useEffect(() => {
    if (orders == "" || !state) {
      setIsFormValid(false);
      return;
    }
    if (state && ids.length > 0 && orders !== "") {
      setIsFormValid(true);
    }
  }, [orders, state, ids.length]);

  const updateHandler = () => {
    if (notes !== "") {
      dispatch(
        updateOrders({
          url: "order/updateMany",
          toastMessage: "تم تعديل الطلبات بنجاح",
          data: {
            orders: ids,
            status: state ? state[0] : "" ,
            notes,
          },
          clearForm: () => {
            setNotes("");
            setOrders("");
            setIsFormValid(false);
          },
          token
        })
      );
    } else {
      dispatch(
        updateOrders({
          url: "order/updateMany",
          toastMessage: "تم تعديل الطلبات بنجاح",
          data: {
            orders: ids,
            status : state ? state[0] : ""
          },
          clearForm: () => {
            setOrders("");
            setIsFormValid(false);
          },
          token
        })
      );
    }
  };
  return (
    <Form
      layout="vertical"
      style={{ marginTop: "20px" }}
      onSubmitCapture={updateHandler}
    >
      <Form.Item label="أرقام الطلبات" required>
        <TextArea
          style={{ width: "30%" }}
          value={orders}
          onChange={(e) => handleTextAreaChange(e)}
          placeholder="اكتب ارقام الطلبات علي انا يكون كل رقم في سطر"
          autoSize={{ minRows: 5 }}
        />
      </Form.Item>

      <Form.Item
        style={{ direction: "rtl", margin: "20px 0px" }}
        label="الحالة"
        required
      >
        <Cascader
          style={{ width: "100%" }}
          size="large"
          options={statusUpdateData}
          value={state}
          onChange={(e : any) => setState(e)}
          placeholder="اختر الحالة المراد التحويل لها"
        />
      </Form.Item>

      <Form.Item label="ملاحظات" required>
        <TextArea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="ملاحظات علي هذه الطلبات"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>
      <Button
        disabled={!isFormValid || isWaitingForUpdateManyOrders}
        loading={isWaitingForUpdateManyOrders}
        type="primary"
        htmlType="submit"
        style={{ width: "100%" }}
      >
        تأكيد التعديل
      </Button>
    </Form>
  );
};

export default UpdateOrders;
