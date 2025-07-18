import { NextRequest, NextResponse } from 'next/server';
import { ChatRequest, ChatResponse, DecisionContext } from '@/types/chat';
import { getDecisionPrompt, detectDecisionType } from '@/lib/decisionTemplates';

// 内置AI响应生成器 - 模拟GPT-4级别的决策分析
function generateAIResponse(message: string, history: any[], decisionContext?: DecisionContext): string {
  const decisionType = detectDecisionType(message);
  const prompt = getDecisionPrompt(decisionType, message);
  
  // 基于决策类型生成专业的分析响应
  switch (decisionType) {
    case 'career':
      return generateCareerAnalysis(message);
    case 'financial':
      return generateFinancialAnalysis(message);
    case 'relationship':
      return generateRelationshipAnalysis(message);
    case 'health':
      return generateHealthAnalysis(message);
    default:
      return generateGeneralAnalysis(message);
  }
}

function generateCareerAnalysis(message: string): string {
  return `## 🎯 职业决策分析报告

### 1. 问题澄清
基于您的描述，我识别出以下关键决策要素：
- **核心冲突**：${extractKeyElements(message)}
- **时间紧迫性**：中等（建议2-4周内决策）
- **影响范围**：职业发展路径

### 2. SWOT深度分析

**💪 优势 (Strengths)**
- 现有经验和技能基础
- 对行业的深度理解
- 已建立的专业网络
- 清晰的职业目标认知

**⚠️ 劣势 (Weaknesses)**
- 新环境适应成本
- 潜在的技能差距
- 人际关系重建需要
- 初期表现压力

**🚀 机会 (Opportunities)**
- 薪资增长20%的财务提升
- 新技能和经验获取
- 职业网络扩展
- 长期职业轨迹优化

**⚡ 威胁 (Threats)**
- 试用期不确定性
- 公司文化适应风险
- 地理位置变更成本
- 工作生活平衡影响

### 3. 决策评分矩阵

| 评估维度 | 权重 | 当前工作 | 新机会 | 加权得分 |
|----------|------|----------|--------|----------|
| 薪资福利 | 25% | 7/10 | 9/10 | 当前:1.75 vs 新:2.25 |
| 职业发展 | 25% | 6/10 | 8/10 | 当前:1.50 vs 新:2.00 |
| 工作满意度 | 20% | 8/10 | 7/10 | 当前:1.60 vs 新:1.40 |
| 地点便利性 | 15% | 9/10 | 5/10 | 当前:1.35 vs 新:0.75 |
| 公司文化 | 15% | 7/10 | 6/10 | 当前:1.05 vs 新:0.90 |
| **总分** | **100%** | **34/50** | **35/50** | **当前:6.25 vs 新:7.30** |

### 4. 情景深度分析

**🌟 最佳情况 (30%概率)**
- 快速适应新环境，3个月内表现优异
- 获得超出预期的学习和成长机会
- 建立有价值的新人脉网络
- 为未来2-3年的更大发展奠定基础

**🌧️ 最糟情况 (20%概率)**
- 文化适应困难，工作表现低于预期
- 生活成本增加抵消薪资增长
- 职业发展路径不如预期清晰
- 考虑在1年内再次跳槽

**⚖️ 现实情况 (50%概率)**
- 需要3-6个月适应期
- 薪资增长确实能改善生活质量
- 获得适度的新技能和经验
- 工作生活平衡需要重新调整

### 5. 风险缓解策略

**🛡️ 如果接受新工作：**
1. **财务缓冲**：确保有6个月生活费的紧急基金
2. **技能准备**：提前学习目标岗位所需关键技能
3. **网络建设**：入职前就开始建立新同事关系
4. **生活安排**：提前考察新地点的生活设施

**🤝 谈判建议：**
- 薪资：尝试在offer基础上再提升5-10%
- 入职时间：争取1个月交接期而非标准的2周
- 远程工作：协商部分时间远程工作减少通勤影响
- 培训支持：要求公司提供专业技能培训预算

### 6. 最终建议

**🎯 推荐选择：接受新工作机会**

**置信度：75%**

**核心理由：**
1. 长期职业发展价值超过短期适应成本
2. 薪资增长带来的复合收益效应
3. 新环境将强制推动技能升级和人脉扩展
4. 即使最坏情况，也是宝贵的学习经历

### 7. 30天行动计划

**第1周：谈判和准备**
- [ ] 基于分析结果进行薪资谈判
- [ ] 深入了解新公司文化和团队
- [ ] 开始新地点的生活调研

**第2周：过渡安排**
- [ ] 完成当前工作的交接计划
- [ ] 制定详细的搬家/通勤方案
- [ ] 建立新工作的90天学习计划

**第3-4周：执行和调整**
- [ ] 正式入职并开始适应期
- [ ] 建立新的工作节奏和生活习惯
- [ ] 设定3个月和6个月的评估节点

**📊 成功指标：**
- 3个月内获得正面绩效反馈
- 6个月内建立2-3个关键业务关系
- 1年内实现薪资增长带来的财务目标
- 整体工作满意度保持在7/10以上

记住：没有完美的决定，只有基于当前信息的最佳选择。保持学习和调整的心态，任何选择都能带来成长价值。`;
}

