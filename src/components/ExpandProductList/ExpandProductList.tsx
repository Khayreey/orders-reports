import { List } from "antd";
import ExpandProductItem from "../ExpandProductItem/ExpandProductItem";
const ExpandProductList = () => {
  const data = [
    {name : 'ddddd' , quantity : 10},
    {name : 'ddddd' , quantity : 10},
  ];
  return (
    <List bordered dataSource={data} renderItem={(e , index) => <ExpandProductItem key={index} type={e}/>} />
  );
};
export default ExpandProductList;
