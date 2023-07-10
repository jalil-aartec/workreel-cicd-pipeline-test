import React from 'react'
import { ChatUsers } from '@/components/chat-components/chat-sub-components/ChatUsers'
import { ChatHeader } from '@/components/chat-components/chat-sub-components/ChatHeader'
import { ChatWindow } from '@/components/chat-components/chat-sub-components/ChatWindow'
import { ChatFooter } from '@/components/chat-components/chat-sub-components/ChatFooter'
import { ChatButtons } from '@/components/chat-components/chat-sub-components/ChatButtons'
import { ChatWelcome } from '@/components/chat-components/chat-sub-components/ChatWelcome'

export const ChatContext = ({
    handleEmployeeButtonSelect,
    handleEmployerButtonSelect,
    userEmployeeSelect,
    userEmployerSelect,
    chatSearch,
    handleInput,
    handleSubmit,
    sendMessage,
    chatMessages,
    employeeChatUsers,
    employerChatUsers,
    selectChat,
    userSelect,
    loading,
    setLoading,
}) => {
    return (
        <>
            <div className={'flex flex-row h-full w-full'}>
                <div className="hidden min-h-screen md:flex md:flex-shrink-0 border-tr border border-gray-100">
                    <div className="flex flex-col h-full w-96 bg-white">
                        <div
                            className={
                                'flex w-full items-center justify-center bg-white px-4 top-0 sticky z-10'
                            }>
                            <ChatButtons
                                handleInput={handleInput}
                                chatSearch={chatSearch}
                                handleEmployeeButtonSelect={
                                    handleEmployeeButtonSelect
                                }
                                handleEmployerButtonSelect={
                                    handleEmployerButtonSelect
                                }
                                userEmployerSelect={userEmployerSelect}
                                userEmployeeSelect={userEmployeeSelect}
                            />
                        </div>
                        <div
                            className={
                                'flex w-full items-center justify-center'
                            }>
                            <ChatUsers
                                employeeChatUsers={employeeChatUsers}
                                employerChatUsers={employerChatUsers}
                                userEmployerSelect={userEmployerSelect}
                                userEmployeeSelect={userEmployeeSelect}
                                selectChat={selectChat}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={
                        'flex flex-col min-h-screen items-center justify-center'
                    }>
                    {!employerChatUsers ? (
                        <>
                            <div className={'flex w-full sticky top-0 z-10'}>
                                <ChatHeader />
                            </div>
                            <div
                                className={
                                    'flex flex-col h-full items-center justify-between'
                                }>
                                <ChatWindow chatMessages={chatMessages} />
                                <ChatFooter
                                    sendMessage={sendMessage}
                                    handleSubmit={handleSubmit}
                                    handleInput={handleInput}
                                />
                            </div>
                        </>
                    ) : (
                        <ChatWelcome />
                    )}
                </div>
            </div>
        </>
    )
}
