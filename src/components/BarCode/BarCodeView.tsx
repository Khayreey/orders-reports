/* eslint-disable @typescript-eslint/no-explicit-any */

import Barcode from 'react-jsbarcode';

const BarCodeView = ({value} : any) => {
  console.log(value)
  return (
   <Barcode value={value} options={{ format: 'code128' , height : 40 , background : 'transparent' }}  />
  )
}
export default BarCodeView