function generateFinancialAnalysis(message: string): string {
  return `## 💰 财务决策分析报告

### 1. 投资决策框架

**当前财务状况假设：**
- 可投资资产：根据描述估算
- 风险承受能力：中等
- 投资期限：长期（3-5年）

### 2. 风险收益分析

**预期收益对比：**
| 投资选择 | 预期年化 | 风险等级 | 流动性 | 建议配置比例 |
|----------|----------|----------|--------|--------------|
| 保守储蓄 | 2-3% | 低 | 高 | 20-30% |
| 指数基金 | 6-8% | 中 | 中 | 40-50% |
| 个股投资 | 8-12% | 高 | 中 | 10-20% |
| 债券基金 | 4-5% | 低-中 | 中 | 20-30% |

### 3. 情景压力测试

**市场下跌30%情景：**
- 整体投资组合预期下跌：15-20%
- 心理承受能力评估
- 追加投资计划准备

### 4. 税务优化策略
- 充分利用免税额度
- 长期持有享受税收优惠
- 分散投资时点降低风险

### 5. 实施建议
1. **紧急基金**：保持6个月生活费
2. **分散投资**：不要将所有资金投入单一选择
3. **定期复盘**：每季度评估调整一次
4. **长期视角**：避免短期市场波动影响决策`;
}

function generateRelationshipAnalysis(message: string): string {
  return `## 💝 人际关系决策分析

### 1. 关系现状评估
**关系健康度检查：**
- 沟通质量评估
- 价值观一致性
- 情感投入对等性
- 未来规划一致性

### 2. 决策影响分析
**短期影响：**
- 情绪变化
- 社交圈影响
- 日常生活改变

**长期影响：**
- 个人成长轨迹
- 未来关系模式
- 自我认知发展

### 3. 沟通策略建议
**最佳沟通时机：**
选择双方情绪稳定、有充足时间深入交流的时机

**沟通框架：**
- 使用"我感受"陈述
- 避免指责性语言
- 设定明确边界
- 给予对方表达空间

### 4. 自我关怀计划
无论决定如何，都要：
- 保持社交支持网络
- 维持健康生活习惯
- 给自己适应和恢复的时间
- 必要时寻求专业支持

### 5. 行动计划
1. **自我反思**：明确自己真正的需求和底线
2. **沟通准备**：预设可能的对话场景
3. **支持系统**：告知信任的朋友或家人
4. **后续跟进**：设定评估时间节点`;
}

function generateHealthAnalysis(message: string): string {
  return `## 🏥 健康决策分析

### 1. 医疗决策框架
**决策要素：**
- 治疗方案有效性
- 潜在风险和副作用
- 生活质量影响
- 经济成本考量

### 2. 循证医学分析
**治疗方案对比：**
基于最新医学研究和临床数据

### 3. 第二意见清单
**需要咨询医生的关键问题：**
1. 治疗成功率和预期效果
2. 可能的并发症和风险
3. 替代治疗方案
4. 不治疗的后果
5. 恢复期和生活质量影响

### 4. 支持系统建立
- 医疗团队选择
- 家人朋友支持
- 心理支持资源

### 5. 决策工具
建议使用决策辅助工具：
- 风险收益权衡表
- 生活质量评估量表
- 决策后悔最小化框架`;
}

function generateGeneralAnalysis(message: string): string {
  return `## 🎯 通用决策分析

### 1. 问题结构化
**核心决策：**
${message}

**关键要素：**
- 目标明确性
- 约束条件识别
- 成功标准定义

### 2. 信息收集框架
**已知信息：**
[整理用户已提供的信息]

**需要补充：**
[指出需要进一步了解的关键信息]

### 3. 选项生成技术
使用SCAMPER方法：
- **替代(Substitute)**：有什么可以替换的？
- **结合(Combine)**：能否结合不同方案？
- **适应(Adapt)**：如何调整适应？
- **修改(Modify)**：哪些方面可以修改？
- **放大(Put to other uses)**：其他用途？
- **消除(Eliminate)**：能否简化？
- **重组(Rearrange)**：重新组合？

### 4. 决策矩阵工具
建立评估标准，进行量化分析

### 5. 实施和监控
- 设定SMART目标
- 建立反馈机制
- 制定调整策略`;
}

function extractKeyElements(message: string): string {
  // 提取消息中的关键决策要素
  const keywords = message.match(/\d+%|薪资|工作|机会|选择|决定|应该|是否|要不要/g);
  return keywords ? keywords.join('、') : '重要人生选择';
}

export async function POST(request: NextRequest) {
  try {
    const { message, history, decisionContext }: ChatRequest = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    // 模拟流式响应（实际项目中可以集成真实的AI API）
    const aiResponse = generateAIResponse(message, history, decisionContext);
    
    const response: ChatResponse = {
      message: aiResponse,
      analysis: {
        recommendation: {
          choice: "基于分析的最佳选择",
          confidence: 75,
          reason: "综合评估后的核心依据",
          actionSteps: [
            "第一步：收集更多信息",
            "第二步：制定详细计划",
            "第三步：执行并监控"
          ]
        },
        alternatives: [
          {
            option: "选择A",
            pros: ["优势1", "优势2"],
            cons: ["劣势1", "劣势2"],
            risk: "medium"
          },
          {
            option: "选择B", 
            pros: ["优势1", "优势2"],
            cons: ["劣势1", "劣势2"],
            risk: "low"
          }
        ]
      }
    };

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}