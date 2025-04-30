'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAction } from '@/hooks/use-action'
import { getOrgData } from '@/app/(workspace)/workspace/_action/server/get_org_data'
import { io } from 'socket.io-client'
import { useAuth } from './AuthProvider'
import { useChatQuery } from '@/hooks/useChatQuery'
import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from 'next-auth/react'

export const OrgContext = createContext()


export const OrgProvider = ({ children }) => {
    //const [server, setServer] = useState(localStorage.getItem('server') ? JSON.parse(localStorage.getItem('server')) : null)
    //const [servers, setServers] = useState(localStorage.getItem('servers') ? JSON.parse(localStorage.getItem('servers')) : [])

    const [server, setServer] = useState(null)
    const [servers, setServers] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [chatMessages, setChatMessages] = useState([])
    const [socket, setSocket] = useState(undefined)
    const [chatPages, setChatPages] = useState([])
    const { user } = useAuth()
    const { data: session, status } = useSession()


    const fetchChatMessages = (data) => {
        console.log('Fetching chat messages from server', data)
    }

    useEffect(() => {
        const socket = io('http://3.109.121.161:5000/')
        setSocket(socket)
        //console.log(socket)

        socket.on("connect", () => {
            console.log(`Connected to server-org provider!, id:${socket.id}`);
        });

        socket.on('new-message-post', (data) => {
            //console.log('received in io', data.message, data.query)
            //console.log('User', user)
            if (data.query.userId !== user.id) {

                let tempitems = chatPages[0]?.items
                tempitems.unshift(data.message)
                if (tempitems.length > 10) {
                    tempitems.pop()
                }

                setChatPages(prevItem => {
                    const updatedArray = [...prevItem];
                    updatedArray[0] = { ...updatedArray[0], items: tempitems };
                    return updatedArray;
                })

                console.log('Here the chat message will be added as this is different user')
            }

        })

        return () => {
            socket.disconnect();
        };

    }, [chatPages])

    const updateChatPages = (data) => {

        // const query = data.query
        // const msg = data.msg

        // console.log('emmited in io', msg)

        // let tempitems = chatPages[0].items
        // tempitems.unshift(msg)
        // if (tempitems.length > 10) {
        //     tempitems.pop()
        // }
        // //tempitems.pop()

        // setChatPages(prevItem => {
        //     const updatedArray = [...prevItem];
        //     updatedArray[0] = { ...updatedArray[0], items: tempitems };
        //     return updatedArray;
        // })


        // socket.emit(`new-message-post`, {
        //     id: socket.id,
        //     message: msg,
        //     query
        // })


        // socket.emit(`new-message-post-${query.channelId}`, {
        //     id: socket.id,
        //     message: msg,
        //     query
        // })

        // console.log('update chat pages query', query)
        // console.log('update chat pages msg', msg)


    }

    const { execute: getServerData, fieldErrors } = useAction(getOrgData, {
        onSuccess: (data) => {
            console.log(data)
            updateServer(data.server)
            updateServers(data.servers)
        },
        onError: (error) => {
            setProcessing(false)
            toast.error(error)
        }
    })

    const updateServer = async (server) => {
        localStorage.setItem('server', JSON.stringify(server))
        setServer(server)
    }

    const updateServers = async (servers) => {
        localStorage.setItem('servers', JSON.stringify(servers))
        setServers(servers)
    }

    const updateLoading = (bool) => {
        setLoading(bool)
    }

    const updateChatMesages = (data) => {
        setChatMessages(data)
    }


    return (
        <OrgContext.Provider value={{
            server, servers, updateServer, updateServers,
            loading, setLoading,
            updateLoading, loadingData, setLoadingData,
            chatMessages, setChatMessages, updateChatMesages,
            socket,
            chatPages, setChatPages, updateChatPages,
            fetchChatMessages
        }}>
            {children}
        </OrgContext.Provider>
    )
}
