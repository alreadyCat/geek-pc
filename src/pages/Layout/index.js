import React, { Component } from 'react'
import { Layout, Menu, Popconfirm, message } from 'antd'
import style from './index.module.scss'
import { Route, Switch, Link } from 'react-router-dom'
import {
  LogoutOutlined,
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
} from '@ant-design/icons'
import DataOverview from './components/DataOverview'
import ArticlePublish from './components/ArticlePublish'
import ContentManage from './components/ContentManage'
import { removeToken } from 'utils/storage'
import { getUserProfile } from 'api/user'
const { Header, Content, Sider } = Layout

export default class LayoutComponent extends Component {
  state = {
    profile: {},
  }
  render() {
    return (
      <div className={style['home-container']}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>{this.state.profile.name}</span>
              <span>
                <Popconfirm
                  title="确认退出？"
                  okText="确认"
                  cancelText="取消"
                  onConfirm={this.confirmLogout}
                  onCancel={this.cancelLogout}
                >
                  <LogoutOutlined />
                  退出
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
                theme="dark"
                defaultSelectedKeys={[this.props.location.pathname]}
              >
                <Menu.Item key="/home" icon={<HomeOutlined />}>
                  <Link to="/home">数据概览</Link>
                </Menu.Item>
                <Menu.Item key="/home/cm" icon={<DiffOutlined />}>
                  <Link to="/home/cm">内容管理</Link>
                </Menu.Item>
                <Menu.Item key="/home/ap" icon={<EditOutlined />}>
                  <Link to="/home/ap">发布文章</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: '24px', overflow: 'auto' }}>
              <Content className="site-layout-background">
                <Switch>
                  <Route exact path="/home" component={DataOverview}></Route>
                  <Route path="/home/ap" component={ArticlePublish}></Route>
                  <Route path="/home/cm" component={ContentManage}></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
  confirmLogout = () => {
    removeToken()
    this.props.history.push('/login')
    message.success('退出成功', 1)
  }
  cancelLogout = () => {
    message.warn('你取消了退出', 1)
  }

  componentDidMount = async () => {
    const res = await getUserProfile()
    this.setState({
      profile: res.data,
    })
  }
}
