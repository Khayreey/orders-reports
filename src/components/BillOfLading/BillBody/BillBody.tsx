import BarCodeView from "../../BarCode/BarCodeView";
import styles from "../styles.module.scss";
const BillBody = () => {
  return (
    <div className={styles.main}>
      <article className={styles.article}>
        <address className={styles.address}>
          <BarCodeView />
        </address>

        <table className={`${styles.firstTable} ${styles.table}`}>
          <tr>
            <th className={styles.th}>
              <span>تاريخ الطلب</span>
            </th>
            <td className={styles.td}>
              <span>25/10/2023</span>
            </td>
          </tr>
          <tr>
            <th className={styles.th}>
              <span>اسم العميل</span>
            </th>
            <td className={styles.td}>
              <span>احمد خيري</span>
            </td>
          </tr>
          <tr>
            <th className={styles.th}>
              <span>العنوان</span>
            </th>
            <td className={styles.td}>
              <span>
                رجوار مخزن االال القاهرة / الجيزة / 23 شارع مدرسة فيصل
              </span>
            </td>
          </tr>

          <tr>
            <th className={styles.th}>
              <span>رقم هاتف العميل</span>
            </th>
            <td className={styles.td}>
              <span>
                 01001606344 / 01000808000
              </span>
            </td>
          </tr>
        </table>

        <table className={`${styles.secondTable}  ${styles.table}`}>
          <thead>
            <tr>
              <th className={styles.th} >
                <span>المنتجات</span>
              </th>

             
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: "80%" }} className={styles.td}>
                <a className="cut">-</a>
                <span>منتج عناية</span>
              </td>
              
            </tr>
          </tbody>
        </table>

        <table className={`${styles.second}  ${styles.table}`}>
          <tr>
            <th className={styles.th}>
              <span>اجمالي المطلوب</span>
            </th>
            <td className={styles.td}>
              <span data-prefix>LE </span>
              <span style={{ fontWeight: "800" }}>600 </span>
            </td>
          </tr>
        </table>
      </article>

      <aside style={{ borderTop: ".5px solid black" , padding : '0px 5px'}}>
        <p style={{margin : '0px'}}>
          العميل عايز يستلم ف الشارع uahk fgfgf العميل عايز يستلم ف الشارع uahk
          fgfgf Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
          aliquam animi voluptates minima reiciendis, sed sapiente deleniti,
          nihil praesentium, possimus a autem doloremque consequuntur velit
        </p>
      </aside>
    </div>
  );
};

export default BillBody;
