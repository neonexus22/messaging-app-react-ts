import React from 'react'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'

const Dashboard = () => {
  return (
    <div className="flex w-full h-full">
      <div className="w-1/4 border-r border-slate-300 h-full">
        <Sidebar />
      </div>
      <div className="w-3/4 h-full">
        <OpenConversation />
      </div>
    </div>
  )
}

export default Dashboard
