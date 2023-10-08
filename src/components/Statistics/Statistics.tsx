import {  Row } from 'antd'
import SingleStatistic from '../SingleStatistic/SingleStatistic'
import  {HiTemplate} from 'react-icons/hi'
import {MdDone} from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai'
import {BsStopwatch} from 'react-icons/bs'
const Statistics = () => {
  return (
    <>
   
    <Row style={{ justifyContent : 'space-around' , marginTop : '15px'}}>
    
     <SingleStatistic title='كل الطلبات'  value='1000' color='#A97104' Icon={HiTemplate}/>
     <SingleStatistic title='الطلبات المسلمة'  value='500' color='#39e75f' Icon={MdDone}/>
    <SingleStatistic title='الطلبات قيد التشغيل'  color='#FFA500' value='200' Icon={BsStopwatch}/>
    <SingleStatistic title='الطلبات المرتجعة'  color='rgb(255,0,0)' value='200' Icon={AiOutlineClose}/>
    
  </Row>
  </>
  )
}

export default Statistics