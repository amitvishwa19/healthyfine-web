'use client'
import React, { useState, useEffect } from 'react'
import { Separator } from '@/components/ui/separator'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, } from "@/components/ui/dropdown-menu"
import { ColumnDef, VisibilityState, flexRender, ColumnFiltersState, getFilteredRowModel, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAction } from '@/hooks/use-action'
import { roleManagement } from '@/actions/admin/role-management'
import { useModal } from '@/hooks/useModal'


export default function Permission() {
  const [addDialog, setAddDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [roles, setRoles] = useState([])
  const { onOpen, refresh } = useModal()

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
      accessorKey: "permissions",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
          >
            Permissions
          </Button>
        )
      },
      cell: ({ row }) => {
        const permissions = row.original.permissions


        if (permissions.length > 0) {
          return <div className='flex-wrap justify-center'>

            {
              permissions.map((item, index) => {
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
            <Badge variant="outline" className='mr-1 mb-1 whitespace-nowrap text-inherit'>
              No Permission
            </Badge>
          )
        }


      }
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
        //const dispatch = useDispatch()
        const payment = row.original

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
                dispatch(openView({ type: 'view', data: row.original }))
              }}>View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                onOpen("editRole", { role: row.original })
              }}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                onOpen("deleteRole", { id: row.original.id })
              }}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]



  useEffect(() => {
    getRoles();
  }, [])



  const { execute, isLoading } = useAction(roleManagement, {
    onSuccess: (data) => {
      setRoles(data.roles)
      setLoading(isLoading)
    },
    onError: (error) => {
      console.log(error)
    }
  })


  useEffect(() => {
    if (refresh === true) {
      getRoles();
    }
  }, [refresh])


  const getRoles = async () => {
    execute({ type: 'getRoles' })
    // try {
    //   dispatch(showLoading())
    //   await axios.get('/api/v1/admin/role')
    //     .then((res) => {
    //       setRoles(res.data.data)
    //     })
    // } catch (error) {
    //   toast.error('Somethin went wrong while getting roles, please try again later')
    // } finally {
    //   dispatch(hideLoading())
    // }
  }



  return (
    <div className="">

      <div>
        <div className='flex items-center justify-between'>

          <div >
            <h3 className="text-lg font-medium">Roles</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All Roles avaliable with this app
            </p>
          </div>
          <Button variant='outline' size='sm' onClick={() => { onOpen("addRole", { roles }) }}>Add Role</Button>
        </div>
        <Separator />
      </div>

      <div>
        {/* <DataTable columns={columns} data={roles} /> */}

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
              <DataTable columns={columns} data={roles} />
            )
        }


      </div>

      {/* <View /> */}

    </div>
  )
}



function DataTable({ columns, data, }) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
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
      <div className="flex items-center py-4">

        {/* <Input
          placeholder="Filter Permission..."
          value={(table.getColumn("title")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
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
        <Table>

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
                    <TableCell key={cell.id} className='flex-row justify-right items-end'>
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

