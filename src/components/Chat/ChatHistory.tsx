import ScrollToBottom from './ScrollToBottom'
import CardMessage from './CardMessage'
import style from './scss/ChatHistory.module.scss'

export default function ChatHistory ({ User, chatOpen, messages }: { User : String | null, chatOpen: String, messages: any }) {
  const my = messages.filter((msg: any) => msg.user_id === User && msg.send_to === chatOpen)
  const other = messages.filter((msg: any) => msg.user_id === chatOpen && msg.send_to === User)
  const Msg = [...my, ...other].sort((a, b) => a.id - b.id)

  return (
    <div className={style.container}>
      {Msg?.map((item: any, index: number) => <CardMessage key={index} item={item} User={User} />)}
      <ScrollToBottom Msg={Msg} />
    </div>
  )
}
