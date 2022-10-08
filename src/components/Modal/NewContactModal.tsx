import React, { useRef, useContext } from 'react'
import { toast } from 'react-toastify'
import { ImUserPlus } from 'react-icons/im'
import { AppContext, AppContextType } from 'App'

const ContactModal = () => {
  const { createContact, setIsModalOpen } = useContext<AppContextType | null>(
    AppContext,
  ) as AppContextType

  const idRef = useRef<HTMLInputElement | null>(null)
  const nameRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = () => {
    console.log('idRef.current', idRef.current)
    const id = idRef.current?.value
    const name = nameRef?.current?.value
    if (id && name) {
      createContact({ id, name })
      setIsModalOpen(false)
    } else {
      toast('You have invalid field(s)!', {
        type: 'error',
      })
    }
  }

  return (
    <div className="flex flex-col px-3 py-2">
      <div className="flex flex-col mb-2">
        <label>Id</label>
        <input
          className="inputField"
          name="id"
          ref={idRef}
          type="text"
          required
        />
      </div>
      <div className="flex flex-col">
        <label>Name</label>
        <input
          className="inputField"
          name="name"
          ref={nameRef}
          type="text"
          required
        />
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
          <ImUserPlus className="mr-2" /> Add Contact
        </button>
      </div>
    </div>
  )
}

export default ContactModal
