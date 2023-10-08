import { Statistic, Col, Card } from "antd";
import styles from './staistic.module.scss'
import { IconType } from "react-icons";
interface Props {
  title: string;
  color: string;
  value: string;
  Icon : IconType 
}
const SingleStatistic = ({ Icon , title, color, value }: Props) => {
  return (
    <Col
      xs={{ span: 24 }}
      lg={{ span: 6 }}
      style={{ padding: "20px", borderRadius: "20px" , position : 'relative' }}
    >
      <Card bordered={false}>
        <Statistic title={title} value={value} valueStyle={{ color: color }} />
      </Card>
      <div className={styles.icon}>
        <Icon style={{color : color}}/>
      </div>
    </Col>
  );
};

export default SingleStatistic;
