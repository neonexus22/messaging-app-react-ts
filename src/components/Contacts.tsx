import { FaRegUserCircle } from 'react-icons/fa'
import { useAppContext, AppContextType } from 'App'

const Contacts = () => {
  const { contacts } = useAppContext() as AppContextType

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex items-center border-b border-gray-300 px-4 py-3
         hover:text-purple-600 hover:bg-purple-50 cursor-pointer"
        >
          <FaRegUserCircle className="mr-2" /> {contact.name}
        </div>
      ))}
    </div>
  )
}

export default Contacts
