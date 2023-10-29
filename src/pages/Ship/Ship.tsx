/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux"
import MainContainer from "../../Containers/MainContainer/MainContainer"
import AddNewShip from "../../components/AddNewShip/AddNewShip"
import TableWrapper from "../../components/TableWrapper/TableWrapper"
import { useEffect } from "react"
import DispatchInterface from "../../types/DispatchInterface"
import { deleteShip, getAllShips } from "../../store/shipSlice/shipSlice"
import DeleteModal from "../../modals/DeleteModal/DeleteModal"
import { DeleteOutlined } from "@ant-design/icons"
import { ColumnsType } from "antd/es/table";

interface DataType {
  id : React.Key , 
  name: string;
  phone: string;
  
}

const Ship = () => {
  const {isWaitingForShips , ships , errorMessageInGetShips , isWaitingForDeleteShip , isShipsRequireRender} = useSelector((state : any)=>state.ship)
  const dispatch : DispatchInterface = useDispatch()
  console.log(errorMessageInGetShips , isWaitingForDeleteShip  , isShipsRequireRender)

  useEffect(()=>{
     dispatch(getAllShips({url : 'ship'}))
  } , [isShipsRequireRender , dispatch])
  
  const columns: ColumnsType<DataType> = [
    {
      title: "اسم المسئول",
      dataIndex: "name",
      key: "name",      
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phone",
      key: "phone",      
    },
   
    {
      title: 'الاجرائات',
      dataIndex: '',
      key: 'x',
      render: (e) => <a><DeleteOutlined onClick={()=> DeleteModal(e.name, isWaitingForDeleteShip ,()=>confirmDelete(e.key))}/></a> ,
    },
  ];
  const confirmDelete = (id : any)=>{
    // delete function
    dispatch(deleteShip({url : 'ship'  , id : id , toastMessage : 'تم حذف  مسئول الشحن بنجاح'}))
 }  
  return (
    <>
      <MainContainer title="اضافة مسئول شحن" isCollapse={true}>
        <AddNewShip />
      </MainContainer>
       <TableWrapper key={'ships'} loading={isWaitingForShips} title='جميع مسئولي الشحن' columns={columns} data={ships}/>
    </>
  )
}

export default Ship