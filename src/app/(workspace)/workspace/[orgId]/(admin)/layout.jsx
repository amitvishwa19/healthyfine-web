'use client'
import React from 'react'
import { Sidebar } from '@/app/(workspace)/workspace/[orgId]/(admin)/_components/sidenav/sidebar'
import { TopNav } from '@/app/(workspace)/workspace/[orgId]/(admin)/_components/topNav'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Footer } from '@/app/(workspace)/workspace/[orgId]/(admin)/_components/footer'
import { AdminModalProvider } from './_provider/AdminModalProvider'


// export const metadata = {
//     title: {
//         default: siteConfig.name,
//         template: `%s | ${siteConfig.name}`
//     },
//     description: siteConfig.description,
//     icon: {
//         icon: ['/fevicon.png?v=1'],
//         apple: ['/fevicon.png?v=4'],
//         shortcut: ['/fevicon.png?v=4']
//     },
//     // icons: [
//     //   {
//     //     url: '',
//     //     href: ''
//     //   }
//     // ],


//     manifest: '/site.webmanifest'
// }



function Layout({ children }) {
    //const patname = usePathname();
    //const router = useRouter()
    //const [progress, setProgress] = useState(50)
    //const { progress } = useSelector(state => state.loader)
    //const dispatch = useDispatch()


    return (
        <div>
            <AdminModalProvider />
            <div className='p-2'>
                {children}
            </div>
        </div>
    )
}

export default Layout