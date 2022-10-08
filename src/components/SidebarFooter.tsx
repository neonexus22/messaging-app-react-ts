import React, { useContext } from 'react'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { MdContacts } from 'react-icons/md'
import { AppContext, AppContextType } from 'App'

const SidebarFooter = () => {
  const { id, setIsModalOpen, activeTab } = useContext<AppContextType | null>(
    AppContext,
  ) as AppContextType
  const tabType = activeTab === 0 ? 'Conversation' : 'Contact'
  const iconType =
    activeTab === 0 ? (
      <BsFillChatDotsFill className="mr-3" />
    ) : (
      <MdContacts className="mr-3" />
    )
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col px-2 py-3 border-t">
        <p className="font-semibold">Your Id:</p>
        <p className="text-sm font-semibold truncate">{id}</p>
      </div>
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center btn-primary w-full mb-4"
        >
          {iconType} New {tabType}
        </button>
      </div>
    </div>
  )
}

export default SidebarFooter
