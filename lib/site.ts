export const site = {
  name: "Suly",
  signature: "用代码与文字，记录生活的光。",
  bio: "你好，欢迎来到我的个人博客。我是一名热爱生活与音乐的全栈开发者，喜欢把想法做成漂亮的产品，也喜欢用文字记录思考与生活。这里是我的自留地。",
  // 背景图：留空则使用默认深色渐变；填入 /public 下的图片路径（如 "/bg.jpg"）或外链 URL 即可生效
  backgroundImage: "/bg.jpg",
  // 头像：留空则显示名字首字母的渐变圆；填入 /public 下的图片路径（如 "/avatar.jpg"）或外链 URL 即可生效
  avatar: "avatar.png",
  social: [
    { label: "GitHub", href: "https://github.com/KirateSuly" },
    { label: "Email", href: "mailto:you@example.com" },
    { label: "Bilibili", href: "https://bilibili.com/" },
  ],
};

export const stats = [
  { label: "文章", value: "3", href: "/articles" },
  { label: "说说", value: "3", href: "/moments" },
  { label: "项目", value: "3", href: "/projects" },
  { label: "音乐", value: "3", href: "/music" },
];

// bento 板块数据：轮播（insights）+ 静态卡片（photo / records / theme）
export const bento = {
  insights: [
    {
      badge: "LATEST INSIGHT",
      date: "2026.08.25 19.30",
      title: "生命周期",
      desc: "创建",
      image: "/covers/cover1.jpg",
    },
    {
      badge: "LATEST INSIGHT",
      date: "2026.05.15 09:12",
      title: "示例文章二",
      desc: "这里写文章简介",
      image: "/covers/cover2.jpg",
    },
    {
      badge: "LATEST INSIGHT",
      date: "2026.05.10 18:00",
      title: "示例文章三",
      desc: "这里写文章简介",
      image: "/covers/cover3.jpg",
    },
  ],
  photo: {
    title: "风景拍摄",
    desc: "随便拍拍",
    image: "/covers/cover2.jpg",
  },
  records: {
    badge: "RECORDS",
    date: "2026.04.15 11:25",
    title: "容器排版",
    desc: "新添加了三个容器，小美化",
    image: "/covers/cover3.jpg",
  },
  theme: {
    title: "箴言",
    desc: "流萤飞舞的深空",
    image:"/covers/cover4.jpg",
  },
};
