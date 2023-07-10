import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { axios } from '@/lib/axios'
import { ChatContext } from '@/components/chat-components/chat-sub-components/ChatContext'

export const ChatTemplate = () => {
    const [userSelect, setUserSelect] = useState<any>(false)
    const [userEmployeeSelect, setEmployeeUserSelect] = useState<any>(false)
    const [userEmployerSelect, setEmployerUserSelect] = useState<any>(false)
    const [loading, setLoading] = useState(false)
    const [employerChatUsers, setEmployerChatUsers] = useState<
        SetStateAction<object>
    >([])
    const [employeeChatUsers, setEmployeeChatUsers] = useState<
        SetStateAction<object>
    >([])
    const [chatSearch, setChatSearch] = useState('')
    const [chatMessages, setChatMessages] = useState<SetStateAction<object>>([])
    const [activeChat, setActiveChat] = useState(null)
    const [showChatWindow, setShowChatWindow] =
        useState<SetStateAction<boolean>>(false)
    const [participant, setParticipant] = useState({})
    const [sendMessage, setSendMessage] = useState('')
    const messageRef = useRef()
    const handleSubmit = (event: any) => {
        console.log('I am clicked', event)
    }
    const handleEmployeeButtonSelect: any = () => {
        setEmployeeUserSelect(!userEmployeeSelect)
        setEmployerUserSelect(false)
    }
    const handleEmployerButtonSelect: any = () => {
        setEmployerUserSelect(!userEmployerSelect)
        setEmployeeUserSelect(false)
    }

    const handleInput = (event: any) => {
        setChatSearch(event.target.value)
        console.log('You have written something in input')
    }

    // const handleSingleChatSelection = () => {
    //     setUserSelect(!userSelect)
    // }

    const selectChat = async (participantUserId: any) => {
        setShowChatWindow(true)
        await axios
            .post(`/api/v1/admin/chat-messages`, {
                participant_id: participantUserId.id,
            })
            .then(response => {
                if (response.status === 200) {
                    console.log(response?.data, 'Data.....')
                    setChatMessages(response?.data)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    // useEffect(() => {
    //
    // },[])

    const fetchTalentChatUser = async () => {
        setLoading(true)
        await axios.get(`/api/v1/admin/employee-chats/all`).then(response => {
            if (response?.status === 200) {
                // console.log(response?.data)
                setEmployeeChatUsers(response?.data)
                setLoading(false)
            }
        })
    }
    const fetchEmployerChatUser = async () => {
        setLoading(true)
        await axios.get(`/api/v1/admin/employer-chats/all`).then(response => {
            if (response?.status === 200) {
                setEmployerChatUsers(response?.data)
                // console.log(response?.data)
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        fetchEmployerChatUser()
        fetchTalentChatUser()
    }, [])
    return (
        <section className={'flex w-full items-center justify-center'}>
            <ChatContext
                userSelect={userSelect}
                userEmployeeSelect={userEmployeeSelect}
                userEmployerSelect={userEmployerSelect}
                loading={loading}
                setLoading={setLoading}
                sendMessage={sendMessage}
                chatSearch={chatSearch}
                chatMessages={chatMessages}
                selectChat={selectChat}
                handleSubmit={handleSubmit}
                handleInput={handleInput}
                employeeChatUsers={employeeChatUsers}
                employerChatUsers={employerChatUsers}
                handleEmployeeButtonSelect={handleEmployeeButtonSelect}
                handleEmployerButtonSelect={handleEmployerButtonSelect}
            />
        </section>
    )
}
