import { Button, Form, Input, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import User from "../types/user";
import UserSet from "./user";

const Editor = ({ onSubmit, submitting, value, buttonTitle, showTitle }: {
    onSubmit: Function,
    submitting: any,
    value?: any,
    showTitle: boolean,
    buttonTitle: string
}) => {
    const [title, setTitle] = useState<string>(value?.title || "")
    const [text, setText] = useState<string>(value?.text || "")
    const [user, setUser] = useState<User | null>(null)
    return (
        <>
            <Form.Item>
                <UserSet onChange={(user: User) => {
                    setUser(user)
                }} />
            </Form.Item>
            {
                showTitle && <Form.Item>
                    <Input placeholder="Enter a subject" value={title} onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                </Form.Item>
            }
            <Form.Item>
                <TextArea rows={4} onChange={(e) => {
                    setText(e.target.value)
                }} value={text} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={() => {
                    if (showTitle) {
                        if (title === "") {
                            message.error("title NULL")
                            return false
                        }
                    }
                    if (text === "") {
                        message.error("text NULL")
                        return false
                    }
                    onSubmit(Object.assign({ time: Date.now() }, { text: text }, { author: user?.author }, { avatar: user?.avatar }, showTitle ? { title: title } : {}))
                    setTitle("")
                    setText("")
                }} type="primary">{buttonTitle}</Button>
            </Form.Item>
        </>)
}

export default Editor