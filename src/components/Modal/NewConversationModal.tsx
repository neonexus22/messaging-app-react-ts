import { useAppContext, AppContextType } from 'App'
import { useState } from 'react'
import { BsFillChatDotsFill } from 'react-icons/bs'

const ConversationModal = () => {
  const {
    contacts,
    setIsModalOpen,
    createConversation,
  } = useAppContext() as AppContextType

  const [selectedContactIds, setSelectedContactIds] = useState<
    (string | number)[]
  >([])

  const handleCheckboxClick = (id: number | string) => {
    setSelectedContactIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((contactId) => contactId !== id)
      }
      return [...prev, id]
    })
  }

  const handleSubmit = () => {
    createConversation(selectedContactIds)
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-2">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center border-b border-gray-300 px-4 py-3
         hover:text-purple-600 hover:bg-purple-50 cursor-pointer"
          >
            <label>
              <input
                type="checkbox"
                onClick={() => handleCheckboxClick(contact.id)}
                className="mr-3"
              />{' '}
              {contact.name}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <button onClick={() => setIsModalOpen(false)} className="btn-secondary">
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex items-center btn-primary"
        >
          <BsFillChatDotsFill className="mr-2" /> Add Conversation
        </button>
      </div>
    </div>
  )
}

export default ConversationModal
