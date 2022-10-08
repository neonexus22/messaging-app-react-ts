import React, { useContext } from 'react'
import { AppContext, AppContextType, RecipientType } from 'App'

const Conversation = () => {
  const {
    formattedRecipients,
    setSelectedConversationIndex,
  } = useContext<AppContextType | null>(AppContext) as AppContextType

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {formattedRecipients.map(
        (conversations: RecipientType, index: number) => (
          <div
            key={index}
            onClick={() => setSelectedConversationIndex(index)}
            className={`flex w-full items-center border-b border-gray-300 px-4 py-3
            hover:text-white hover:bg-purple-400 cursor-pointer text-clip ${
              conversations?.selected && 'bg-purple-200'
            }`}
          >
            {conversations?.recipients
              ?.map((recipient) => recipient.name)
              .join(', ')}
          </div>
        ),
      )}
    </div>
  )
}

export default Conversation
