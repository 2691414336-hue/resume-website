import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Download, Briefcase, 
  GraduationCap, Code, Globe, BookOpen, Award,
  ChevronRight, Calendar, Star, Users, FileText
} from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  
  // 简历数据 - 从简历文档中提取
  const resumeData = {
    personalInfo: {
      name: "郭大鹏",
      title: "会计学专业学生",
      email: "2691414336@qq.com",
      phone: "18168034926",
      location: "江苏南京",
      age: "20岁",
      politicalStatus: "共青团员",
      jobTarget: "咨询/财务/审计",
      targetCities: "南京/广州/上海"
    },
    education: [
      {
        institution: "中山大学",
        degree: "管理学院 | 会计学",
        period: "2023.9-至今",
        gpa: "3.7/4.0",
        courses: ["财务管理（92）", "中级财务会计（93）", "税法（90）", "管理会计", "管理学", "计量经济学", "审计学"]
      },
      {
        institution: "法国凯致商学院",
        degree: "交换生项目",
        period: "2025.9-2026.3",
        description: "通过院内层层筛选，成功获得公费前往法国凯致商学院进行为期一个学期的交流交换资格"
      }
    ],
    experiences: [
      {
        title: "审计实习生",
        company: "安永华明会计师事务所（特殊普通合伙）南京分所",
        period: "2026.01.19 - 2026.03.27",
        responsibilities: [
          "协助项目组完成年度审计外勤工作，参与实质性测试、抽凭及底稿编制，展现对审计流程的熟悉和严谨的数据处理能力",
          "负责审计证据的收集与整理，确保审计工作的合规性和准确性",
          "参与财务报表分析，协助识别潜在风险点并提出改进建议"
        ]
      },
      {
        title: "ERP系统及凭证处理专员",
        company: "江苏汉典生物科技有限公司",
        period: "2025.7-2025.9",
        responsibilities: [
          "负责将原始凭证中的会计科目数据录入ERP系统，同时对公司往来账目进行核对盘查，成功帮助公司的IPO融资上市",
          "负责设置统一账务核算体系，对所属项目部、分公司进行财务核算与管理",
          "参与企业财务报表的编制与制定，如资产负债表、利润表、现金流量表，并对其进行分析，提供决策支持"
        ]
      },
      {
        title: "队员",
        company: "第18届'赢在中大'创业大赛",
        period: "2025.3-2025.4",
        responsibilities: [
          "行业分析：带领4人团队2天内拆解下沉市场老年康养行业市场规模和竞争格局，分析头部品牌份额",
          "策略设计：首创2条子品牌线，针对下沉市场三类不同目标群体设计三级产品矩阵",
          "结果呈现：3天内完成19页全英文PPT汇报制作，运用PowerPoint将核心数据与解决方案图表化呈现"
        ]
      }
    ],
    campusActivities: [
      {
        title: "舞策副台长",
        organization: "中山大学广播台",
        period: "2024.9-至今",
        responsibilities: [
          "统筹50余人团队，年度策划30余场校内外表演活动",
          "与12个校内社团和2家校外舞台公司合作，总计吸引2000+人次观看，推文最高浏览量6500+",
          "承办院级及校级活动，参与筹办新生军歌大赛、校园歌手大赛、2024中山大学百年校庆等大型活动"
        ]
      },
      {
        title: "生活委员",
        organization: "班级",
        period: "2023.9-2024.6",
        responsibilities: [
          "负责日常的宿舍查寝，关注同学们的生活环境和生活状况",
          "负责校文明宿舍和贫困生的评定，具有公平公正的精神和敏锐的判断力"
        ]
      }
    ],
    skills: {
      professional: [
        { name: "PPT/Word商业文档撰写", level: 90 },
        { name: "Excel/Rapidminer数据分析统计", level: 85 },
        { name: "Python编程", level: 80 },
        { name: "Canva/剪映/PS可视化设计", level: 85 },
        { name: "SQL查询语言", level: 75 },
        { name: "X-mind思维导图", level: 90 }
      ],
      languages: [
        { name: "中文", level: "母语" },
        { name: "粤语", level: "能听懂并理解" },
        { name: "英语", level: "CET-6 615分，CET-4 610分，雅思（IELTS）7.5分" }
      ],
      certificates: [
        "雅思（IELTS）7.5分 - 优秀的英语听说读写综合能力，具备跨文化沟通和处理英文工作文档的专业水平"
      ],
      strengths: [
        "管理与沟通协调能力",
        "数据分析与商业能力", 
        "跨文化沟通与英语表达",
        "文档汇编与信息输出",
        "执行力与抗压能力"
      ]
    },
    awards: [
      {
        title: "中山大学优秀学生奖学金",
        description: "三等奖",
        period: "2023.9-2024.6"
      },
      {
        title: "优秀志愿者",
        description: "一星级志愿者，累计志愿时数超过425h",
        period: "2023.9-2024.6"
      }
    ],
    readings: [
      "古斯塔夫·勒庞《乌合之众：大众心理研究》",
      "彼得·德鲁克《管理的实践》", 
      "薛兆丰《经济学讲义》"
    ]
  };

  // 滚动动画组件
  const ScrollReveal = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                郭大鹏
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? '🌙' : '☀️'}
              </button>
              
              <a 
                href="../郭大鹏简历.docx" 
                download
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Download size={18} />
                <span>下载简历</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero 部分 */}
        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="md:col-span-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                你好，我是 <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{resumeData.personalInfo.name}</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-200 mb-4 sm:mb-6">
                {resumeData.personalInfo.title} | {resumeData.personalInfo.jobTarget}
              </p>
              <p className="text-gray-300 mb-6 md:mb-8 max-w-2xl text-sm sm:text-base">
                具备管理与沟通协调能力、数据分析与商业能力、跨文化沟通与英语表达、文档汇编与信息输出、执行力与抗压能力。
                寻求在{resumeData.personalInfo.targetCities}的{resumeData.personalInfo.jobTarget}职位机会。
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 md:mb-8">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Mail size={16} className="flex-shrink-0" />
                  <span className="text-sm sm:text-base break-all">{resumeData.personalInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Phone size={16} className="flex-shrink-0" />
                  <span className="text-sm sm:text-base">{resumeData.personalInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin size={16} className="flex-shrink-0" />
                  <span className="text-sm sm:text-base">{resumeData.personalInfo.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end order-first md:order-last mb-6 md:mb-0">
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-2 border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.5)] overflow-hidden">
                  <img 
                    src="/me.jpg" 
                    alt="郭大鹏" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm shadow-lg">
                  在线
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 教育经历 */}
        <ScrollReveal delay={0.1}>
          <section className="mb-12 md:mb-16">
            <div className="flex items-center mb-6 md:mb-8">
              <GraduationCap className="text-blue-400 mr-3 w-5 h-5 sm:w-6 sm:h-6" size={20} />
              <h2 className="text-xl sm:text-2xl font-bold text-white">教育经历</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="bg-[#111827] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                      <p className="text-gray-300">{edu.degree}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-900/30 text-blue-200 rounded-full text-sm">
                      {edu.period}
                    </span>
                  </div>
                  
                  {edu.gpa && (
                    <div className="mb-4">
                      <span className="font-semibold text-gray-300">GPA: </span>
                      <span className="text-gray-400">{edu.gpa}</span>
                    </div>
                  )}
                  
                  {edu.courses && (
                    <div className="mb-4">
                      <p className="font-semibold text-gray-300 mb-2">主修课程:</p>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {edu.description && (
                    <p className="text-gray-400">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* 工作/项目经历 */}
        <ScrollReveal delay={0.2}>
          <section className="mb-12 md:mb-16">
            <div className="flex items-center mb-6 md:mb-8">
              <Briefcase className="text-purple-400 mr-3 w-5 h-5 sm:w-6 sm:h-6" size={20} />
              <h2 className="text-xl sm:text-2xl font-bold text-white">工作与项目经历</h2>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              {resumeData.experiences.map((exp, index) => (
                <div key={index} className="bg-[#111827] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {index === 0 ? <span className="font-extrabold">{exp.title}</span> : exp.title}
                      </h3>
                      <p className="text-gray-300">{exp.company}</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-900/30 text-purple-200 rounded-full text-sm">
                      {exp.period}
                    </span>
                  </div>
                  
                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start">
                        <ChevronRight size={16} className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-400">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* 校园经历 */}
        <ScrollReveal delay={0.3}>
          <section className="mb-12 md:mb-16">
            <div className="flex items-center mb-6 md:mb-8">
                <Users className="text-green-400 mr-3 w-5 h-5 sm:w-6 sm:h-6" size={20} />
              <h2 className="text-xl sm:text-2xl font-bold text-white">校园经历</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {resumeData.campusActivities.map((activity, index) => (
                <div key={index} className="bg-[#111827] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{activity.title}</h3>
                      <p className="text-gray-300">{activity.organization}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-900/30 text-green-200 rounded-full text-sm">
                      {activity.period}
                    </span>
                  </div>
                  
                  <ul className="space-y-2">
                    {activity.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start">
                        <ChevronRight size={16} className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-400">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* 技能 */}
        <ScrollReveal delay={0.4}>
          <section className="mb-12 md:mb-16">
            <div className="flex items-center mb-6 md:mb-8">
                <Code className="text-orange-400 mr-3 w-5 h-5 sm:w-6 sm:h-6" size={20} />
              <h2 className="text-xl sm:text-2xl font-bold text-white">技能与能力</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {/* 专业技能 */}
              <div className="bg-[#111827] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <h3 className="text-lg font-bold mb-4 text-white">专业技能</h3>
                <div className="space-y-4">
                  {resumeData.skills.professional.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 语言能力 */}
              <div className="bg-[#111827] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <h3 className="text-lg font-bold mb-4 text-white">语言能力</h3>
                <div className="space-y-4">
                  {resumeData.skills.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                      <span className="font-medium text-gray-300">{lang.name}</span>
                      <span className="text-gray-400">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 个人优势 */}
              <div className="bg-[#111827] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <h3 className="text-lg font-bold mb-4 text-white">个人优势</h3>
                <div className="space-y-3">
                  {resumeData.skills.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-800 rounded-lg">
                      <Star size={16} className="text-yellow-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 证书与认证 */}
        <ScrollReveal delay={0.45}>
          <section className="mb-12 md:mb-16">
            <div className="flex items-center mb-6 md:mb-8">
                <FileText className="text-red-400 mr-3 w-5 h-5 sm:w-6 sm:h-6" size={20} />
              <h2 className="text-xl sm:text-2xl font-bold text-white">证书与认证</h2>
            </div>
            
                <div className="bg-[#111827] rounded-xl p-4 md:p-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                      <Award size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">雅思 (IELTS) 7.5分</h3>
                      <p className="text-gray-300">国际英语语言测试系统</p>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">
                    优秀的英语听说读写综合能力，具备跨文化沟通和处理英文工作文档的专业水平。
                  </p>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar size={14} className="mr-2" />
                    <span>有效期: 2025年12月</span>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                      <Award size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">大学英语六级 (CET-6) 615分</h3>
                      <p className="text-gray-300">全国大学英语六级考试</p>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">
                    优秀的英语阅读和写作能力，具备处理专业英文文献和商务文档的能力。
                  </p>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar size={14} className="mr-2" />
                    <span>获得时间: 2024年6月</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 奖项与荣誉 */}
        <ScrollReveal delay={0.5}>
          <section className="mb-12 md:mb-16">
            <div className="flex items-center mb-6 md:mb-8">
              <Award className="text-yellow-400 mr-3 w-5 h-5 sm:w-6 sm:h-6" size={20} />
              <h2 className="text-xl sm:text-2xl font-bold text-white">奖项与荣誉</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {resumeData.awards.map((award, index) => (
                <div key={index} className="bg-[#111827] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className="flex items-start">
                    <Award size={20} className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-white">{award.title}</h3>
                      <p className="text-gray-300">{award.description}</p>
                      <span className="text-sm text-gray-400">{award.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* 阅读与兴趣 */}
        <ScrollReveal delay={0.6}>
          <section className="mb-12 md:mb-16">
            <div className="flex items-center mb-6 md:mb-8">
              <BookOpen className="text-indigo-400 mr-3 w-5 h-5 sm:w-6 sm:h-6" size={20} />
              <h2 className="text-xl sm:text-2xl font-bold text-white">近期阅读</h2>
            </div>
            
            <div className="bg-[#111827] rounded-xl p-4 md:p-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                {resumeData.readings.map((book, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <BookOpen size={16} className="text-indigo-500 mr-2" />
                      <span className="text-white font-medium">书籍 {index + 1}</span>
                    </div>
                    <p className="text-gray-300">{book}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 dark:bg-gray-950 border-t border-gray-700 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <div className="flex items-center space-x-2 justify-center md:justify-start">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-white font-bold text-sm sm:text-base">郭大鹏</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 md:mt-2">会计学专业学生 | 咨询/财务/审计</p>
            </div>
            
            <div className="text-gray-400 text-xs sm:text-sm text-center">
              <p>© {new Date().getFullYear()} 郭大鹏. 保留所有权利.</p>
              <p className="mt-1">最后更新: 2025年12月</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
