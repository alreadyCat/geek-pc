import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.css'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'
ReactDom.render(
  <ConfigProvider locale={locale}>
    <App></App>
  </ConfigProvider>,
  document.getElementById('root')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
