import { Radio } from "antd";

const StatusFilter = () => {
  return (
    <Radio.Group defaultValue="a" style={{ width: "100%", display: "flex" }}>
      <Radio.Button style={{ flex: 1 }} value="a">
        الكل
      </Radio.Button>
      <Radio.Button style={{ flex: 1 }} value="b">
        تم التسليم
      </Radio.Button>
      <Radio.Button style={{ flex: 1 }} value="c">
        قيد التشغيل
      </Radio.Button>
      <Radio.Button style={{ flex: 1 }} value="d">
        مرتجع
      </Radio.Button>
    </Radio.Group>
  );
};

export default StatusFilter;
