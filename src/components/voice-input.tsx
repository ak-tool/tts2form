'use client'

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

// 模拟的结构化数据
const structuredData = {
  姓名: "张三",
  年龄: "30",
  职业: "工程师",
  爱好: "读书、旅游"
}

export function VoiceInput() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [selectedFields, setSelectedFields] = useState(Object.keys(structuredData))

  const toggleListening = useCallback(() => {
    if (isListening) {
      setTranscript('这是一段预设的演示文案，用于模拟语音识别的结果。')
      setShowDialog(true)
    } else {
      setTranscript('')
    }
    setIsListening(!isListening)
  }, [isListening])

  const handleCheckboxChange = (field: string) => {
    setSelectedFields(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    )
  }

  const handleRerecord = () => {
    setShowDialog(false)
    setTranscript('')
    setSelectedFields(Object.keys(structuredData))
  }

  const handleCreateTable = () => {
    console.log('创建表格', selectedFields)
    // 这里添加创建表格的逻辑
  }

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>语音输入演示</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={toggleListening}
            className="w-full"
          >
            {isListening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
            {isListening ? '停止录制' : '开始录制'}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>语音识别结果</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="font-medium">识别文本：</p>
            <p className="mt-2">{transcript}</p>
          </div>
          <div className="mt-4">
            <p className="font-medium">结构化数据：</p>
            {Object.entries(structuredData).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id={key}
                  checked={selectedFields.includes(key)}
                  onCheckedChange={() => handleCheckboxChange(key)}
                />
                <label htmlFor={key} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {key}: {value}
                </label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleRerecord}>重新录制</Button>
            <Button onClick={handleCreateTable}>一键成表</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
