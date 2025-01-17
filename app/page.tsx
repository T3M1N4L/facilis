import { CalendarWithTodoMemo } from "@/components/calendar-with-todo-memo"
import { BackgroundGrid } from "@/components/styles"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative">
      <BackgroundGrid />
      <CalendarWithTodoMemo />
    </main>
  )
}

