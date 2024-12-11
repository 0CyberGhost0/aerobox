import Header from '@/components/ui/Header'
import MobileNavigation from '@/components/ui/MobileNavigation'
import Sidebar from '@/components/ui/Sidebar'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({children}:{children:React.ReactNode}) => {
  const currentUser=await getCurrentUser();
  if(!currentUser) return redirect("/sign-in")
  return (
    <main className='flex h-screem'>
        <Sidebar {...currentUser}/>
        <section className='flex h-full flex-1 flex-col'>
            <MobileNavigation {...currentUser}/> <Header/>
            <div className='main-content'>{children}</div>
        </section>

    </main>
  )
}

export default Layout