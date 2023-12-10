/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "../styles.module.scss";
const BillHeader = ({ order , isSheet}: any) => {
  return (
    <header className={styles.header}>
      <address className={styles.address} style={{ padding: "3px" }}>
        <p> رقم الراسل :</p>
        <p> 01222477562 </p>
      </address>
      <address className={styles.address} style={{ padding: "3px" }}>
        <p> مسئول الشحن :</p>
        <p>{order && order.ship ? order.ship.name : ""}</p>
      </address>
      <span style={{ margin: 0 }}>
        <img
          alt="MAHESH"
          src="/logo.png"
          className="rounded float-right align-top"
        />
      </span>
      {isSheet 
      ? 
      <span>شيت الشحن للمندوب</span>
      :
      null
      }
    </header>
  );
};

export default BillHeader;
