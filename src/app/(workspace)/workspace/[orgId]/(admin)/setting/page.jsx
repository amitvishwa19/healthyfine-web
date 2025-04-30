import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function General() {
  return (
    <div className="space-y-6">

      <div>
        <h3 className="text-lg font-medium">General</h3>
        <p className="text-sm text-muted-foreground mb-4">
          General app settings
        </p>
        <Separator />

        <div className='flex flex-col gap-2 mt-6'>
          <div>
            <Input type="text" placeholder="App Name" />
          </div>
          <div>
            <Textarea rows='6' placeholder="App meta details" />
          </div>
        </div>
      </div>

    </div>
  )
}
