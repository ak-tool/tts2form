'use client'

import { useState, useCallback } from 'react'
import { Button, Card, Modal, Checkbox, Space, Typography, Col, Row, message } from 'antd'
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons'

const { Paragraph, Text } = Typography

message.config({
  top: 100,
  duration: 200000,
})

// 更新模拟的结构化数据
const structuredData = {
  性别: "男性",
  年龄: "47周岁",
  国籍: "中国",
  民族: "汉族",
  婚姻状况: "不详",
  职业: "不详",
  是否进行急救指导: "是",
  指导内容: "了解病情",
  发生时间: "2023年9月4日",
  发生时活动: "驾驶交通工具",
  伤害意图: "非故意意外事故",
  地点类别: "公路",
  具体地点: "柯城区",
  主诉人: "患者自述",
  主诉及现病史内容: "车祸致右上肢左下肢疼痛十余分钟",
  既往史: "无",
  过敏史: "无",
  上一餐进食时间和食物内容: "不详",
  流行病接触史或疫区旅居史: "无",
  损伤类型: "车祸",
  车祸类型: "侧面撞击",
  伤员类型: "驾驶员",
  初步诊断: "躯干、四肢损伤",
  创伤部位: "右上肢、左下肢",
  危重程度: "非急症",
  体检配合: "患者配合体检",
  体温: "36.8℃",
  心率: "未测",
  神志: "完全清醒",
  体格检查详情: "其他无殊",
  途中病情变化: "无变化",
  最终转归结果: "病情平稳，无变化"
}

export function VoiceInput({ onEdit }: { onEdit: (value: boolean) => void }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedFields, setSelectedFields] = useState(Object.keys(structuredData))

  const toggleListening = useCallback(() => {
    if (isListening) {
      setTranscript('患者男性 四十七周岁 国际中国汉族 婚姻不详 职业不详 已进行急救指导了解病情 发生于二零二三年九月四日 发生时活动 驾驶交通工具 伤害意图非故意意外事故 地点 类别 公路 具体地点柯城区 主诉及腺病史患者自述车祸 致右上肢左下肢疼痛十余分钟 无既往病史 无过敏史 上一餐进食和食物内容不详 无流行病学接触史或医区旅居史 损伤类型 车祸 车祸类型侧面撞击 伤员类型驾驶员初步诊断 躯干、四肢损伤 创伤部位 右上肢左下肢 危重程度非急症 患者配合体检 体温三十六点八摄氏度 心率未测 神志完全清醒 体格检查详情 其他无书 途中病情无变化 现场最终转归患者病情平稳无变化')
      setShowModal(true)
    } else {
      setTranscript('')
    }
    setIsListening(!isListening)
  }, [isListening])

  const handleCheckboxChange = (checkedValues: string[]) => {
    setSelectedFields(checkedValues)
  }

  const handleRerecord = () => {
    setShowModal(false)
    setTranscript('')
    setSelectedFields(Object.keys(structuredData))
  }

  const handleCreateTable = () => {
    console.log('创建表格', selectedFields)
    onEdit(true)
    setShowModal(false)
    setIsListening(false)
    message.success('智能填写成功')
    // 这里添加创建表格的逻辑
  }

  return (
    <>
      <Button
        style={{ width: 'fit-content' }}
        className='mr-2'
        type="primary"
        icon={isListening ? <AudioMutedOutlined /> : <AudioOutlined />}
        onClick={toggleListening}
        block
      >
        {isListening ? '停止录制' : '开始录制'}
      </Button>

      <Modal
        title="语音识别结果"
        width={1200}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key="rerecord" onClick={handleRerecord}>
            重新录制
          </Button>,
          <Button key="create" type="primary" onClick={handleCreateTable}>
            一键成表
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card>
            <Text strong>识别文本：</Text>
            <Paragraph>{transcript}</Paragraph>
          </Card>
          <Card>
            <Text strong>结构化数据：</Text>
            <Checkbox.Group
              style={{ width: '100%' }}
              value={selectedFields}
              onChange={handleCheckboxChange as any}
            >
              <Row gutter={[16, 16]}>
                {Object.entries(structuredData).map(([key, value], index) => (
                  <Col span={8} key={key}>
                    <Checkbox
                      value={key}
                      style={{
                        width: '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {`${key}: ${value}`}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Card>
        </Space>
      </Modal>
    </>
  )
}
