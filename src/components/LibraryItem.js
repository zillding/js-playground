import React from 'react'

const LibraryItem = ({ data }) => {
  const { name, url, status } = data

  return (
    <li>
      <a href={url}>{ name || url }</a>
      <Icon status={status} />
    </li>
  )
}

export default LibraryItem

const Icon = ({ status }) => {
  const style = {
    marginLeft: 10
  }

  switch (status) {
    case 'loaded':
      Object.assign(style, {
        color: 'green'
      })
      return <i className="fa fa-check" style={style}></i>
    case 'error':
      Object.assign(style, {
        color: 'red'
      })
      return <i className="fa fa-times" style={style}></i>
    default:
      return <i className="fa fa-spinner fa-pulse" style={style}></i>
  }
}
