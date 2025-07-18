# AI决策助手 - 智能人生决策分析专家

基于Next.js开发的AI决策助手网页应用，为您提供职业、财务、人际关系等生活重要决策的专业分析和建议。

## ✨ 功能特色

### 🎯 核心能力
- **智能决策分析**：基于专业框架的深度分析
- **多场景支持**：职业、财务、关系、健康等决策类型
- **结构化建议**：SWOT分析、决策矩阵、风险评估
- **个性化方案**：根据具体情况定制行动建议

### 🎨 用户体验
- **现代化界面**：简洁优雅的设计，支持深色模式
- **响应式设计**：完美适配桌面端、平板、手机
- **实时交互**：流畅的对话体验，支持markdown渲染
- **本地存储**：对话历史自动保存，支持多会话管理

### 🔧 技术特性
- **Next.js 14**：最新React框架，性能优化
- **TypeScript**：类型安全，开发体验佳
- **Tailwind CSS**：原子化CSS，快速开发
- **Zustand**：轻量级状态管理
- **Vercel部署**：一键部署，全球CDN加速

## 🚀 快速开始

### 本地开发

1. **克隆项目**
```bash
git clone [your-repo-url]
cd ai-decision-assistant
```

2. **安装依赖**
```bash
npm install
# 或使用 yarn
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
# 或使用 yarn
yarn dev
```

4. **访问应用**
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 环境配置

复制环境变量模板：
```bash
cp .env.local.example .env.local
```

根据需要修改 `.env.local` 文件中的配置。

## 🌐 部署到Vercel

### 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ai-decision-assistant)

### 手动部署

1. **安装Vercel CLI**
```bash
npm i -g vercel
```

2. **部署项目**
```bash
vercel --prod
```

3. **设置环境变量**（可选）
在Vercel控制台中设置环境变量。

## 📁 项目结构

```
ai-decision-assistant/
├── app/
│   ├── api/chat/          # AI对话API
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页
├── components/
│   ├── ChatInterface.tsx  # 聊天界面主组件
│   └── ui/               # 通用UI组件
├── lib/
│   ├── decisionTemplates.ts  # 决策分析模板
│   └── utils.ts          # 工具函数
├── stores/
│   └── chatStore.ts      # 状态管理
├── types/
│   └── chat.ts          # TypeScript类型定义
├── public/              # 静态资源
└── README.md
```

## 🎯 使用指南

### 开始对话
1. **新建对话**：点击"新建对话"按钮
2. **输入问题**：在底部输入框描述你的决策问题
3. **获取分析**：AI将提供结构化的决策分析
4. **继续对话**：可以追问更多细节

### 决策类型
应用支持以下决策场景：
- **职业决策**：工作选择、跳槽、薪资谈判
- **财务决策**：投资理财、买房、预算规划
- **关系决策**：感情问题、人际交往、家庭关系
- **健康决策**：治疗方案、生活方式选择
- **教育决策**：学习规划、留学选择
- **通用决策**：其他重要选择

### 分析框架
每个决策都会经过：
1. **问题澄清** - 明确核心矛盾
2. **信息收集** - 识别关键信息
3. **结构化分析** - SWOT、决策矩阵
4. **情景模拟** - 最好/最坏/现实情况
5. **行动建议** - 具体实施步骤

## 🔧 技术栈

### 前端
- **Next.js 14** - React框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **Lucide React** - 图标库

### 状态管理
- **Zustand** - 轻量级状态管理
- **localStorage** - 本地数据持久化

### AI引擎
- **内置AI** - 专业决策分析模板
- **可扩展** - 支持集成OpenAI、Claude等API

### 部署
- **Vercel** - 无服务器部署
- **Edge Functions** - 边缘计算

## 🎨 自定义配置

### 主题定制
在 `tailwind.config.js` 中修改颜色方案：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        // ... 其他颜色
      }
    }
  }
}
```

### AI提示词定制
在 `lib/decisionTemplates.ts` 中修改决策分析模板。

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 支持

如有问题或建议，请通过以下方式联系：
- 提交 [Issue](https://github.com/your-username/ai-decision-assistant/issues)
- 发送邮件至 [your-email@example.com](mailto:your-email@example.com)

## 🙏 致谢

- 感谢所有开源项目的贡献者
- 感谢使用本项目的每一位用户

---

**免责声明**：本工具提供的建议仅供参考，不构成专业建议。重要决策请咨询相关专业人士。