import React from 'react'

import { Typography } from 'antd'
import './AppLoading.Style.less'

const { Title } = Typography

const AppLoading = ({ title }) => {
  return (
    <div className="containerAppLoading">
      <div className="containerComponent">
        <span className="loader-20" />
        <div className="contentTitle">
          <Title level={4}>{title}</Title>
        </div>
      </div>
    </div>
  )
}

export default AppLoading
