
import TableWrapper from '../TableWrapper/TableWrapper'
import type {  ColumnsType } from "antd/es/table";
interface DataType {
  id : string , 
  name: string;
  phone: string;
  doneOrders :  string ,    
  pendingOrders : string ,
  rejectedOrders : string , 

}
const Ships = () => {
    
    const data: DataType[] = [
        {
          id : '150' ,
          name : 'شركة النصر' , 
          phone : '01001606344' , 
          doneOrders : '50', 
          pendingOrders: '125' ,
          rejectedOrders: "20",
        
        },
        {
          id : '100' ,
            name : 'شركة النصر' , 
            phone : '01001606344' , 
            doneOrders : '50', 
            pendingOrders: '125' ,
            rejectedOrders: "20",
          
          },
          {
            id : '40' ,
            name : 'شركة النصر' , 
            phone : '01001606344' , 
            doneOrders : '50', 
            pendingOrders: '125' ,
            rejectedOrders: "20",
          
          },
          {
            id : '50' ,
            name : 'شركة النصر' , 
            phone : '01001606344' , 
            doneOrders : '50', 
            pendingOrders: '125' ,
            rejectedOrders: "20",
          
          },
      ];
    const columns: ColumnsType<DataType> = [
        {
          title: "اسم مسئول الشحن",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "رقم الهاتف",
          dataIndex: "phone",
          key: "phone",
    
         
        },
        {
          title: "الطلبات المسلمة",
          dataIndex: "doneOrders",
          key: "doneOrders",         
        },
        {
          title: "طلبات قيد التشغيل",
          dataIndex: "pendingOrders",
          key: "pendingOrders",
        },
        {
          title: "الطلبات المرتجعة",
          dataIndex: "rejectedOrders",
          key: "rejectedOrders",
         
        },
      ];

  return (
    <TableWrapper title='مسئولي الشحن' columns={columns} data={data}/>
  )
}

export default Ships