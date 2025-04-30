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
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { useModal } from '@/hooks/useModal'
import { contentManagement } from '@/actions/admin/content-management'
import { useRouter } from 'next/navigation'
import { FaFileSignature } from 'react-icons/fa'

import { $getRoot, $getSelection } from 'lexical';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import TipTap from '../_components/TipTap'
import Editor from '../_components/editor'
import Link from 'next/link'



export default function Model() {
  const [contents, setContents] = useState([])
  //const [mode, setMode] = useState('main')
  //const { modalOpenState, data, mode } = useSelector(state => state.article_crud)
  //const dispatch = useDispatch()
  const router = useRouter()
  const [showDelete, setShowDelete] = useState(false)
  const [loading, setLoading] = useState(true)
  const { onOpen, refresh } = useModal()

  useEffect(() => {

    getContents({ type: 'getContents' })

  }, [refresh])


  const { execute: getContents, isLoading } = useAction(contentManagement, {
    onSuccess: (data) => {
      //console.log(data)
      setContents(data.contents)
      setLoading(false)
    },
    onError: (error) => {
      console.log('error')
      setLoading(false)
    }
  })

  const columns = [

    // {
    //   accessorKey: "photoURL",
    //   header: ({ column }) => {
    //     return (
    //       <Button variant="ghost" >

    //       </Button>
    //     )
    //   },
    //   cell: ({ row }) => {

    //     return (
    //       <div className='flex-wrap justify-center'>

    //         {

    //           <Image src={row.original.feature_image || defaultImage.src} width={50} height={50} className='rounded-md' alt='coverimage' />

    //         }
    //       </div>
    //     )
    //   }
    // },

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
      accessorKey: "contentFields",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fields
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const fields = row.original.contentFields

        if (fields.length > 0) {
          return <div className='flex-wrap justify-center'>

            {
              fields.map((item, index) => {
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
              No Fields
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
              <DropdownMenuItem>
                <Link href={`/admin/content/${row.original.id}`}>View</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { onOpen("editContent", { content: row.original }) }}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { onOpen("deleteContent", { id: row.original.id }) }}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const val = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Applied to Business Development Executive (BDE) - Harni, Vadodara, Gujarat","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`

  return (
    <div className="">
      <div>
        <div>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className="text-lg font-medium">Content Model</h3>
              <p className="text-sm text-muted-foreground mb-4">
                All Content Model with this app
              </p>
            </div>
            <Button variant='outline' size='sm' onClick={() => { onOpen("addContent") }}>Add Content</Button>
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

              </div>
            ) :
            (
              <DataTable columns={columns} data={contents} />
            )
        }
      </div>

      {/* <div className='flex h-[400px] min-w-full '>
        <LexicalComposer initialConfig={initialConfig} className=''>
          <RichTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={<div>Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </LexicalComposer>
      </div> */}

      <div className='mt-4'>
        <Editor value={val} />
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
          placeholder="Filter Models..."
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


