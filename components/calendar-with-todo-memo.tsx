"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TodoList } from "./todo-list"
import { Memo } from "./memo"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function CalendarWithTodoMemo() {
  const [date, setDate] = useState<Date>(new Date())
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Card className="w-full max-w-3xl h-full max-h-3xl mx-auto bg-background text-foreground relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10"
        onClick={toggleTheme}
      >
        {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      </Button>
      <CardHeader className="pb-4">
        <CardTitle className="text-4xl font-semibold tracking-tight">
          Facilis <span className="text-sm text-muted-foreground mt-1">/fəˈsēləs/ </span>
          <span className="text-sm text-muted-foreground mt-1">Latin: meaning "easy, simple"</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2 flex items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="relative w-full pb-[100%]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => setDate(newDate || new Date())}
                  className="rounded-md border shadow w-5xl h-5xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2">
          <Tabs defaultValue="todo" className="w-full h-[350px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="todo">Todo</TabsTrigger>
              <TabsTrigger value="memo">Memo</TabsTrigger>
            </TabsList>
            <TabsContent value="todo" className="h-[calc(100%-40px)] overflow-hidden">
              <TodoList selectedDate={date} />
            </TabsContent>
            <TabsContent value="memo" className="h-[calc(100%-40px)] overflow-hidden">
              <Memo selectedDate={date} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

