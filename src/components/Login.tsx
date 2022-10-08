import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './styles.css'

type LoginProps = {
  onIdSubmit: (id: string) => void
}

const Login: React.FC<LoginProps> = ({ onIdSubmit }) => {
  const idRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (idRef?.current?.value) {
      onIdSubmit(idRef.current.value)
    }
  }

  const createNewId = () => {
    onIdSubmit(uuidv4())
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <div className="w-1/3 flex flex-col px-6 py-8 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <label className="mb-1.5 block text-slate-600">Enter your ID</label>
          <input
            type="text"
            id="id"
            name="id"
            ref={idRef}
            className="inputField w-full"
            placeholder="Please enter your Id or create a new one"
          />
          <div className="flex items-center w-full space-x-4 mt-4">
            <button type="submit" className="btn-primary">
              Login
            </button>
            <button onClick={createNewId} className="btn-secondary">
              Create a new ID
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
