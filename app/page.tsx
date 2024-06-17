import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const page = async() => {
  const session=await getServerSession()
  if(session){
    redirect('/configureDispenser')
  }else{
    redirect('/login')
  }
}

export default page