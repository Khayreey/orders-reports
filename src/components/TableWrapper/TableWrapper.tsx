/* eslint-disable @typescript-eslint/no-explicit-any */
import MainContainer from "../../Containers/MainContainer/MainContainer";
import { FloatButton } from "antd";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ExpandProductList from "../ExpandProductList/ExpandProductList";
import ExpandShip from "../ExpandShip/ExpandShip";
import { SearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import ExpandOrderSummary from "../ExpandOrderSummary/ExpandOrderSummary";
import ExpandUser from "../ExpandUser/ExpandUser";
interface TableWrapperInterface {
  data: any;
  columns: any;
  title: string;
  loading: boolean;
  keyTerm: string;
  isExpand?: boolean;
}
const TableWrapper = ({
  data,
  columns,
  title,
  loading,
  keyTerm,
  isExpand,
}: TableWrapperInterface) => {
  const exportToExcel = () => {
    // Check if data is empty or undefined
    if (!data || data.length === 0) {
      alert("Data array is empty or undefined.");
      return;
    }

    // Create a new workbook and add the data
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((row: any) => {
        // Filter out "_id" and empty values for each row
        const filteredRow: any = {};
        for (const key in row) {
          if (key.toLowerCase() !== "_id" && row[key] !== "") {
            filteredRow[key] = row[key];
          }
        }

        // Extract product information if 'products' array exists
        if ("products" in row && Array.isArray(row["products"])) {
          const productsInfo = row["products"].map((product) => {
            let productInfo = `${product.product.name} - Quantity: ${product.product.quantity}`;
            if ("type" in product) {
              productInfo += ` - Type: ${product.product.type.name}`;
            }
            return productInfo;
          });

          filteredRow["products"] = productsInfo.join("\n");
        }

        // Extract ship information if 'ship' object exists
        if ("ship" in row && row["ship"] && "name" in row["ship"]) {
          filteredRow["ship"] = row["ship"]["name"];
        }

        // Add the 'ship_id' column
        if ("id" in row) {
          filteredRow["ship_id"] = `senorita${row["id"]}`;
        }

        return filteredRow;
      })
    );
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate the Excel file and download it
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(excelBlob, "data-export.xlsx");
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: any
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: any,
    title: string
  ): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`بحث ب ${title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />

        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
          >
            بحث
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch(selectedKeys as string[], confirm, dataIndex);
              close();
            }}
            size="small"
            style={{ width: 90 }}
          >
            إعادة ضبط
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const formattedColumns = columns.map((e: any) => {
    if (e && e.search && e.search == true) {
      return { ...e, ...getColumnSearchProps(e.dataIndex, e.title) };
    } else {
      return e;
    }
  });
  return (
    <MainContainer title={title}>
      <FloatButton
        type="primary"
        onClick={exportToExcel}
        style={{
          boxShadow: "none",
          position: "absolute",
          left: "5px",
          top: "5px",
          alignSelf: "center",
        }}
        tooltip={<div>تنزيل ملف الاكسيل</div>}
      />
      <Table
        loading={loading}
        rowKey={(e) => e._id}
        expandable={
          isExpand
            ? {
                expandRowByClick: true,

                expandedRowRender: (record, index) => {
                  if (keyTerm === "product") {
                    return <ExpandProductList product={record} key={index} />;
                  } else if (keyTerm === "ship") {
                    return <ExpandShip record={record} key={index} />;
                  } else if (
                    keyTerm === "orderByPhone" ||
                    keyTerm === "orderByName"
                  ) {
                    return <ExpandOrderSummary record={record} key={index} />;
                  } else if (keyTerm === "user") {
                    return <ExpandUser record={record} key={index} />;
                  }

                  return null;
                },
                rowExpandable: (record) => record._id,
              }
            : undefined
        }
        columns={formattedColumns}
        dataSource={data}
        style={{ direction: "rtl" }}
        id="my-table"
      />
    </MainContainer>
  );
};
export default TableWrapper;
