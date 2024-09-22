

import React, { useState, useEffect } from 'react';
import { Card, Input, Select, Button, Radio, Checkbox, DatePicker } from 'antd';
import { VoiceInput } from '@/components/voice-input';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const Home: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    // 初始化表单数据
    isGuidanceProvided: undefined,
    guidanceContent: undefined,
    occurrenceTime: null,
    activityDuringOccurrence: '',
    locationCategory: '',
    specificLocation: '',
    complainant: '',
    chiefComplaint: '',
    medicalHistory: '',
    allergicHistory: '',
    lastMeal: '',
    epidemiologicalHistory: '',
    injuryType: '',
    accidentType: '',
    victimType: '',
    preliminaryDiagnosis: [],
    severityLevel: '',
    cooperationWithExamination: undefined,
    temperature: '',
    heartRate: '',
    consciousness: '',
    injurySites: [],
    conditionChange: '',
    finalOutcome: '',
  });

  useEffect(() => {
    if (isEdit) {
      // 解析语音识别结果并更新表单数据
      const recognitionResult = "患者男性 四十七周岁 国际中国汉族 婚姻不详 职业不详 已进行急救指导了解病情 发生于二零二三年九月四日 发生时活动 驾驶交通工具 伤害意图非故意意外事故 地点 类别 公路 具体地点柯城区 主诉及腺病史患者自述车祸 致右上肢左下肢疼痛十余分钟 无既往病史 无过敏史 上一餐进食和食物内容不详 无流行病学接触史或医区旅居史 损伤类型 车祸 车祸类型侧面撞击 伤员类型驾驶员初步诊断 躯干、四肢损伤 创伤部位 右上肢左下肢 危重程度非急症 患者配合体检 体温三十六点八摄氏度 心率未测 神志完全清醒 体格检查详情 其他无书 途中病情无变化 现场最终转归患者病情平稳无变化";

      setFormData({
        ...formData,
        isGuidanceProvided: true,
        guidanceContent: ['了解病情'],
        occurrenceTime: moment('2023-09-04'),
        activityDuringOccurrence: 'transport',
        locationCategory: 'road',
        specificLocation: '柯城区',
        complainant: 'self',
        chiefComplaint: '车祸致右上肢左下肢疼痛十余分钟',
        medicalHistory: 'none',
        allergicHistory: 'none',
        lastMeal: '不详',
        epidemiologicalHistory: 'none',
        injuryType: 'car_accident',
        accidentType: 'side',
        victimType: 'driver',
        preliminaryDiagnosis: ['unspecified'],
        severityLevel: 'non_urgent',
        cooperationWithExamination: true,
        temperature: '36.8',
        heartRate: '',
        consciousness: 'clear',
        injurySites: ['右上肢', '左下肢'],
        conditionChange: 'stable',
        finalOutcome: 'stable',
      });
    }
  }, [isEdit]);

  return (
    <div className="bg-blue-900 p-4">
      
        <div className="flex justify-between text-white items-center mb-4">
          <div className="flex items-center">
            <div>
              <span className="font-bold mr-4">车牌号: 浙A23423</span>
              <span>送往医院: 余杭区第二人民医院</span>
            </div>
          </div>
        </div>
      
      <Card className="bg-blue-100 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <span className="font-bold mr-4">姓名: 潘天成</span>
              <span className="mr-4">性别: 男</span>
              <span className="mr-4">年龄: 36</span>
              <span>身份证号: 411421198612012948</span>
              
            </div>
          </div>
          <div className="flex items-center">
            {/* 加一个语音录入信息的按钮 */}
            <VoiceInput onEdit={setIsEdit}></VoiceInput>
            <span className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">危重-首诊 (GCS: 5分)</span>
            <Button type="primary" className="mr-2">编辑信息</Button>
            <Button>健康档案</Button>
          </div>
        </div>
      </Card>
      <Card title="患者信息表单" className="mb-4">
        <div className="flex">
          <div className="flex-1 px-2">
            <div className="text-base font-bold text-blue-600 mb-4 border-b-2 border-blue-400 pb-2">到达前急救指导</div> 
            <div className="mb-4">
              <label className="block mb-1">是否进行急救指导</label>
              <Radio.Group value={formData.isGuidanceProvided} onChange={(e) => setFormData({...formData, isGuidanceProvided: e.target.value})}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </div>
            <div className="mb-4">
              <label className="block mb-1">指导内容</label>
              <Checkbox.Group 
                options={['了解病情', '指导自救', '心理辅导', '指导旁观者自救', '其他']} 
                value={formData.guidanceContent}
                onChange={(checkedValues) => setFormData({...formData, guidanceContent: checkedValues})}
              />
            </div>
            <div className="text-base font-bold text-blue-600 mb-4 border-b-2 border-blue-400 pb-2">现场状况</div> 
            <div className="mb-4">
              <label className="block mb-1">发生时间</label>
              <DatePicker 
                showTime 
                className="w-full" 
                value={formData.occurrenceTime}
                onChange={(date) => setFormData({...formData, occurrenceTime: date})}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">发生时活动</label>
              <Select 
                placeholder="请选择发生时活动" 
                className="w-full"
                value={formData.activityDuringOccurrence}
                onChange={(value) => setFormData({...formData, activityDuringOccurrence: value})}
              >
                <Option value="sport">体育活动</Option>
                <Option value="leisure">休闲活动</Option>
                <Option value="work">有偿工作</Option>
                <Option value="housework">家务/学习</Option>
                <Option value="transport">驾乘交通工具</Option>
                <Option value="unknown">不清楚</Option>
                <Option value="other">其他</Option>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">地点类别</label>
              <Select 
                placeholder="请选择地点类别" 
                className="w-full"
                value={formData.locationCategory}
                onChange={(value) => setFormData({...formData, locationCategory: value})}
              >
                <Option value="home">家中</Option>
                <Option value="public_residence">公共居住场所</Option>
                <Option value="school_public">学校与公共场所</Option>
                <Option value="sports_venue">体育和运动场所</Option>
                <Option value="road">公路/街道</Option>
                <Option value="trade_service">贸易和服务场所</Option>
                <Option value="industrial">工业和建筑场所</Option>
                <Option value="farm">农场/农田</Option>
                <Option value="unknown">不清楚</Option>
                <Option value="other">其他</Option>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">具体地点</label>
              <Input 
                placeholder="请输入具体地点" 
                value={formData.specificLocation}
                onChange={(e) => setFormData({...formData, specificLocation: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">主诉人</label>
              <Select 
                placeholder="请选择主诉人" 
                className="w-full"
                value={formData.complainant}
                onChange={(value) => setFormData({...formData, complainant: value})}
              >
                <Option value="self">患者自诉</Option>
                <Option value="other">他人代诉</Option>
                <Option value="unknown">无法获取</Option>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">主诉及现病史内容</label>
              <TextArea 
                rows={4} 
                placeholder="请输入主诉及现病史内容" 
                value={formData.chiefComplaint}
                onChange={(e) => setFormData({...formData, chiefComplaint: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">既往史</label>
              <Select 
                placeholder="请选择既往史" 
                className="w-full"
                value={formData.medicalHistory}
                onChange={(value) => setFormData({...formData, medicalHistory: value})}
              >
                <Option value="none">无</Option>
                <Option value="unknown">不详</Option>
                <Option value="deny">否认</Option>
                <Option value="have">有</Option>
              </Select>
            </div>
          </div>
          
          <div className="flex-1 px-2">
            
            <div className="mb-4">
              <label className="block mb-1">既往史内容</label>
              <Checkbox.Group options={['糖尿病', '高血压', '高血脂', '癌症', '慢性阻塞性肺病', '气喘', '中风', '癫痫', '艾滋病毒', '其他']} />
            </div>
            <div className="mb-4">
              <label className="block mb-1">过敏史</label>
              <Select 
                placeholder="请选择过敏史" 
                className="w-full"
                value={formData.allergicHistory}
                onChange={(value) => setFormData({...formData, allergicHistory: value})}
              >
                <Option value="none">无</Option>
                <Option value="unknown">不详</Option>
                <Option value="deny">否认</Option>
                <Option value="have">有</Option>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">上一餐进食时间和食物内容</label>
              <Input 
                placeholder="请输入上一餐进食时间和食物内容" 
                value={formData.lastMeal}
                onChange={(e) => setFormData({...formData, lastMeal: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">流行病接触史或疫区旅居史</label>
              <Select 
                placeholder="请选择流行病接触史或疫区旅居史" 
                className="w-full"
                value={formData.epidemiologicalHistory}
                onChange={(value) => setFormData({...formData, epidemiologicalHistory: value})}
              >
                <Option value="none">无流行病学接触史</Option>
                <Option value="travel">14天内有疫区的旅行史或居住史</Option>
                <Option value="contact">14天内与新冠肺炎疑似或确诊患者有接触史</Option>
                <Option value="symptom_contact">14天内曾接触过来自疫区的发热或有呼吸道症状的患者</Option>
                <Option value="cluster">有聚集性发病或与新冠肺炎患者有流行病学关联的其他情况</Option>
                <Option value="unknown">无法获取</Option>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">损伤类型</label>
              <Select 
                placeholder="请选择损伤类型" 
                className="w-full"
                value={formData.injuryType}
                onChange={(value) => setFormData({...formData, injuryType: value})}
              >
                <Option value="car_accident">车祸</Option>
                <Option value="sexual_assault">性侵犯</Option>
                <Option value="fall">跌倒/坠落</Option>
                <Option value="blunt_trauma">钝器伤</Option>
                <Option value="gunshot">火器伤</Option>
                <Option value="sharp_trauma">刀/锐器伤</Option>
                <Option value="burn">烫伤</Option>
                <Option value="suffocation">窒息/悬吊</Option>
                <Option value="drowning">溺水</Option>
                <Option value="poisoning">中毒</Option>
                <Option value="animal_injury">动物伤</Option>
                <Option value="unknown">不清楚</Option>
                <Option value="other">其他</Option>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">车祸类型</label>
              <Select 
                placeholder="请选择车祸类型" 
                className="w-full"
                value={formData.accidentType}
                onChange={(value) => setFormData({...formData, accidentType: value})}
              >
                <Option value="frontal">迎面撞击</Option>
                <Option value="side">侧面撞击</Option>
                <Option value="rear">追尾</Option>
                <Option value="rollover">翻滚</Option>
                <Option value="ejection">抛出车外</Option>
                <Option value="trapped">卡在车内</Option>
                <Option value="motorcycle">摩托车祸</Option>
                <Option value="electric_bike">电动车祸</Option>
                <Option value="pedestrian">行人被撞</Option>
                <Option value="other">其他</Option>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">伤员类型</label>
              <Select 
                placeholder="请选择伤员类型" 
                className="w-full"
                value={formData.victimType}
                onChange={(value) => setFormData({...formData, victimType: value})}
              >
                <Option value="driver">驾驶员</Option>
                <Option value="front_passenger">前排乘客</Option>
                <Option value="rear_passenger">后排乘客</Option>
                <Option value="pedestrian">行人</Option>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">初步诊断</label>
              <Select 
                placeholder="请选择初步诊断" 
                className="w-full" 
                mode="multiple"
                value={formData.preliminaryDiagnosis}
                onChange={(values) => setFormData({...formData, preliminaryDiagnosis: values})}
              >
                <Option value="head">头部损伤</Option>
                <Option value="neck">颈部损伤</Option>
                <Option value="chest">胸部损伤</Option>
                <Option value="abdomen">腹部、下背、腰椎和骨盆损伤</Option>
                <Option value="shoulder">肩和上臂损伤</Option>
                <Option value="elbow">肘和前臂损伤</Option>
                <Option value="wrist">腕和手损伤</Option>
                <Option value="hip">髋和大腿损伤</Option>
                <Option value="knee">膝和小腿损伤</Option>
                <Option value="ankle">踝和足损伤</Option>
                <Option value="multiple">累计身体多个部位的损伤</Option>
                <Option value="unspecified">躯干、四肢、或身体未特指部位的损伤</Option>
                <Option value="other">其他</Option>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">危重程度</label>
              <Select 
                placeholder="请选择危重程度" 
                className="w-full"
                value={formData.severityLevel}
                onChange={(value) => setFormData({...formData, severityLevel: value})}
              >
                <Option value="non_urgent">非急症</Option>
                <Option value="urgent">急症</Option>
                <Option value="critical">危重</Option>
                <Option value="dying">濒危</Option>
              </Select>
            </div>
          </div>
          
          <div className="flex-1 px-2">
            
            <div className="text-base font-bold text-blue-600 mb-4 border-b-2 border-blue-400 pb-2">首次体检记录</div> 
            <div className="mb-4">
              <label className="block mb-1">体检配合</label>
              <Radio.Group 
                value={formData.cooperationWithExamination} 
                onChange={(e) => setFormData({...formData, cooperationWithExamination: e.target.value})}
              >
                <Radio value={true}>配合</Radio>
                <Radio value={false}>不配合</Radio>
              </Radio.Group>
            </div>
            <div className="mb-4">
              <label className="block mb-1">未配合原因</label>
              <Input placeholder="请输入未配合原因" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">体温 (℃)</label>
              <Input 
                placeholder="请输入体温" 
                value={formData.temperature}
                onChange={(e) => setFormData({...formData, temperature: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">心率 (次/分)</label>
              <Input 
                placeholder="请输入心率" 
                value={formData.heartRate}
                onChange={(e) => setFormData({...formData, heartRate: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">呼吸 (次/分)</label>
              <Input placeholder="请输入呼吸频率" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">神志</label>
              <Select 
                placeholder="请选择神志状态" 
                className="w-full"
                value={formData.consciousness}
                onChange={(value) => setFormData({...formData, consciousness: value})}
              >
                <Option value="clear">完全清醒</Option>
                <Option value="lost">完全丧失</Option>
                <Option value="abnormal">异常</Option>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">创伤部位</label>
              <Checkbox.Group 
                options={['头部', '面部', '颈部', '胸部', '腹部', '盆腔', '会阴部', '左上肢', '右上肢', '左下肢', '右下肢', '体表', '腰部', '背部', '脊柱']} 
                value={formData.injurySites}
                onChange={(checkedValues) => setFormData({...formData, injurySites: checkedValues})}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">途中病情变化</label>
              <Select 
                placeholder="请选择途中病情变化" 
                className="w-full"
                value={formData.conditionChange}
                onChange={(value) => setFormData({...formData, conditionChange: value})}
              >
                <Option value="stable">病情平稳</Option>
                <Option value="improved">病情好转</Option>
                <Option value="worsened">病情恶化</Option>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">最终转归结果</label>
              <Select 
                placeholder="请选择最终转归结果" 
                className="w-full"
                value={formData.finalOutcome}
                onChange={(value) => setFormData({...formData, finalOutcome: value})}
              >
                <Option value="improved">好转</Option>
                <Option value="stable">病情平稳，无变化</Option>
                <Option value="worsened">恶化</Option>
                <Option value="death_on_scene">现场死亡</Option>
                <Option value="death_in_transit">途中死亡</Option>
              </Select>
            </div>
            
          <div className="flex justify-end mt-[4rem]">
            <Button type="primary">保存提交</Button>
          </div>
          </div>

          
        </div>
      </Card>
    </div>
  );
};

export default Home;
