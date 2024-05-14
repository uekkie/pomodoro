'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Pause, Play, Trash } from 'lucide-react'
import useLocalStorageState from 'use-local-storage-state'
import { Task as TaskType } from '@/types/task'
import Task from '@/components/task'

type FormType = {
  title: string
}

export default function Home() {
  const [tasks, setTasks] = useLocalStorageState<TaskType[]>('tasks', {
    defaultValue: [],
  })
  const {
    handleSubmit,
    register,
    formState: isValid,
    reset,
  } = useForm<FormType>({
    mode: 'onChange',
    defaultValues: {
      title: '',
    },
  })

  const onSubmit = async (data: FormType) => {
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: data.title,
        completed: false,
      },
    ])
    reset()
  }
  return (
    <main className="container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="ma-w-lg space-y-2 mx-auto bg-muted p-6 border rounded-md"
      >
        <label htmlFor="title">タスク名</label>
        <Input
          {...register('title', {
            required: 'タスク名は必須です',
          })}
          autoComplete="off"
          id="title"
        />
        <Button disabled={!isValid}>作成</Button>
      </form>

      <h2>タスク一覧</h2>

      <div className="space-y-2">
        {tasks.map((task) => {
          return <Task key={task.id} task={task} />
        })}
      </div>
    </main>
  )
}
