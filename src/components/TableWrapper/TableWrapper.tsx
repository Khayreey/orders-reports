/* eslint-disable @typescript-eslint/no-explicit-any */
import MainContainer from '../../Containers/MainContainer/MainContainer'
import {  FloatButton, Table } from 'antd'
import { AiFillFileExcel } from "react-icons/ai";
import { Excel } from "antd-table-saveas-excel";

interface TableWrapperInterface {
    data : any , 
    columns : any , 
    title : string
}
const TableWrapper = ({data , columns , title} : TableWrapperInterface) => {

  const handlePrint = () => {
    const excel = new Excel();
    excel
      .addSheet("sheet 1")
      .addColumns(columns)
      .addDataSource(data, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
    };
  return (
    <MainContainer title={title}>
        
         <FloatButton type='primary' onClick={handlePrint} style={{boxShadow : 'none' , position : 'absolute' , left : '5px' , top : '5px' , alignSelf : 'center'}}
         tooltip={<div>تنزيل ملف الاكسيل</div>}
         />
        
        <Table columns={columns} dataSource={data} style={{direction : 'rtl'}} id="my-table"/>
    </MainContainer>
  )
}
export default TableWrapper