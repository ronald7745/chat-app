'use client'
import { supabase } from '@/utils'
import { useEffect, useState } from 'react'
import { Chat, ChatList } from '@/components'
import style from './page.module.scss'

export default function Home () {
  const [chats, setChats] = useState<String[] | any>(['test 1', 'test 2'])
  const [chatOpen, setChatOpen] = useState(null)
  const [messages, setMessages] = useState<any>([])
  const [User, setUser] = useState(null)

  useEffect(() => {
    const getChats = async () => {
      const { data: { session: { user: { user_metadata: user } } } }: any = await supabase.auth.getSession()
      setUser(user.user_name)

      const { data } = await getUsers()
      const filter = data?.filter((users) => users.name !== user.user_name)
      setChats(filter)

      const userExist: any = data?.filter((users) => users.name === user.user_name)

      if (!userExist[0]) {
        newUser(user.user_name)
      }

      const { data: listMessages }: any = await supabase.from('messages').select('*')
      setMessages(listMessages)
    }
    getChats()
  }, [])

  supabase.channel('messages')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'messages' },
      (payload: any) => {
        setMessages([...messages, payload.new])
      }
    )
    .subscribe()

  return (
    <div className={style.container}>
      <ChatList chats={chats} setChatOpen={setChatOpen} />
      <Chat chatOpen={chatOpen} messages={messages} User={User} />
    </div>
  )
}

const getUsers = async () => await supabase.from('users_public').select('*')

const newUser = async (userName: String) => await supabase.from('users_public').insert([{ name: userName }])
