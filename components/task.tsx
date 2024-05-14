'use client'

import { Button } from '@/components/ui/button'
import { Task as TaskType } from '@/types/task'
import { Check, Pause, Play, Trash } from 'lucide-react'
import { useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook'
import useLocalStorageState from 'use-local-storage-state'

export default function Task({ task }: { task: TaskType }) {
  const [tasks, setTasks] = useLocalStorageState<TaskType[]>('tasks', {
    defaultValue: [],
  })
  const [mode, setMode] = useLocalStorageState<'working' | 'break'>('working')
  const { seconds, minutes, start, pause, reset } = useStopwatch()

  useEffect(() => {
    if (minutes >= 25 && mode === 'working') {
      alert('休憩時間です')
      setMode('break')
      setTasks((prev) =>
        prev.map((item) => {
          if (item.id === task.id) {
            return {
              ...item,
              completed: true,
            }
          } else {
            return item
          }
        })
      )
      reset()
    }

    if (minutes >= 5 && mode === 'break') {
      alert('作業時間です')
      setMode('working')
      reset()
    }
  }, [minutes, mode, setMode, reset, setTasks, task.id])
  const getFormattedTime = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  return (
    <div
      key={task.id}
      className="p-4 gap-2 flex items-center border rounded-md"
    >
      <Button
        variant="ghost"
        className={`p-2 rounded-full  ${
          task.completed ? 'text-green-400' : 'text-muted-background'
        } &&`}
        onClick={() => {
          setTasks((prev) =>
            prev.map((item) => {
              if (item.id === task.id) {
                return {
                  ...item,
                  completed: !task.completed,
                }
              } else {
                return item
              }
            })
          )
        }}
      >
        <Check size={18} />
      </Button>

      <h2
        className={`${
          task.completed ? 'line-through text-muted-foreground' : ''
        }`}
      >
        {task.title}
      </h2>

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
