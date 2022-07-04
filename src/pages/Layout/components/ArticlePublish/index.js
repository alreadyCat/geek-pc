import React, { Component } from 'react'
import { Breadcrumb, Card, Form, Input, Upload, Button, Radio, Space, Modal, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ChannelSelect from 'components/ChannelSelect'
import style from './index.module.scss'
import { addArticle, editArticle, findArticle } from 'api/article'
import { Link } from 'react-router-dom'

export default class ArticlePublish extends Component {
  state = {
    loading: false,
    type: 1,
    filelist: [],
    modalVisible: false,
    previewImage: '',
    id: this.props.history.location.search?.slice(4)
  }
  formRef = React.createRef()
  uploadButton = (
    <div>
      {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  )
  render() {
    return (
      <div className={style['article-publish-container']}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.id ? '编辑文章' : '发布文章'}</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            ref={this.formRef}
            validateTrigger={['onChange']}
            onFinish={this.onFinish}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 12 }}
            initialValues={{
              type: this.state.type,
              content: ''
            }}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '请输入文章标题'
                },
                {
                  min: 3,
                  max: 24,
                  message: '长度只能在3-24个字符之内'
                }
              ]}
              wrapperCol={{ span: 8 }}
            >
              <Input placeholder="请输入文章标题"></Input>
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 8 }}
              label="频道"
              name="channel_id"
              rules={[
                {
                  required: true,
                  message: '请选择频道'
                }
              ]}
            >
              <ChannelSelect></ChannelSelect>
            </Form.Item>
            <Form.Item label="封面" name="type">
              <Radio.Group onChange={this.changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>

            {this.state.type !== 0 && (
              <Form.Item wrapperCol={{ offset: 4 }} name="cover">
                <Upload
                  fileList={this.state.filelist}
                  name="image"
                  listType="picture-card"
                  className="avatar-uploader"
                  action="http://geek.itheima.net/v1_0/upload"
                  onChange={this.onChange}
                  beforeUpload={this.beforeUpload}
                  onPreview={this.onPreview}
                >
                  {this.state.filelist.length < this.state.type && this.uploadButton}
                </Upload>
              </Form.Item>
            )}
            <Form.Item label="内容" name="content">
              <ReactQuill theme="snow" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  {this.state.id ? '立即保存' : '发布文章'}
                </Button>
                <Button onClick={this.addDraft}>存为草稿</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        <Modal
          title="图片预览"
          visible={this.state.modalVisible}
          footer={null}
          onCancel={this.onCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
      </div>
    )
  }
  onFinish = (value) => {
    this.save(value, false)
  }
  addDraft = async () => {
    const res = await this.formRef.current.validateFields()
    this.save(res, true)
  }
  save = async (value, draft) => {
    const { type, filelist } = this.state
    if (type !== filelist.length) return message.warning('上传图片数量不正确！')

    const images = filelist.map((item) => {
      return item.url || item.response.data.url
    })

    try {
      if (this.state.id) {
        // 修改
        await editArticle({
          ...value,
          id: this.state.id,
          cover: {
            type,
            images
          }
        })
        message.success('修改成功')
      } else {
        //添加

        await addArticle(
          {
            ...value,
            cover: {
              type,
              images
            }
          },
          draft
        )
        message.success('添加成功')
      }
    } catch (error) {
      message.error('网络出了点小差错')
    }
  }
  changeType = (e) => {
    this.setState({
      type: e.target.value,
      filelist: []
    })
  }
  onChange = ({ file, fileList, event }) => {
    this.setState({
      filelist: fileList,
      loading: false
    })
  }
  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('你只能上传jpg|jpeg|png|webp格式文件')
      return Upload.LIST_IGNORE
    }
    const isLt500K = file.size / 1024 < 500
    if (!isLt500K) {
      message.error('图片大小必须小于 500KB!')
      return Upload.LIST_IGNORE
    }

    this.setState({
      loading: true
    })
    return true
  }
  onPreview = (file) => {
    const url = file.url || file.response.data.url
    this.setState({
      previewImage: url,
      modalVisible: true
    })
  }
  onCancel = () => {
    this.setState({
      modalVisible: false
    })
  }
  componentDidMount = async () => {
    if (this.state.id) {
      const { data } = await findArticle(this.state.id)
      console.log(data)
      this.formRef.current.setFieldsValue({
        ...data,
        type: data.cover.type
      })

      this.setState({
        type: data.cover.type,
        filelist: data.cover.images?.map((item) => {
          return {
            url: item
          }
        })
      })
    }
  }
}
