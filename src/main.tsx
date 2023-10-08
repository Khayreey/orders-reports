import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import config from './config.ts'
import {ConfigProvider} from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={config}>
    <App />
    </ConfigProvider>
)
