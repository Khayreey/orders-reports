/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BarCodeView from "../../BarCode/BarCodeView";
import styles from "../styles.module.scss";
const BillBody = ({order , isSheet} : any) => {
  console.log(order)
  const orderProducts = order && !isSheet && order.products.length > 0 ? 
  order.products.map((e : any)=>{
      if(e.type && e.type > 0) {
        return `-${e.product.quantity} ${e.product.name} / ${e.product.type}`
      }
      else {
        return `${e.product.quantity} ${e.product.name}`
      }
  }) : []

  
  return (
    <div className={styles.main}>
      <article className={styles.article}>
        <address className={styles.address} style={{display : 'flex' , flexDirection : 'column'}}>
          <BarCodeView value={order.id}/>
          {isSheet ? 
       <div style={{width : '5cm' , height : '.87cm' , border : '1px solid black'}}>

       </div>
       : null  
      }
         
          
     
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
              <span>{order && order.name ? order.name : ""}</span>
            </td>
          </tr>
          <tr>
            <th className={styles.th}>
              <span>العنوان</span>
            </th>
            <td className={styles.td}>
              <span>
              {order && order.country ? `${order.country} / ${order.address}` : ""}
              </span>
            </td>
          </tr>

          <tr>
            <th className={styles.th}>
              <span>رقم هاتف العميل</span>
            </th>
            <td className={styles.td}>
              <span>
              {order && order.phone && order.anotherPhone ? `${order.phone} / ${order.anotherPhone}` : order.phone && !order.anotherPhone ?
              order.phone : ""}
              </span>
            </td>
          </tr>
        </table>

        {!isSheet ? 
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
              <a className="cut"></a>
              <span>{orderProducts.join('/')}</span>
            </td>
          </tr>
        </tbody>
      </table>
      : null 
        }
       

        <table className={`${styles.second}  ${styles.table}`}>
          <tr>
            <th className={styles.th}>
              <span>اجمالي المطلوب</span>
            </th>
            <td className={styles.td}>
              <span data-prefix>LE </span>
              <span style={{ fontWeight: "800" }}>
                {order && order.price ? order.price : ""}
              </span>
            </td>
          </tr>
        </table>
      </article>

      {order && order.notes 
       ? 
       <aside style={{ borderTop: ".5px solid black" , padding : '0px 5px'}}>
       <p style={{margin : '0px'}}>
         {order.notes}
       </p>
     </aside>
     : 
     null
      }
    </div>
  );
};
export default BillBody;
