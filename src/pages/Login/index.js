import React, { Component } from 'react'
import style from './index.module.scss'
import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from 'assets/images/logo.png'
import { login } from 'api/user'
import { setToken } from 'utils/storage'
export default class Login extends Component {
  state = {
    loading: false,
  }
  render() {
    return (
      <div className={style['login-container']}>
        <Card className="login-card">
          <img src={logo} className="login-logo" alt="" />
          <Form
            autoComplete="off"
            size="middle"
            validateTrigger={['onBlur']}
            onFinish={this.onFinish}
            initialValues={{
              mobile: '13487192302',
              code: '246810',
              agree: true,
            }}
          >
            <Form.Item
              required
              label="手机号"
              name="mobile"
              labelCol={{
                span: 4,
              }}
              rules={[
                {
                  required: true,
                  message: '请输入你的手机号 !',
                  validateTrigger: 'onBlur',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号格式错误',
                },
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item
              label="验证码"
              name="code"
              labelCol={{
                span: 4,
              }}
              rules={[
                {
                  required: true,
                  message: '请输入你的验证码!',
                  validateTrigger: 'onBlur',
                },
              ]}
            >
              <Input.Password placeholder="请输入验证码" />
            </Form.Item>

            <Form.Item
              valuePropName="checked"
              wrapperCol={{
                offset: 4,
              }}
              name="agree"
              rules={[
                {
                  validator: (_, v) =>
                    v
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('请阅读并同意勾选用户协议条款')
                        ),
                },
              ]}
            >
              <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={this.state.loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  onFinish = async (v) => {
    try {
      this.setState({
        loading: true,
      })

      const res = await login(v)
      setToken(res.data.token)

      const redirectPath = this.props.location.state
        ? this.props.location.state.from
        : '/home'
      this.props.history.push(redirectPath)
      message.success('登录成功', 2)
    } catch (error) {
      message.error(error.response.data.message, 2, () => {
        this.setState({
          loading: false,
        })
      })
    }
  }
}
