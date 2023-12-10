/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DispatchInterface from "../../types/DispatchInterface";
import { getSingleShip } from "../../store/shipSlice/shipSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../LoadingPage/LoadingPage";
import TableWrapper from "../../components/TableWrapper/TableWrapper";
import { Select, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const statusOptions = [
  { value: "الكل", label: "الكل" },
  { value: "معلق", label: "معلق" },
  { value: "قيد التشغيل", label: "قيد التشغيل" },
];
const SingleShip = () => {
  const { id } = useParams();
  const dispatch: DispatchInterface = useDispatch();


  const {permissions} = useSelector((state : any)=> state.auth)

  const {token} = useSelector((state : any)=>state.auth)

  const [selectedShipOrders, setSelectedShipOrders] = useState([]);

  const { isWaitingForGetShip, ship } = useSelector((state: any) => state.ship);
  const { isPendingOrdersRequireRender } = useSelector(
    (state: any) => state.order
  );
  const [selectedStatus, setSelectedStatus] = useState("الكل");

  useEffect(() => {
    dispatch(getSingleShip({ url: `ship/`, id: id , token}));
  }, [isPendingOrdersRequireRender, dispatch ,id]);

  useEffect(() => {
    if (!ship || !ship.orders || ship.orders.length === 0) return;
    setSelectedStatus("الكل");
   
    setSelectedShipOrders(ship.orders);
  }, [ship]);

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
    },
    {
      title: "رقم الهاتف",
      dataIndex: "",
      key: "",
      render: (e: any ) => (
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
      title: "الحالة",
      dataIndex: "status",
      key: "status",
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
      search: true,
    },
    {
      title: "الاجرائات",
      dataIndex: "",
      key: "",
      render: (e: any) => (
        <>
        {permissions &&  permissions.view &&
        permissions.view.includes("order") ? 
        <Link to={`/orders/${e.id}`}>
        <EyeOutlined />
       </Link>
       
      : null
       }
      </>  
      )  
    }
  ];
  // when change state to display pending or running
  const changeShipHandler = (e: any) => {
    setSelectedStatus(e);
    if (e === "الكل") {
     
      setSelectedShipOrders(ship.orders);
    } else {
      const shipOrdersFromPending = ship.orders.filter(
        (order: any) => order.status == e
      );

      
      setSelectedShipOrders(shipOrdersFromPending);
    }
  };
  return (
    <>
     
      {isWaitingForGetShip ? <LoadingPage /> : null}
      <>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <h1 style={{ marginInlineStart: "20px" }}>
            {ship && ship.ship ? ship.ship.name : ""}
          </h1>
          <h3>{ship && ship.ship ? ship.ship.phone : ""}</h3>
        </div>

        {ship && ship.orders && ship.orders.length > 0 ? (
          <Select
            defaultValue="الكل"
            style={{ width: 200 }}
            options={statusOptions}
            value={selectedStatus}
            onChange={(e) => changeShipHandler(e)}
          />
        ) : null}

        {ship && ship.orders ? (
          <>
            <TableWrapper
              keyTerm="shipOrders"
              key={"shipOrders"}
              loading={isWaitingForGetShip}
              title={`جميع طلبات ${ship.ship.name}`}
              columns={columns}
              data={selectedShipOrders}
             
            />
          </>
        ) : null}
      </>
    </>
  );
};

export default SingleShip;
