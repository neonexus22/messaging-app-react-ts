import React, { useState, useRef, useEffect } from 'react'
import { ImUser, ImUsers } from 'react-icons/im'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { BsEmojiSmile } from 'react-icons/bs'
import { useAppContext } from 'App'

const OpenConversation = () => {
  const lastMessageRef: React.LegacyRef<HTMLDivElement> | undefined = useRef(
    null,
  )
  const { selectedConversation, sendMessage } = useAppContext()
  const [text, setText] = useState('')
  console.log('selectedConversation', selectedConversation)

  const recipients = selectedConversation?.recipients || []
  const icon =
    recipients.length > 1 ? (
      <ImUsers className="mr-2" />
    ) : recipients.length > 0 ? (
      <ImUser className="mr-2" />
    ) : null
  const receit = recipients
    .slice(0, 2)
    .map((recipient) => recipient.name)
    .join(',')
  const user =
    recipients.length > 2
      ? `${receit}... +${recipients.length - 2}`
      : `${receit}`

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef?.current?.scrollIntoView(true)
    }
  }, [selectedConversation?.messages.length])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (text) {
      sendMessage(
        selectedConversation?.recipients?.map((r) => r.id),
        text,
      )
      setText('')
    }
  }

  return (
    <section className="relative h-screen bg-white w-full flex flex-col">
      <div
        className="h-14 my-auto flex items-center px-4
       bg-purple-600 text-white"
      >
        {icon} {user}
      </div>
      <div className="flex-1 flex flex-col overflow-y-scroll p-5 space-y-5 ">
        {selectedConversation?.messages?.map((message, index) => (
          <div
            key={index}
            ref={
              index === selectedConversation.messages.length - 1
                ? lastMessageRef
                : null
            }
          >
            {!message?.fromMe && (
              <div className="flex w-full justify-start">
                <div className="flex flex-col space-y-5 text-left">
                  <div>
                    <span
                      className="bg-gray-100 text-gray-900 px-3 py-2 
              text-base rounded-r-lg rounded-b-lg  border border-slate-400
              inline-flex max-w-xl 
              "
                    >
                      {message?.text}
                    </span>
                    <div className="text-gray-500 text-xs">
                      {message?.senderName}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {message?.fromMe && (
              <div className="flex w-full justify-end">
                <div className="space-y-5 text-right">
                  <div
                    className="bg-purple-200
             text-slate-900 px-4 py-2 text-base 
             rounded-l-lg rounded-b-lg border border-purple-600
             inline-block max-w-xl "
                  >
                    {message?.text}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex-none p-5">
        <div>
          <div className="relative flex ">
            <span className="absolute inset-y-0 flex items-center ">
              <button
                type="button"
                className="btn-secondary inline-flex items-center justify-center
                rounded-full h-12 w-12 transition duration-300 ease-in-out 
                focus:outline-none
              "
              >
                <BsEmojiSmile />
              </button>
            </span>
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 ml-5 box-border h-20 border-t 
              border-slate-300 items-center justify-center"
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message"
                className="inputField h-12 w-10/12"
              />
              <button
                type="submit"
                className="btn-primary h-12 flex items-center"
              >
                Send <RiSendPlane2Fill className="ml-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OpenConversation
