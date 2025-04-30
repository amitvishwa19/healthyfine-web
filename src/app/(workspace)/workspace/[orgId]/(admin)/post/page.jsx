'use client'

import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import defaultImage from "@/assets/images/default_image.png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { flexRender, getFilteredRowModel, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { AppIcon } from "@/components/global/AppIcon";
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { toast } from 'sonner'
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'
import { postManagement } from '@/actions/admin/post-management'
import { useAction } from '@/hooks/use-action'
import { useModal } from '@/hooks/useModal'



export default function Article() {
  const [posts, setPosts] = useState([])
  //const [mode, setMode] = useState('main')
  //const { modalOpenState, data, mode } = useSelector(state => state.article_crud)
  //const dispatch = useDispatch()
  const [showDelete, setShowDelete] = useState(false)
  const [loading, setLoading] = useState(true)
  const { onOpen, refresh } = useModal()

  useEffect(() => {
    execute({ type: 'getPosts' })
  }, [])


  const { execute, isLoading } = useAction(postManagement, {
    onSuccess: (data) => {
      console.log(data)
      setPosts(data)
      setLoading(false)
    },
    onError: (error) => {
      setLoading(false)
    }
  })

  const getArticles = async () => {

    try {
      await axios.get('/api/v1/admin/article')
        .then((res) => {
          //console.log(res?.data?.data)
          setArticles(res?.data?.data)
          //dispatch(setUsers(res?.data?.data))
        })
    } catch (error) {
      console.log(error)
      console.log('Oops something went wrong')
    }
  }

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

        return (
          <div className='flex-wrap justify-center'>

            {

              <Image src={row.original.feature_image || defaultImage.src} width={50} height={50} className='rounded-md' alt='coverimage' />

            }
          </div>
        )
      }
    },

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
                dispatch(openView({ mode: 'view', data: row.original }))
              }}>View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                dispatch(openView({ mode: 'edit', data: row.original }))
              }}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                dispatch(openView({ mode: 'delete', data: row.original }))
                setShowDelete(true)
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
              <h3 className="text-lg font-medium">Posts</h3>
              <p className="text-sm text-muted-foreground mb-4">
                All Posts connected with this app
              </p>
            </div>
            <Button variant='outline' size='sm' onClick={() => { onOpen("addPost") }}>Add Post</Button>
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
              <DataTable columns={columns} data={posts} />
            )
        }
      </div>
    </div>
  )

}

const MainContent = ({ columns, articles, setMode }) => {
  const dispatch = useDispatch()
  return (
    <div className=" absolute inset-0 p-2">
      <div>

        <div className='flex items-center justify-between'>
          <div>
            <h3 className="text-lg font-medium">Articles</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All Articles managing the app
            </p>
          </div>
          {/* <Crud /> */}
          <Button variant='outline' size='sm' onClick={() => { dispatch(openView({ mode: 'add' })) }}>Add Article</Button>


        </div>
        <Separator />
      </div>
      <div>
        <DataTable columns={columns} data={articles} />
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
          placeholder="Filter Posts..."
          value={(table.getColumn("title")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
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


