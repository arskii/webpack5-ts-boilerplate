import React, { FC } from "react"

export const App:FC = () => {
  return (
    <div>
        <h2>Welcome to React App</h2>
        <h3>Date : {new Date().toDateString()}</h3>
    </div>
  )
}