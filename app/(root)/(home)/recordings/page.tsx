import CallList from '@/components/CallList/CallList'
import React from 'react'

const page = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
    <h1 className='text-3xl font-bold'>Recordings</h1>
    <h3 className='text-xl font-bold'>Meeting Recordings will be available within 60 minutes after the session ends.</h3>
    <CallList type="recordings" />
  </section>
  )
}

export default page
