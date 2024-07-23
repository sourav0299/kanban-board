import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid';

const CreateTask = ({ tasks, setTasks }) => {
    const [task, setTask] = useState({
        id: '',
        name: "",
        status: "open",
    })
  return (
      <form action="">
          <input type="text" className="" onChange={(e) => setTask({...task, id: uuidv4})} />
          <button className="">Add</button>
    </form>
  )
}

export default CreateTask