'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [currentUser, setCurrentUSer] = useState(null)
    const [userDefaultOrg, setUserDefaultOrg] = useState({})
    const [subdomain, setSubdomain] = useState(null)
    const router = useRouter()


    useEffect(() => {
        // if (typeof window !== 'undefined') {
        //     const location = window.location.hostname
        //     const locationParts = location.split('.')
        //     setSubdomain(locationParts[0])
        //     //console.log(locationParts[0])
        // }

    }, [])

    useEffect(() => {
        if (subdomain === 'admin') {
            //router.replace('/admin')
        }
    }, [subdomain])



    //Set user from local storag
    //const currentUser = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        setCurrentUSer(JSON.parse(localStorage.getItem('user')))
    }, [])


    //Handelling app theme
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const value = localStorage.getItem('theme')
            return value || 'dark';
        }
    })

    const themeToggle = () => {
        console.log('App Theme Toggle')
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    useEffect(() => {
        localStorage.setItem('theme', theme)

        if (theme === 'dark') {
            document.querySelector('html').classList.add('dark')
            document.querySelector('html').classList.remove('light')
        } else {
            document.querySelector('html').classList.add('light')
            document.querySelector('html').classList.remove('dark')
        }

    }, [theme])





    return (
        <AppContext.Provider value={{ theme, themeToggle, currentUser, userDefaultOrg }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => useContext(AppContext)