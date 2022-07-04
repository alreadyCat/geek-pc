import React, { Component } from 'react'
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  DatePicker,
  Button,
  Table,
  Image,
  Tag,
  Modal,
  message
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ChannelSelect from 'components/ChannelSelect'
import { articleStatus } from 'api/constant'
import { deleteArticle, getArticleList } from 'api/article'
import errorImg from 'assets/images/defaultImage.png'
import { Link } from 'react-router-dom'
const { RangePicker } = DatePicker
export default class ContentManage extends Component {
  reqParams = {
    per_page: 10,
    page: 1,
    status: -1,
    channel_id: null,
    begin_pubdate: null,
    end_pubdate: null,
    date: null
  }
  state = {
    columns: [
      {
        title: '封面',
        dataIndex: 'cover',
        key: 'cover',
        width: 120,
        align: 'center',
        render: function (data) {
          if (data.type === 0) {
            return <Image src={errorImg} width={100} height={100}></Image>
          } else {
            return <Image src={data.images[0]} width={100} height={100}></Image>
          }
        }
      },
      {
        title: '标题',
        align: 'center',
        dataIndex: 'title',
        key: 'title'
      },
      {
        align: 'center',
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: function (status) {
          const item = articleStatus.find((item) => item.id === status)
          return <Tag color={item.color}>{item.name}</Tag>
        }
      },
      {
        align: 'center',
        title: '发布时间',
        dataIndex: 'pubdate',
        key: 'pubdate'
      },
      {
        align: 'center',
        title: '阅读数',
        dataIndex: 'read_count',
        key: 'read_count'
      },
      {
        align: 'center',
        title: '评论数',
        dataIndex: 'comment_count',
        key: 'comment_count'
      },
      {
        align: 'center',
        title: '点赞数',
        dataIndex: 'like_count',
        key: 'like_count'
      },
      {
        align: 'center',
        title: '操作',
        key: 'operate',
        dataIndex: 'id',
        render: (id) => {
          return (
            <>
              <Button type="link" onClick={() => this.edit(id)}>
                编辑
              </Button>
              <Button type="link" onClick={() => this.delete(id)}>
                删除
              </Button>
            </>
          )
        }
      }
    ],
    data: [],
    channels: [],
    articleData: {}
  }
  render() {
    const { results, total_count, per_page, page } = this.state.articleData
    return (
      <div>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>内容管理</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form onFinish={this.search} wrapperCol={{ span: 12 }} initialValues={this.reqParams}>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                {articleStatus.map((item, index) => {
                  return (
                    <Radio key={index} value={item.id}>
                      {item.name}
                    </Radio>
                  )
                })}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="频道" name="channel" wrapperCol={{ span: 4 }}>
              <ChannelSelect></ChannelSelect>
            </Form.Item>

            <Form.Item label="日期" name="date" wrapperCol={{ span: 6 }}>
              <RangePicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                筛选
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title={`根据筛选条件共查询到${total_count}条文章`}>
          <Table
            columns={this.state.columns}
            dataSource={results}
            rowKey={(record) => record.id}
            pagination={{
              pageSize: per_page,
              total: total_count,
              current: page
            }}
            onChange={this.pageChange}
          />
        </Card>
      </div>
    )
  }

  componentDidMount = async () => {
    this.getArticleList()
  }
  getArticleList = async (params) => {
    const { data } = await getArticleList(params)
    this.setState({
      articleData: data
    })
  }
  search = ({ status, channel_id, date }) => {
    if (status === -1) {
      delete this.reqParams.status
    } else {
      this.reqParams.status = status
    }

    if (channel_id === undefined) {
      delete this.reqParams.channel_id
    } else {
      this.reqParams.channel_id = channel_id
    }

    if (date) {
      this.reqParams.begin_pubdate = date[0].startOf('day').format('YYYY-MM-DD')
      this.reqParams.end_pubdate = date[1].endOf('day').format('YYYY-MM-DD')
    } else {
      delete this.reqParams.begin_pubdate
      delete this.reqParams.end_pubdate
    }

    this.reqParams.page = 1
    this.getArticleList(this.reqParams)
  }
  delete = (id) => {
    Modal.confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      onOk: async () => {
        console.log(id)
        await deleteArticle(id)
        message.success('删除成功')
        this.getArticleList()
      }
    })
  }
  edit = (id) => {
    this.props.history.push(`/home/ap?id=${id}`)
  }
  pageChange = (page) => {
    console.log(page)
    this.reqParams.page = page.current
    this.reqParams.per_page = page.pageSize

    if (this.reqParams.status === -1) {
      delete this.reqParams.status
    }
    this.getArticleList(this.reqParams)
  }
}
