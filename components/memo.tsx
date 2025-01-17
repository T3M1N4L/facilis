"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

interface SavedMemo {
  id: number
  text: string
  date: string
}

export function Memo({ selectedDate }: { selectedDate: Date }) {
  const [memo, setMemo] = useState("")
  const [savedMemos, setSavedMemos] = useState<SavedMemo[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('memos')
    if (saved) {
      setSavedMemos(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(savedMemos))
  }, [savedMemos])

  const saveMemo = () => {
    if (memo.trim() !== "") {
      setSavedMemos([{
        id: Date.now(),
        text: memo,
        date: selectedDate.toISOString()
      }, ...savedMemos])
      setMemo("")
    }
  }

  const filteredMemos = savedMemos.filter(
    memo => new Date(memo.date).toDateString() === selectedDate.toDateString()
  )

  return (
    <div className="flex flex-col h-full space-y-2">
      <div className="space-y-2">
        <Textarea
          placeholder="Write your memo here..."
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="min-h-[80px] focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none resize-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.metaKey) {
              saveMemo()
            }
          }}
        />
        <Button onClick={saveMemo} className="transition w-full">Save Memo</Button>
      </div>
      <Card className="overflow-hidden border flex-1">
        <CardContent className="p-2 h-full">
          <h3 className="text-lg font-semibold mb-2">Saved Memos</h3>
          <ScrollArea className="h-[calc(100%-2rem)] pr-4">
            <AnimatePresence>
              {filteredMemos.map((savedMemo) => (
                <motion.div
                  key={savedMemo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="mb-2 p-2 border text-xs">
                    <p>{savedMemo.text}</p>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

