/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import Statistics from "../../components/Statistics/Statistics";
import { useEffect } from "react";
import DispatchInterface from "../../types/DispatchInterface";
import { geOrdersCount } from "../../store/orderSlice/orderSlice";
import FilterTable from "../../components/FilterTable/FilterTable";
import { Skeleton, Typography } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import FormatDate from "../../helpers/FormatDate/FormatDate";
import TableWrapper from "../../components/TableWrapper/TableWrapper";
const Home = () => {
  
 
  const {permissions , roleName , isUserLogIn , token} = useSelector((state : any) => state.auth)
  
  console.log(permissions , roleName , isUserLogIn , token)
  const { counts, isWaitingForGetCount } = useSelector(
    (state: any) => state.order
  );
  const dispatch: DispatchInterface = useDispatch();

  useEffect(() => {
    dispatch(geOrdersCount({ url: "order/count" , token }));
  }, [dispatch]);

  const { isWaitingForGetOrdersWithFilter, filterOrders } = useSelector(
    (state: any) => state.order
  );
  const columns: any = [
    {
      title: "رقم الطلب",
      dataIndex: "id",
      key: "id",
      search: true,
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "اسم العميل",
      dataIndex: "name",
      key: "name",
      search: true,
    },
    {
      title: "رقم الهاتف",
      dataIndex: "",
      key: "",
      render: (e: any) => (
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
      title: "وقت الكتابة",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (e: any) => FormatDate(e),
    },
    {
      title: "وقت التشغيل",
      dataIndex: "updates",
      key: "updates",
      render: (e: any) => {
        const time = e && e.filter((e: any) => e.info === "تم التشغيل");

        if (time) {
          const lastUpdate = time.pop();

          if (lastUpdate) {
            return FormatDate(lastUpdate.timestamp);
          } else return "---";
        }
      },
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
    },
    {
      title: "الاجرائات",
      dataIndex: "",
      key: "",
      render: (e: any) => (
        <Link to={`/viewOrder/${e.id}`}>
          <EyeOutlined />
        </Link>
      ),
    },
  ];
  return (
    <>
      <Statistics
        pending={counts && counts.pending ? counts.pending : 0}
        part={counts && counts.part ? counts.part : 0}
        deliver={counts && counts.deliver ? counts.deliver : 0}
        back={counts && counts.back ? counts.back : 0}
        loading={isWaitingForGetCount}
      />
      <FilterTable />
      {isWaitingForGetOrdersWithFilter ? (
        <Skeleton />
      ) : filterOrders.length > 0 ? (
        <TableWrapper
          keyTerm="shipOrders"
          key={"shipOrders"}
          loading={isWaitingForGetOrdersWithFilter}
          title="جميع الطلبات المتوافقة"
          columns={columns}
          data={filterOrders}
        />
      ) : (
        <h3 style={{ textAlign: "center", marginTop: "20px" }}>
          لايوجد طلبات لعرضها
        </h3>
      )}
    </>
  );
};
export default Home;
