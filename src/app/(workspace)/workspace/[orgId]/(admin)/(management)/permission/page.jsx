'use client'
import React, { useState, useEffect } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useAction } from '@/hooks/use-action'
import { permissionManagement } from '@/actions/admin/permission-management'
import { useModal } from '@/hooks/useModal'
import Datatable from './Datatable'

export default function Permission() {
  const [loading, setLoading] = useState(true)
  const [permissions, setPermissions] = useState([])
  const { onOpen, refresh } = useModal()

  useEffect(() => {
    if (refresh === true) {
      execute({ type: 'getPermission' })
    }
  }, [refresh])



  useEffect(() => {
    execute({ type: 'getPermission' })
  }, [])

  const { execute, isLoading } = useAction(permissionManagement, {
    onSuccess: (data) => {
      setPermissions(data.permissions)
      setLoading(isLoading)
    },
    onError: (error) => {
      console.log(error)
    }
  })



  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: (({ row }) => {
        return (

          <div className=''>
            {
              row.original.status === true
                ? <Badge variant="outline" className='mr-1 mb-1 whitespace-nowrap text-inherit bg-green-400 text-slate-800'>
                  Active
                </Badge>
                : <Badge variant="outline" className='mr-1 mb-1 whitespace-nowrap text-inherit bg-red-400 text-slate-800'>
                  Inactive
                </Badge>
            }

          </div>
        )
      })
    },

    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu className='ring-0	flex justify-end'>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0 ring-0 focus-visible:ring-0  border-none">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {
                //dispatch(openView({type:'view',data:row.original}))
                console.log(row.original)
              }}>View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {

                //onOpen("messageFile", { apiUrl, query })
                //openEditCrud(row.original)
                onOpen("editPermission", { permission: row.original })
              }}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {

                onOpen("deletePermission", { id: row.original.id })
              }}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="">

      <div>
        <div className='flex items-center justify-between'>

          <div >
            <h3 className="text-lg font-medium">Permissions</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All Permissions avaliable with this app
            </p>
          </div>

          <div >
            {/* <Crud open={open} /> */}
            <Button variant='outline' size='sm' onClick={() => { onOpen("addPermission", { permissions }) }}>Add Permission</Button>
          </div>

        </div>
        <Separator />
      </div>

      <div>
        {/* <DataTable columns={columns} data={permissions} /> */}


        {
          loading ?
            (
              <div className="flex flex-col items-center gap-2 mt-4">
                <Skeleton className="flex w-full h-12" />
                <Skeleton className="flex w-full h-12" />
                <Skeleton className="flex w-full h-12" />
                <Skeleton className="flex w-full h-12" />
              </div>
            ) :
            (
              <Datatable columns={columns} data={permissions} />
            )
        }
      </div>

      {/* <View /> */}

    </div>
  )
}


