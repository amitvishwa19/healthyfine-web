

import { Card } from "@/components/ui/card"
import { GetCredentials } from "../action/get-credentials"
import { LockKeyholeIcon, ShieldOffIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { DeleteCredentialModal } from "./DeleteCredentialModal"

export async function UserCredentials() {

    const credentials = await GetCredentials()


    if (credentials.length === 0) {
        return (
            <Card className='w-full p-4'>
                <div className="flex flex-col items-center justify-center">
                    <div className="rounded-full bg-cyan-100 w-20 h-20 flex items-center justify-center">
                        <ShieldOffIcon size={40} className="text-orange-400" />
                    </div>
                    <div className="flex flex-col gap-1 text-center">
                        <p className="text-bold">No credentials created yet</p>
                        <p className="text-muted-foreground">Click the button below to create credentials</p>
                    </div>
                </div>
            </Card>
        )
    }

    if (!credentials) {
        return (
            <div>
                Something went wrong
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 flex-wrap">
            {credentials.map((credential, index) => {
                const createdAt = formatDistanceToNow(credential.createdAt)
                return (
                    <Card key={credential.id} className='p-4 flex items-center justify-between'>
                        <div className="flex items-center gap-2">
                            <div className="rounded-full w-8 h-8 flex items-center justify-center dark:bg-slate-800  bg-gray-600">
                                <LockKeyholeIcon size={16} className="stroke-public_primary_color" />
                            </div>
                            <div>
                                <p className="font-bold">{credential.name}</p>
                                <p className="text-xs text-muted-foreground">{createdAt}</p>
                            </div>
                        </div>
                        <DeleteCredentialModal credential={credential} />
                    </Card>
                )
            })}
        </div>
    )
}