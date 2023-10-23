import MainContainer from "../../Containers/MainContainer/MainContainer"
import AddNewProduct from "../../components/AddNewProduct/AddNewProduct"
import { ColumnsType } from "antd/es/table";
import TableWrapper from "../../components/TableWrapper/TableWrapper";

interface DataType {
    id : React.Key , 
    name: string;
    subName: string;
    stock :  string ,    
    type? : [{name : string , quantity : number}]
  }
const Products = () => {
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
        type : [{name : 'fdfdfd' , quantity : 10}]
      },
      {
        id : '180' ,
        name : 'شركة النصر' , 
        subName : '01001606344' , 
        stock : '50', 
        type : [{name : 'fdfdfd' , quantity : 10}]
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
    <>
    <MainContainer title="اضافة منتج جديد" isCollapse={true}>
      <AddNewProduct/>
    </MainContainer>
        <TableWrapper title='المتجات داخل المخزن' columns={columns} data={data}/>
        </>
     
  )
}

export default Products