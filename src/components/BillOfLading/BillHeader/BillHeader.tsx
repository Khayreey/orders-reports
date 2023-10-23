import styles from "../styles.module.scss";
const BillHeader = () => {
  return (
    <header className={styles.header}>
      <address className={styles.address} style={{ padding: "10px" }}>
        <p> رقم الراسل :</p>
        <p> 01001606344 </p>
      </address>
      <address className={styles.address} style={{ padding: "10px" }}>
        <p>  مسئول الشحن :</p>
        <p> علي مختار </p>
      </address>
      <span style={{ margin: 0 }}>
        <img
          alt="MAHESH"
          src="/logo.png"
          className="rounded float-right align-top"
        />
      </span>
    </header>
  );
};

export default BillHeader;
