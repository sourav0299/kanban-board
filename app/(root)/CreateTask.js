import React, { useState } from 'react'

const CreateTask = ({ tasks, setTasks }) => {
    const [task, setTask] = useState({
        id: '',
        name: "",
        status: "open",
    })
  return (
      <form action="">
          <input type="text" className="" />
          <button className="">Add</button>
    </form>
  )
}

export default CreateTask