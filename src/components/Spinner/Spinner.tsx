import React from 'react'

type Props = {
    className?:string
}

const Spinner = ({className}: Props) => {
  return (
    <div className={className}>
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default Spinner