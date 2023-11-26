/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DispatchInterface from "../../types/DispatchInterface";
import { useDispatch, useSelector } from "react-redux";
import { getAllPendingOrders } from "../../store/orderSlice/orderSlice";
import TableWrapper from "../../components/TableWrapper/TableWrapper";
import {  Typography } from "antd";
import LoadingPage from "../LoadingPage/LoadingPage";


const RunningOrders = () => {
  const {
    isWaitingForRunOrders , 
    isPendingOrdersRequireRender,
    pendingOrders,
    isWaitingForGetPendingOrders,
  } = useSelector((state: any) => state.order);
  const dispatch: DispatchInterface = useDispatch();
  // state for mange all ships and filter them 
 
  const [selectedShipOrders , setSelectedShipOrders] = useState([])
  // set ships when orders come to display list for each ship responsible 
  //useEffect to rest select ship when ever ships change 
  
 
  useEffect(() => {
    dispatch(getAllPendingOrders({ url: "order/running" }));
    
  }, [isPendingOrdersRequireRender, dispatch]);
  
  useEffect(()=>{
    if(!pendingOrders) return 
    const formateOrders = pendingOrders.map(({_id  , ...state} : any)=>{
      return {...state , key : _id}
    }) 
    
    setSelectedShipOrders(formateOrders)
  } , [pendingOrders ])
  
  
  const columns: any = [
    {
        title: "رقم الطلب",
        dataIndex: "id",
        key: "id",
        search : true
      },
    {
      title: "اسم العميل",
      dataIndex: "name",
      key: "name",
      search : true , 
    },
    {
      title: "رقم الهاتف",
      dataIndex: "",
      key: "",
      render: (e : any) => (
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
      search : true , 
    },
    {
      title: "العنوان",
      dataIndex: "address",
      key: "address",
      search : true
    },
   
  ];
 
  return (
    <>
    {isWaitingForRunOrders ? 
     <LoadingPage />
    : null
    }
    
    
      <TableWrapper
        keyTerm="shipOrders"
        key={"shipOrders"}
        loading={isWaitingForGetPendingOrders}
        title="جميع الطلبات قيد التشغيل"
        columns={columns}
        data={selectedShipOrders}
      />
    </>
  );
};
export default RunningOrders;
