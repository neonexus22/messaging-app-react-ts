import React, { ReactNode, useContext, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

type SocketProviderType = {
  id: string
  children: ReactNode
}

const ScoketContext = React.createContext<Socket<any, any> | undefined>(
  undefined,
)

export function useSocket() {
  return useContext(ScoketContext) as Socket<any, any>
}

const SocketProvider = ({ id, children }: SocketProviderType) => {
  const [socket, setSocket] = useState<Socket<any, any>>()
  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      query: { id },
    })
    setSocket(newSocket)
    return () => {
      newSocket.close()
    }
  }, [id])

  return (
    <ScoketContext.Provider value={socket}>{children}</ScoketContext.Provider>
  )
}

export default SocketProvider
