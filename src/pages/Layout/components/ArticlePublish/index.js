import React, { Component } from 'react'
import {
  Breadcrumb,
  Card,
  Form,
  Radio,
  Select,
  DatePicker,
  Space,
  Button,
  Table,
  Tag,
} from 'antd'

import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './index.module.scss'
import { Link } from 'react-router-dom'
import { getChannelList, getArticleList } from 'api/article'
import { ArticleStatus } from 'api/constant'
import defaultImg from 'assets/images/defaultImage.png'
const { Option } = Select
const { RangePicker } = DatePicker
export default class ArticlePublish extends Component {
  state = {
    channelList: [],
    total: 0,
    date: null,
    articleList: [],
    params: {
      begin_pubdate: '',
      end_pubdate: '',
      status: -1,
    },
  }
  render() {
    const columns = [
      {
        title: '封面',
        dataIndex: 'name',
        render: (data) => {
          if (data.cover.type === 1) {
            return <img src={data.cover.image[0]} alt=""></img>
          } else if (data.cover.type === 3) {
            return
          } else
            return (
              <img
                src={defaultImg}
                alt=""
                style={{ width: 200, height: 120, objectFit: 'cover' }}
              ></img>
            )
        },
      },
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (data) => {
          const status = ArticleStatus.find((item) => item.id === data)
          return <Tag color={status.color}>{status.name}</Tag>
        },
      },
      {
        title: '发布时间',
        dataIndex: 'pubdate',
      },
      {
        title: '阅读数',
        dataIndex: 'read_count',
      },
      {
        title: '评论数',
        dataIndex: 'comment_count',
      },
      {
        title: '点赞数',
        dataIndex: 'like_count',
      },
      {
        title: '操作',
        render: () => {
          return (
            <Space>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined></EditOutlined>}
              ></Button>
              <Button
                danger
                shape="circle"
                icon={<DeleteOutlined></DeleteOutlined>}
              ></Button>
            </Space>
          )
        },
      },
    ]
    return (
      <div className="article-publish-container">
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>发布文章</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            name="basic"
            initialValues={{
              status: -1,
            }}
            autoComplete="off"
          >
            <Form.Item label="状态" name="status">
              <Radio.Group
                value={this.state.params.status}
                onChange={this.statusChange}
              >
                {ArticleStatus.map((item) => {
                  return (
                    <Radio key={item.id} value={item.id}>
                      {item.name}
                    </Radio>
                  )
                })}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="频道" name="channel_id">
              <Select
                style={{ width: 200 }}
                placeholder="请选择文章频道"
                onClick={this.getChannel}
              >
                {this.state.channelList.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item label="日期" name="date">
              <Space direction="vertical" size={12}>
                <RangePicker value={this.state.date} />
              </Space>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
              <Button type="primary" htmlType="submit">
                筛选
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title={`根据筛选条件共查询到 ${this.state.total} 条结果:`}>
          <Table
            columns={columns}
            dataSource={this.state.articleList}
            rowKey="id"
          ></Table>
        </Card>
      </div>
    )
  }
  statusChange = (e) => {
    this.setState({
      params: {
        status: e.target.value,
      },
    })
  }

  componentDidMount = () => {
    this.getChannel()
    this.getArticleList()
  }

  getChannel = async () => {
    const res = await getChannelList()
    this.setState({
      channelList: res.data.channels,
    })
  }

  getArticleList = async () => {
    const res = await getArticleList()
    console.log(res)
    this.setState({
      articleList: res.data.results,
      total: res.data.total_count,
    })
  }
}
