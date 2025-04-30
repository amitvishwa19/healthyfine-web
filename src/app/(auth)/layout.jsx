import React from 'react'
import coverImage from '@/assets/images/auth_cover_image.jpg'
//import coverImage2 from '@/assets/images/auth_cover_image_2.jpg'
import { AppLogo } from '@/components/global/AppLogo'
//import { Provider } from 'react-redux'
//import store from '@/redux/store/store'


export default function Layout({ children }) {

    return (
        // <Provider store={store}>
        <div className='flex min-h-screen items-center justify-center'
            style={{ backgroundImage: `url(${coverImage.src}) `, backgroundSize: 'cover', backgroundRepeat: "no-repeat" }}>
            <div className=' md:flex lg:flex overflow-hidden  h-screen justify-center items-center p-28 '>
                <div className='flex flex-col gap-10   bg-black/60 p-20 rounded-lg'>
                    <h1 className='text-6xl font-extrabold'>
                        The all-in-one platform for project management
                    </h1>
                    <p>
                        Devlomatix brings teams closer together with connected workflows,
                        docs, real-time dashboards and more—helping everyone move faster,
                        work smarter, and save time.
                    </p>
                    <ul className='list-disc justify-start gap-4 leading-loose'>
                        <li>
                            All-in-one knowledge and work management
                        </li>
                        <li>
                            Tailored views for cross-functional projects
                        </li>
                        <li>
                            Increase efficiency with automation and reporting
                        </li>
                        <li>
                            Standardize and scale project management best practices
                        </li>
                    </ul>
                </div>
            </div>

            <div className='flex flex-1 flex-col h-screen justify-center bg-slate-900/90 p-10 rounded'>
                <div className='flex  justify-center mb-10'>

                    <AppLogo size={150} link={'/'} />
                </div>

                <div className='h-fit'>
                    {children}
                </div>

            </div>
        </div>


        // </Provider>
    )
}