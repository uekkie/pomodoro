'use client'

import { Button } from '@/components/ui/button'
import { Task as TaskType } from '@/types/task'
import { Pause, Play, Trash } from 'lucide-react'
import { useStopwatch } from 'react-timer-hook'
import useLocalStorageState from 'use-local-storage-state'

export default function Task({ task }: { task: TaskType }) {
  const [tasks, setTasks] = useLocalStorageState<TaskType[]>('tasks', {
    defaultValue: [],
  })

  const { totalSeconds, seconds, minutes, hours, isRunning, start, pause } =
    useStopwatch()

  const getFormattedTime = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  return (
    <div key={task.id} className="p-4 flex items-center border rounded-md">
      {task.title}

      <span className="flex-1"></span>
      <p className="text-muted-foreground tabular-nums text-sm">
        {getFormattedTime(minutes)}:{getFormattedTime(seconds)}
      </p>

      <Button
        variant="ghost"
        className="text-muted-foreground"
        size="icon"
        onClick={start}
      >
        <Play size={18} />
        <span className="sr-only">タスク開始</span>
      </Button>

      <Button
        variant="ghost"
        className="text-muted-foreground"
        size="icon"
        onClick={pause}
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
