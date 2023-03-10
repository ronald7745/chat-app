import NavBarr from './NavBarr'
import CardUser from './CardUser'
import style from './scss/index.module.scss'

interface chatProps {
  chats: String[] | null
  setChatOpen: Function
}

export default function ChatList ({ chats, setChatOpen }: chatProps) {
  return (
    <div className={style.container}>
      <NavBarr />
      <div className={style.cardsContainer}>
        {chats?.map((user: any, index) => <CardUser key={index} user={user.name} setChatOpen={setChatOpen} />)}
      </div>
    </div>
  )
}
