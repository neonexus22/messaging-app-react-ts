import React, { useContext, useState } from 'react'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { MdContacts } from 'react-icons/md'
import { AppContext, AppContextType } from 'App'
import Contacts from './Contacts'
import Conversation from './Conversation'
import SidebarFooter from './SidebarFooter'

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const { setActiveTab: setCurrentTab } = useContext<AppContextType | null>(
    AppContext,
  ) as AppContextType

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex)
    setCurrentTab(tabIndex)
  }

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => handleTabChange(0)}
          className={`sidebar-tab flex ${
            activeTab === 0 && 'text-purple-600 border-b-2 border-purple-600'
          }`}
        >
          <div className="flex items-center space-x-2">
            <BsFillChatDotsFill
              color={`${activeTab === 0 && 'text-purple-600'}`}
            />{' '}
            <p>Conversations</p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => handleTabChange(1)}
          className={`sidebar-tab ${
            activeTab === 1 && 'text-purple-600 border-b-2 border-purple-600'
          }`}
        >
          <div className="flex items-center space-x-2">
            <MdContacts color={`${activeTab === 0 && 'text-purple-600'}`} />{' '}
            <p>Contacts</p>
          </div>
        </button>
      </div>
      {activeTab === 0 ? <Conversation /> : <Contacts />}
      <div>
        <SidebarFooter />
      </div>
    </div>
  )
}

export default Sidebar
