import { SyncOutlined } from "@ant-design/icons"
import { Avatar, Button } from "antd"
import React, { useEffect, useState } from "react"
import User from '../types/user'

const UserSet = ({ onChange }: { onChange: Function }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const rand = async () => {
        setLoading(true)
        const res = await fetch('/api/user/random')
        const u: User = await res.json()
        if (u.author != user?.author) {
            setUser(u)
            onChange(u)
            setLoading(false)
        } else {
            rand()
        }
    }
    useEffect(() => {
        if(!user){
            rand()
        }
    }, [user])
    return (
        <>
            <Avatar src={user?.avatar} />
            &nbsp;&nbsp;
            {user?.author}
            &nbsp;&nbsp;
            <Button shape="circle" loading={loading} onClick={() => {
                rand()
            }}><SyncOutlined /></Button>
        </>
    )
}
export default UserSet