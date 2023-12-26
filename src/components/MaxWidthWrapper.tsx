import React, { ReactNode } from 'react'
import { cn } from '../lib/utils'

type Props = {
    className?:string
    children:ReactNode
}

const MaxWidthWrapper = ({children,className}: Props) => {
  return (
    <div className={cn(className,'mx-auto py-2.5 md:py-20 w-full max-w-6xl')}>
        {children}
    </div>
  )
}

export default MaxWidthWrapper