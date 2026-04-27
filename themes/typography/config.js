const CONFIG = {
  // 博客標題 雙語言
  TYPOGRAPHY_BLOG_NAME: process.env.NEXT_PUBLIC_TYPOGRAPHY_BLOG_NAME || '磕学英语',
  TYPOGRAPHY_BLOG_NAME_EN: process.env.NEXT_PUBLIC_TYPOGRAPHY_BLOG_NAME_EN || process.env.NEXT_PUBLIC_TYPOGRAPHY_BLOG_NAME || 'baoya33',

  TYPOGRAPHY_POST_AD_ENABLE: process.env.NEXT_PUBLIC_TYPOGRAPHY_POST_AD_ENABLE || true, // 文章列表是否插入广告

  TYPOGRAPHY_POST_COVER_ENABLE: process.env.NEXT_PUBLIC_TYPOGRAPHY_POST_COVER_ENABLE || true, // 是否展示博客封面

  TYPOGRAPHY_ARTICLE_RECOMMEND_POSTS: process.env.NEXT_PUBLIC_TYPOGRAPHY_ARTICLE_RECOMMEND_POSTS || true, // 文章详情底部显示推荐

  // 菜单配置
  TYPOGRAPHY_MENU_CATEGORY: true, // 显示分类
  TYPOGRAPHY_MENU_TAG: true, // 显示标签
  TYPOGRAPHY_MENU_ARCHIVE: true, // 显示归档

  // 不蒜子统计
  ANALYTICS_BUSUANZI_SITE_ID: true,

  // ========== 新增：Heo 风格个人资料底部按钮配置 ==========
  HEO_INFO_CARD_URL1: 'https://kexuelanguage.vercel.app/contact',                     // 第一个按钮的链接
  HEO_INFO_CARD_ICON1: 'fas fa-user',               // 第一个按钮的图标
  HEO_INFO_CARD_URL2: 'https://kexuelanguage.vercel.app/channel',
  HEO_INFO_CARD_ICON2: 'fab fa-github',
  HEO_INFO_CARD_URL3: 'https://kexuelanguage.vercel.app/support',
  HEO_INFO_CARD_TEXT3: '支持打赏',                   // 第三个按钮的文字（带箭头）
}

export default CONFIG
