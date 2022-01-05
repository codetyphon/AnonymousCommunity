import { Card, Space, Input, Table, Button, Spin, Modal, Select, List, Avatar, Badge, Comment, Breadcrumb } from 'antd'
import React, { useEffect, useState, useMemo } from 'react'
import Editor from './comm/edit';
import moment from 'moment';
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'

export default function Topic() {
  const { id } = useParams();
  const [topic, setTopic] = useState<any | null>(null)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  const getTopic = async () => {
    setSpinning(true)
    const res = await fetch(`/api/topic/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    const topic = await res.json()
    console.log(topic)

    setTopic(topic)
    setSpinning(false)
  }

  useEffect(() => {
    getTopic()
  }, [])
  return (
    <Spin tip="Loading..." spinning={spinning}>
      <Card>
        <Breadcrumb>
          <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
          <Breadcrumb.Item>
            topic
          </Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <Card title={<h2>{topic?.title}</h2>}>
        <Avatar src={topic?.avatar} size={30} /> {topic?.author} {moment(topic?.time * 1000).format("YYYY-MM-DD HH:MM")}
      </Card>
      <Card>
        <ReactMarkdown children={topic?.text} />
      </Card>
      <Card title={<h2>{topic?.replys?.length || 0} Replies</h2>} extra={<Button onClick={() => {
        setShowModal(true)
      }} type="primary">Reply</Button>}>
        <List
          dataSource={topic?.replys}
          renderItem={(item: any) => (
            <List.Item key={item?.id}>
              <Comment
                // actions={[<span key={`comment-list-reply-to-${item?._id}`}>Reply to</span>]}
                author={item?.author}
                avatar={item?.avatar}
                content={<ReactMarkdown children={item?.text} />}
                datetime={moment(item?.time * 1000).format("YYYY-MM-DD HH:MM")}
              />
            </List.Item>
          )} />
      </Card>
      <Card>
        <Modal title="Reply" visible={showModal}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          onCancel={() => { setShowModal(false) }}
        >
          <Editor onSubmit={async (data: any) => {
            console.log(data)
            setSubmitting(true)
            const res = await fetch('/api/reply', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(Object.assign(data, { topicId: id }))
            })
            const json = await res.json()
            console.log(json)
            setSubmitting(false)
            getTopic()
            setShowModal(false)
          }} submitting={submitting} showTitle={false} value={{}} buttonTitle="Reply" />
        </Modal>
      </Card>
    </Spin >
  )
}