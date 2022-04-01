import React, { Component } from 'react'
import './index.scss'
import { Card, Form, Input, Button, Checkbox } from 'antd'
import logo from 'assets/images/logo.png'
export default class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <Card className="login-card">
          <img src={logo} className="login-logo" alt="" />
          <Form
            autoComplete="off"
            size="middle"
            validateTrigger={['onBlur']}
            onFinish={this.onFinish}
            initialValues={{
              mobile: 13487192302,
              code: 246810,
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
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  onFinish = (v) => {
    console.log(v)
  }
}
