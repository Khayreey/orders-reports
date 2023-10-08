/* eslint-disable @typescript-eslint/no-explicit-any */
import MainContainer from '../../Containers/MainContainer/MainContainer'
import {  FloatButton, Table } from 'antd'
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface TableWrapperInterface {
    data : any , 
    columns : any , 
    title : string
}
const TableWrapper = ({data , columns , title} : TableWrapperInterface) => {

 
  const exportToExcel = () => {
    // Get the table data
    const table = document.getElementById("my-table");
    const tableData = XLSX.utils.table_to_sheet(table);

    // Create a new workbook and add the table data
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, tableData, "Sheet1");

    // Generate the Excel file and download it
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(excelBlob, "table-data.xlsx");
  };

  return (
    <MainContainer title={title}>
         <FloatButton type='primary' onClick={exportToExcel} style={{boxShadow : 'none' , position : 'absolute' , left : '5px' , top : '5px' , alignSelf : 'center'}}
         tooltip={<div>تنزيل ملف الاكسيل</div>}
         />
        
        <Table columns={columns} dataSource={data} style={{direction : 'rtl'}} id="my-table"/>
    </MainContainer>
  )
}
export default TableWrapper