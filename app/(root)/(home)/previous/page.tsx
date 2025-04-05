import React from 'react'
import CallList from '@/components/CallList/CallList'
const page = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
    <h1 className='text-3xl font-bold'>Previous Meeting</h1>
    <CallList type='ended'></CallList>

  </section>
  )
}

export default page
