import React, { Component } from 'react'
import NotificationSystem from 'react-notification-system'

let notificationSystem = null

export default class Notification extends Component {
  componentDidMount() {
    notificationSystem = this.refs.notificationSystem
  }

  render() {
    return <NotificationSystem ref="notificationSystem"/>
  }
}

export function addNotification(o) {
  if (notificationSystem) {
    notificationSystem.addNotification(Object.assign({}, o, {
      position: 'br'
    }))
  }
}
