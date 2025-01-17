"use client"

import { useState, useEffect } from "react"
import { Plus, Trash } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

interface Todo {
  id: number
  text: string
  completed: boolean
  date: string
}

export function TodoList({ selectedDate }: { selectedDate: Date }) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false,
        date: selectedDate.toISOString()
      }])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(
    todo => new Date(todo.date).toDateString() === selectedDate.toDateString()
  )

  return (
    <div className="flex flex-col h-full">
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-grow focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTodo()
            }
          }}
        />
        <Button onClick={addTodo} className="transition">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[250px] pr-4">
        <AnimatePresence>
          {filteredTodos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2 mb-2"
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                className="transition-all duration-300 ease-in-out"
              />
              <span className={`flex-grow ${todo.completed ? "line-through" : ""}`}>{todo.text}</span>
              <Button variant="ghost" size="sm" onClick={() => deleteTodo(todo.id)} className="transition">
                <Trash className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
    </div>
  )
}

