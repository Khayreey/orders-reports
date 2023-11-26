/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux"
import MainContainer from "../../Containers/MainContainer/MainContainer"
import AddNewShip from "../../components/AddNewShip/AddNewShip"
import TableWrapper from "../../components/TableWrapper/TableWrapper"
import { useEffect } from "react"
import DispatchInterface from "../../types/DispatchInterface"
import { deleteShip, getAllShips } from "../../store/shipSlice/shipSlice"
import DeleteModal from "../../modals/DeleteModal/DeleteModal"
import { DeleteOutlined , EyeOutlined } from "@ant-design/icons"
import { ColumnsType } from "antd/es/table";
import {useNavigate} from 'react-router-dom'
interface DataType {
  id : React.Key , 
  name: string;
  phone: string;
  
}

const Ship = () => {
  const {isWaitingForShips , ships  , isWaitingForDeleteShip , isShipsRequireRender} = useSelector((state : any)=>state.ship)
  const dispatch : DispatchInterface = useDispatch()
  

  const navigate = useNavigate()
  const formattedShips = ships? ships.map(({ _id , ...state} : any)=>{
    return {...state , key : _id}
  }) : []
  
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
      render: (e) => <div style={{display : 'flex' , alignItems : 'center' , gap : '10px'}}>
       <a><DeleteOutlined onClick={()=> DeleteModal(e.name, isWaitingForDeleteShip ,()=>confirmDelete(e.key))}/></a> 
       <a><EyeOutlined onClick={()=> navigate(`/ship/${e.key}`) }/></a> 
      </div>
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
       <TableWrapper keyTerm="ship" key={'ships'} loading={isWaitingForShips} title='جميع مسئولي الشحن' columns={columns} data={formattedShips}/>
    </>
  )
}

export default Ship