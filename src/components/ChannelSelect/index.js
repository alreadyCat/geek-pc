import React, { Component } from 'react'
import { getChannelList } from 'api/article'
import { Select } from 'antd'
const { Option } = Select
export default class index extends Component {
  state = {
    channels: []
  }
  render() {
    return (
      <Select value={this.props.value} onChange={this.props.onChange}>
        {this.state.channels.map((channel, index) => {
          return (
            <Option value={channel.id} key={index}>
              {channel.name}
            </Option>
          )
        })}
      </Select>
    )
  }
  componentDidMount = () => {
    this.getChannelList()
  }

  getChannelList = async () => {
    const { data } = await getChannelList()
    this.setState({
      channels: data.channels
    })
  }
}
