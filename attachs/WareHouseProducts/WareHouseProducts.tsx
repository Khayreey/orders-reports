import { ColumnsType } from "antd/es/table";
import TableWrapper from "../TableWrapper/TableWrapper"
interface DataType {
    id : string , 
    name: string;
    subName: string;
    stock :  string ,    
  }
const WareHouseProducts = () => {
    const data: DataType[] = [
        {
          id : '150' ,
          name : 'شركة النصر' , 
          subName : '01001606344' , 
          stock : '50', 
        },
        {
            id : '10' ,
            name : 'شركة النصر' , 
            subName : '01001606344' , 
            stock : '50', 
          },
          {
            id : '22' ,
            name : 'شركة النصر' , 
            subName : '01001606344' , 
            stock : '50', 
          },
          {
            id : '180' ,
            name : 'شركة النصر' , 
            subName : '01001606344' , 
            stock : '50', 
          },
      ];
    const columns: ColumnsType<DataType> = [
        {
          title: "اسم المنتج",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "الاسم الفرعي للمنتج",
          dataIndex: "subName",
          key: "subName",
    
         
        },
        {
          title: "العدد المتاح",
          dataIndex: "stock",
          key: "stock",         
        },
      ];

  return (
    <TableWrapper title='المتجات داخل المخزن' columns={columns} data={data}/>
  )
}

export default WareHouseProducts