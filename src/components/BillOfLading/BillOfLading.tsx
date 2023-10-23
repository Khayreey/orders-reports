
import BillHeader from './BillHeader/BillHeader'
import BillBody from './BillBody/BillBody'


const BillOfLading = (() => {
 

  return (
    <div style={{border : '.5px solid black' ,display :'block' ,pageBreakAfter: 'always' , clear : 'both'}} >
      <BillHeader />
      <BillBody />
    </div>
  )
})

export default BillOfLading