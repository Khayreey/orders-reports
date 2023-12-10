/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import DispatchInterface from "../../types/DispatchInterface";
import { useDispatch, useSelector } from "react-redux";
import { getAllRunningOrders } from "../../store/orderSlice/orderSlice";
import TableWrapper from "../../components/TableWrapper/TableWrapper";
import { Typography } from "antd";
import LoadingPage from "../LoadingPage/LoadingPage";
import FormatDate from "../../helpers/FormatDate/FormatDate";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";

const RunningOrders = () => {
  const {
    isWaitingForRunOrders,
    isPendingOrdersRequireRender,
    runningOrders,
    isWaitingForGetPendingOrders,
  } = useSelector((state: any) => state.order);
  const dispatch: DispatchInterface = useDispatch();

  const {token} = useSelector((state : any)=>state.auth)

  useEffect(() => {
    dispatch(getAllRunningOrders({ url: "order/running" , token }));
  }, [isPendingOrdersRequireRender, dispatch]);

  const columns: any = [
    {
      title: "رقم الطلب",
      dataIndex: "id",
      key: "id",
      search: true,
    },
    {
      title: "اسم العميل",
      dataIndex: "name",
      key: "name",
      search: true,
    },
    {
      title: "رقم الهاتف",
      dataIndex: "",
      key: "",
      render: (e: any) => (
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
      title: "وقت الكتابة",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (e: any) => FormatDate(e),
    },
    {
      title: "وقت التشغيل",
      dataIndex: "updates",
      key: "updates",
      render: (e: any) => {
        const time = e && e.filter((e: any) => e.info === "تم التشغيل");
        console.log(time);
        if (time) {
          const lastUpdate = time.pop();

          if (lastUpdate) {
            return FormatDate(lastUpdate.timestamp);
          } else return "---";
        }
      },
    },
    {
      title: "المحافظة",
      dataIndex: "country",
      key: "country",
      search: true,
    },
    {
      title: "العنوان",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "الاجرائات",
      dataIndex: "",
      key: "",
      render: (e: any) => (
        <Link to={`/orders/${e.id}`}>
          <EyeOutlined />
        </Link>
      ),
    },
  ];

  return (
    <>
      {isWaitingForRunOrders ? <LoadingPage /> : null}
      <TableWrapper
        keyTerm="shipOrders"
        key={"shipOrders"}
        loading={isWaitingForGetPendingOrders}
        title="جميع الطلبات قيد التشغيل"
        columns={columns}
        data={runningOrders}
      />
    </>
  );
};
export default RunningOrders;
