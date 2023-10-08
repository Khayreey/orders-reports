import { Button, Cascader, Col, DatePicker, Divider, Row } from "antd";
import StatusFilter from "../StatusFilter/StatusFilter";
import countryptions from "../../data/countryData";
const { RangePicker } = DatePicker;
const CollapseChildren = () => {
  const dropdownRender = (menus: React.ReactNode) => (
    <div>
      {menus}
      <Divider style={{ margin: 0 }} />
    </div>
  );
  return (
    <Row gutter={16}>
      <Col
        className="gutter-row"
        span={12}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <p>تاريخ الطلب </p>
        <RangePicker />
      </Col>
      <Col
        className="gutter-row"
        span={12}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <p>تاريخ التوصيل</p>
        <RangePicker />
      </Col>

      <Col className="gutter-row" span={12}>
        <p>الحالة</p>
        <StatusFilter />
      </Col>
      <Col className="gutter-row" span={12}>
        <p>العنوان</p>
        <Cascader
          style={{ width: "100%" }}
          dropdownRender={dropdownRender}
          placeholder="اختر المحافظة والمركز"
          options={countryptions}
        />
      </Col>
      <Col className="gutter-row" span={24} style={{marginTop : '20px' , display : 'flex' , alignItems : 'center' , justifyContent : 'center'}}>
         <Button type="primary">اظهار النتائج</Button>
      </Col>
    </Row>
  );
};

export default CollapseChildren;
