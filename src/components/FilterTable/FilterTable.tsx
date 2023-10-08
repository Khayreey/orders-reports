import { Collapse } from 'antd'
import CollapseChildren from '../CollapseChildren/CollapseChildren'


const FilterTable = () => {
  return (
    <Collapse style={{border : 'none' , marginBottom : '10px'}}
      items={[{ key: '1', label: 'خيارات البحث', children: <CollapseChildren /> }]}
    />
  )
}

export default FilterTable