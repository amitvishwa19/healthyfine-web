'use client'

import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import defaultAvatar from "@/assets/images/default_avatar.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { flexRender, getFilteredRowModel, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAction } from '@/hooks/use-action'
import { userManagement } from '@/actions/admin/user-management'
import { useModal } from '@/hooks/useModal'
import { Skeleton } from "@/components/ui/skeleton"
import { AppIcon } from '@/components/global/AppIcon'


export default function User() {
  const [users, setUsers] = useState([])
  const { onOpen, refresh } = useModal()
  const [loading, setLoading] = useState(true)


  const { execute, isLoading } = useAction(userManagement, {
    onSuccess: (data) => {
      console.log(data)
      setUsers(data.users)
      setLoading(isLoading)
    },
    onError: (error) => {
      console.log(error)
    }
  })


  useEffect(() => {

    execute({ type: 'getUsers' })
  }, [])

  useEffect(() => {
    if (refresh === true) {
      execute({ type: 'getUsers' })
    }
  }, [refresh])

  const columns = [

    {
      accessorKey: "photoURL",
      header: ({ column }) => {
        return (
          <Button variant="ghost" >

          </Button>
        )
      },
      cell: ({ row }) => {
        const photoURL = row.original.avatar

        return (
          <div className='flex-wrap justify-center'>

            {

              <Avatar>
                <AvatarImage src={photoURL || defaultAvatar.src} alt="@shadcn" />
              </Avatar>



            }
          </div>
        )
      }
    },

    {
      accessorKey: "displayName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Display Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "emailVerified",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email Verified
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: (({ row }) => {
        return (
          <div className=' justify-center'>
            {
              row.original.emailVerified === true
                ? <Badge variant="outline" className='mr-1 mb-1 whitespace-nowrap text-inherit bg-green-400 text-slate-800'>
                  Verified
                </Badge>
                : <Badge variant="outline" className='mr-1 mb-1 whitespace-nowrap text-inherit bg-red-400 text-slate-800'>
                  Pending
                </Badge>
            }

          </div>
        )
      })
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
          <div className=' justify-center'>
            {
              row.original.status === true
                ? <Badge variant="outline" className='mr-1 mb-1 whitespace-nowrap text-inherit bg-green-400 text-slate-800'>
                  Active
                </Badge>
                : <Badge variant="outline" className='mr-1 mb-1 whitespace-nowrap text-inherit bg-red-400 text-slate-800'>
                  InActive
                </Badge>
            }

          </div>
        )
      })
    },
    {
      accessorKey: "roles",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Roles
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const roles = row.original.roles


        if (roles.length > 0) {
          return <div className='flex-wrap justify-center'>

            {
              roles.map((item, index) => {
                return (
                  <Badge key={index} variant="outline" className='mr-1 mb-1 whitespace-nowrap text-inherit'>
                    {item.title}
                  </Badge>

                )
              })
            }
          </div>
        } else {
          return (
            <Badge variant="outline" className='mr-1 mb-1 whitespace-nowrap text-inherit bg-red-400/50'>
              No Role
            </Badge>
          )
        }


      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original

        return (
          <DropdownMenu className='ring-0	flex justify-end'>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0 ring-0 ring-inherit border-none">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                dispatch(openView({ type: 'view', data: row.original }))
              }}>View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {

                onOpen("editUser", { user: row.original })
              }}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { onOpen("fcmNotificatin", { user: row.original }) }}>FCM Notification</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                onOpen("deleteUser", { id: row.original.id })
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
        <div>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className="text-lg font-medium">Users</h3>
              <p className="text-sm text-muted-foreground mb-4">
                All Users connected with this app
              </p>
            </div>
            <Button variant='outline' size='sm' onClick={() => { onOpen("addUser") }}>Add User</Button>
          </div>
        </div>
        <Separator />
      </div>
      <div>

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
              <DataTable columns={columns} data={users} />
            )
        }
      </div>
    </div>
  )
}
function DataTable({ columns, data, }) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("");

  const globalFilterFn = (row, columnId, filterValue) => {
    return 'Todo';
    const search = filterValue.toLowerCase();

    let value = row.getValue(columnId);
    if (typeof value === 'number') value = String(value);

    return value?.toLowerCase().includes(search);
  };


  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    //onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },

  })


  return (
    <div>
      <div className="flex items-center gap-2 py-4">

        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-xs ring-0 ml-1"
        />
        {/* {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={statuses}
                    />
                )} */}
        {/* <DataTableFacetedFilter title='Status' column={table.getColumn("status")} options={statuses} className='ml-2' /> */}


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size='sm' className="ml-auto flex gap-2">
              <AppIcon name='StretchVertical' size={14} />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


      <div className="rounded-md border">
        <Table >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
