'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Pause, Play, Trash } from 'lucide-react'
import useLocalStorageState from 'use-local-storage-state'

type FormType = {
  title: string
}

type Task = {
  id: string
  title: string
}

export default function Home() {
  const [tasks, setTasks] = useLocalStorageState<Task[]>('tasks', {
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
          return (
            <div
              key={task.id}
              className="p-4 flex items-center border rounded-md"
            >
              {task.title}

              <span className="flex-1"></span>

              <Button
                variant="ghost"
                className="text-muted-foreground"
                size="icon"
                onClick={() => {
                  setTasks((prev) => prev.filter((item) => item.id !== task.id))
                }}
              >
                <Play size={18} />
                <span className="sr-only">タスク開始</span>
              </Button>

              <Button
                variant="ghost"
                className="text-muted-foreground"
                size="icon"
                onClick={() => {
                  setTasks((prev) => prev.filter((item) => item.id !== task.id))
                }}
              >
                <Pause size={18} />
                <span className="sr-only">タスク停止</span>
              </Button>

              <Button
                variant="ghost"
                className="text-muted-foreground"
                size="icon"
                onClick={() => {
                  setTasks((prev) => prev.filter((item) => item.id !== task.id))
                }}
              >
                <Trash size={18} />
                <span className="sr-only">タスクを削除</span>
              </Button>
            </div>
          )
        })}
      </div>
    </main>
  )
}
