
import Barcode from 'react-jsbarcode';

const BarCodeView = () => {
  return (
    <Barcode  value="ABC123" options={{ format: 'code128' }}  />
  )
}
export default BarCodeView