'use client'
import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import axios from 'axios'
import { toast } from 'sonner'
import { CldUploadButton } from 'next-cloudinary'
import defaultAvatar from '@/assets/images/default_avatar.png'

export default function Profile() {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(state => state.auth)
  const [currentUser, setCurrentuser] = useState({})
  const dispatch = useDispatch()



  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      displayname: currentUser?.displayName,
      bio: currentUser?.bio
    },
    mode: "onChange",
  })

  useEffect(() => {
    getUser()
    setCurrentuser(user)
    console.log('user', user)
  }, [user])



  useEffect(() => {
    reset({
      username: currentUser?.username,
      displayname: currentUser?.displayName,
      bio: currentUser?.bio
    })
  }, [currentUser, reset])

  const getUser = async () => {
    await axios.get('/api/v1/auth/user')
      .then((res) => {

      })
  }


  const onSubmit = async (formData) => {
    console.log('formdata', formData)
    try {
      setLoading(true)
      await axios.post(`/api/v1/auth/user/${user._id}`, formData)
        .then((res) => {
          console.log(res?.data?.data)
          //dispatch(setLocalStorage(res?.data?.data))
          toast.success(res?.data?.message)
        })
        .catch((err) => {
          console.log(err)
        })

    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  const uploadPhoto = (result) => {
    //console.log('Upload photo', result)
    setValue("photoURL", result?.info?.secure_url)
  }


  return (
    <div className="space-y-10">

      <div>
        <div className='mb-4 '>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Update profile
              </p>
            </div>
            <CldUploadButton options={{ maxFiles: 1 }} onUpload={uploadPhoto} uploadPreset='ri86g84z'>
              <div className='rounded-sm overflow-hidden'>
                <img src={watch('photoURL') || currentUser?.photoURL || defaultAvatar.src} alt="" height={50} width={50} />
              </div>
            </CldUploadButton>
          </div>
          <Separator />
        </div>

        <div className='py-4 '>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10 text-xs'>

            <div className="grid w-full  items-center gap-1.5">
              <Label >Display Name</Label>
              <Input type="text"  {...register('displayname')} />
            </div>

            <div className="grid w-full  items-center gap-1.5">
              <Label >Email</Label>
              <Input disabled type="email" defaultValue={currentUser?.email} />
            </div>

            <div className="grid w-full  items-center gap-1.5">
              <Label >Bio</Label>
              <Textarea rows='4' defaultValue={currentUser?.bio} {...register('bio')} />
            </div>

            <div className='flex gap-4 justify-end'>
              <Button size='sm' variant='outline'>Cancel</Button>
              <Button disabled={loading} size='sm' variant='' type='submit' >
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                update
              </Button>
            </div>

          </form>
        </div>
      </div>

    </div>
  )
}
