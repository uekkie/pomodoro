'use client'

import { Button } from '@/components/ui/button'
import { Task as TaskType } from '@/types/task'
import { Pause, Play, Trash } from 'lucide-react'
import useLocalStorageState from 'use-local-storage-state'

export default function Task({ task }: { task: TaskType }) {
  const [tasks, setTasks] = useLocalStorageState<TaskType[]>('tasks', {
    defaultValue: [],
  })

  return (
    <div key={task.id} className="p-4 flex items-center border rounded-md">
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
}
