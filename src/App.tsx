import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react'
import { ToastContainer } from 'react-toastify'
import PureModal from 'react-pure-modal'
import Login from 'components/Login'
import Dashboard from 'components/Dashboard'
import NewContactModal from 'components/Modal/NewContactModal'
import NewConversationModal from 'components/Modal/NewConversationModal'
import { arrayEquality } from 'components/utils'
import useLocalStorage from 'hooks/useLocalStorage'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import 'react-toastify/dist/ReactToastify.css'
import io, { Socket } from 'socket.io-client'

export type ContactType = {
  id: string
  name: string
}

export type MessageType = {
  sender: string | number
  text: string
  senderName?: string
  fromMe?: boolean
}

export type AddMessageType = {
  recipients: (number | string)[]
  text: string
  sender: number | string
}

export type ConversationType = {
  recipients: (number | string)[]
  messages: MessageType[]
}

export type RecipientType = {
  recipients: {
    id: number | string
    name: string | number
  }[]
  messages: MessageType[]
  selected: boolean
}

export type AppContextType = {
  id: string
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  contacts: ContactType[]
  createContact: ({ id, name }: ContactType) => void
  activeTab: number
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
  formattedRecipients: RecipientType[]
  createConversation: (recipient: (string | number)[]) => void
  // selectedConversationIndex: number
  selectedConversation: RecipientType
  setSelectedConversationIndex: React.Dispatch<React.SetStateAction<number>>
  sendMessage: (recipients: (string | number)[], text: string) => void
}

export const AppContext = createContext<AppContextType | null>(null)

export const useAppContext = () => {
  return useContext(AppContext) as AppContextType
}

function App() {
  const [id, setId] = useLocalStorage('id')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [contacts, setContacts] = useLocalStorage('contacts', [])
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [socket, setSocket] = useState<any>()

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      query: { id },
    })
    setSocket(newSocket)
    return () => {
      newSocket.close()
    }
  }, [id])

  function createContact({ id, name }: ContactType) {
    setContacts((prevContacts: ContactType[]) => {
      return [...prevContacts, { id, name }]
    })
  }

  function createConversation(recipients: (string | number)[]) {
    setConversations((prevConversations: ConversationType[]) => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }: AddMessageType) => {
      setConversations((prev: ConversationType[]) => {
        let madeChanges = false
        const newMessage = {
          sender,
          text,
        }
        const newConversations = prev?.map((conversation) => {
          if (arrayEquality(conversation?.recipients, recipients)) {
            madeChanges = true
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            }
          }
          return conversation
        })

        if (madeChanges) {
          return newConversations
        } else {
          return [...prev, { recipients, messages: [newMessage] }]
        }
      })
    },
    [setConversations],
  )

  useEffect(() => {
    if (!socket) return
    socket?.on('receive-message', addMessageToConversation)
    return () => {
      socket.off('receive-message')
    }
  }, [socket, addMessageToConversation])

  function sendMessage(recipients: (string | number)[], text: string) {
    socket?.emit('send-message', { recipients, text })
    addMessageToConversation({ recipients, text, sender: id })
  }

  const formattedRecipients = conversations.map(
    (conversation: ConversationType, index: number) => {
      const recipients = conversation?.recipients?.map((recipient) => {
        const contact: ContactType = contacts.find(
          (contact: ContactType) => contact.id === recipient,
        )
        return {
          id: recipient,
          name: contact?.name || recipient,
        }
      })

      const messages = conversation?.messages?.map((message: MessageType) => {
        const contact = contacts.find(
          (c: ContactType) => c.id === message.sender,
        )
        const fromMe = id === message.sender
        return {
          ...message,
          senderName: contact?.name || message.sender,
          fromMe,
        }
      })
      const selected = index === selectedConversationIndex

      return { ...conversation, recipients, selected, messages }
    },
  ) as RecipientType[]

  const isConversation = activeTab === 0

  return (
    <div className="w-screen h-screen bg-slate-100">
      <AppContext.Provider
        value={{
          id,
          isModalOpen,
          setIsModalOpen,
          contacts,
          createContact,
          activeTab,
          setActiveTab,
          formattedRecipients,
          createConversation,
          // selectedConversationIndex,
          selectedConversation: formattedRecipients[selectedConversationIndex],
          setSelectedConversationIndex,
          sendMessage,
        }}
      >
        {id ? <Dashboard /> : <Login onIdSubmit={setId} />}

        <PureModal
          header={
            isConversation ? (
              <label className="block px-3 text-purple-600 font-bold">
                New Conversation
              </label>
            ) : (
              <label className="block px-3 text-purple-600 font-bold">
                New Contact
              </label>
            )
          }
          // footer={
          //   <div>
          //     <button>Cancel</button>
          //     <button>Save</button>
          //   </div>
          // }
          width="450px"
          isOpen={isModalOpen}
          closeButton="&times;"
          onClose={() => {
            setIsModalOpen(false)
            return true
          }}
        >
          {isConversation ? <NewConversationModal /> : <NewContactModal />}
        </PureModal>
      </AppContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
