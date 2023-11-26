/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import PrintBills from "../../components/Bills/PrintBills";
import DispatchInterface from "../../types/DispatchInterface";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePendingOrder,
  getAllPendingOrders,
  updateOrdersToRun,
} from "../../store/orderSlice/orderSlice";
import { ColumnsType } from "antd/es/table";
import TableWrapper from "../../components/TableWrapper/TableWrapper";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Select, Typography } from "antd";
import LoadingPage from "../LoadingPage/LoadingPage";
import DeleteModal from "../../modals/DeleteModal/DeleteModal";

interface DataType {
  id: React.Key;
  name: string;
  phone: string;
  price: any;
  products: any;
  country: any;
  address: any;
}
const BillsPage = () => {
  const {
    isWaitingForRunOrders,
    isPendingOrdersRequireRender,
    pendingOrders,
    isWaitingForGetPendingOrders,
    isWaitingForDeleteOrder
  } = useSelector((state: any) => state.order);
  const dispatch: DispatchInterface = useDispatch();
  // state for mange all ships and filter them
  const [ships, setShips]: any = useState([]);
  const [selectedShip, setSelectedShip] = useState("الكل");
  const [selectedShipOrders, setSelectedShipOrders] = useState([]);

  
  // set ships when orders come to display list for each ship responsible
  //useEffect to rest select ship when ever ships change
  useEffect(() => {
    if (!pendingOrders || pendingOrders.length === 0) return;
    {
      const format = pendingOrders.map(({ ship }: any) => {
        return { label: ship.name, value: ship._id };
      });
      const uniqueSet = new Set(format.map(JSON.stringify));

      // Convert the set back to an array
      const uniqueArray = Array.from(uniqueSet).map((item) =>
        JSON.parse(item as string)
      );
      setShips(() => {
        return [{ value: "الكل", label: "الكل" }, ...uniqueArray];
      });
      setSelectedShip("الكل");
    }
  }, [pendingOrders]);

  useEffect(() => {
    dispatch(getAllPendingOrders({ url: "order/pending" }));
  }, [isPendingOrdersRequireRender, dispatch]);

  useEffect(() => {
    if (!pendingOrders) return;
    const formateOrders = pendingOrders.map(({ _id, ...state }: any) => {
      return { ...state, key: _id };
    });
    setSelectedShipOrders(formateOrders);
  }, [pendingOrders]);

  const confirmDelete = (id : string)=>{
   
    dispatch(deletePendingOrder({url : 'order'  , id : id ,
     toastMessage : 'تم جذف الطلب بنجاح'}))

  }

  const columns: ColumnsType<DataType> = [
    {
      title: "اسم العميل",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "رقم الهاتف",
      dataIndex: "",
      key: "",
      render: (e) => (
        <Typography>
          {e.anotherPhone ? `${e.phone} / ${e.anotherPhone} ` : `${e.phone} `}
        </Typography>
      ),
    },
    {
      title: "سعر الطلب",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "المحافظة",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "العنوان",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "الاجرائات",
      dataIndex: "",
      key: "x",
      render: (e : any) => (
        <a>
          <DeleteOutlined onClick={()=> DeleteModal(`"طلب مازال معلق"`, isWaitingForDeleteOrder ,()=>confirmDelete(e.key))}
          />
        </a>
      ),
    },
  ];
  // handle change ship to dispalay just his order
  const changeShipHandler = (e: any) => {
    setSelectedShip(e);
    if (e === "الكل") {
      const formateOrders = pendingOrders.map(({ _id, ...state }: any) => {
        return { ...state, key: _id };
      });
      setSelectedShipOrders(formateOrders);
    } else {
      const shipOrdersFromPending = pendingOrders.filter(
        (order: { ship: { _id: any } }) => order.ship?._id == e
      );
      const formateOrders = shipOrdersFromPending.map(
        ({ _id, ...state }: any) => {
          return { ...state, key: _id };
        }
      );
      setSelectedShipOrders(formateOrders);
    }
  };

  const runOrdersHandler = () => {
    const ids =
      pendingOrders &&
      pendingOrders.map(({ _id }: any) => {
        return _id;
      });

    dispatch(
      updateOrdersToRun({
        toastMessage:
          "تم تغير حالة الطلبات لقيد التشغيل يمكنك الان المتابعة مع مسئولي الشحن",
        data: { orders: ids },

        url: "/order/run",
      })
    );
  };
  return (
    <>
      {isWaitingForRunOrders ? <LoadingPage /> : null}

      {pendingOrders && pendingOrders.length > 0 ? (
        <div
          style={{
            margin: "5px 0px",
            display: "flex",
            width: "100%",
            gap: "4px",
          }}
        >
          <Select
            defaultValue="الكل"
            style={{ width: 200 }}
            options={ships}
            value={selectedShip}
            onChange={(e) => changeShipHandler(e)}
          />
          <PrintBills data={selectedShipOrders} />

          <Button
            onClick={runOrdersHandler}
            style={{ marginInlineStart: "auto" }}
            type="link"
          >
            تشغيل طلبات
          </Button>
        </div>
      ) : null}

      <TableWrapper
        keyTerm="pending"
        key={"pending"}
        loading={isWaitingForGetPendingOrders}
        title="جميع الطلبات المعلقة"
        columns={columns}
        data={selectedShipOrders}
      />
    </>
  );
};
export default BillsPage;
