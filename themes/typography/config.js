const CONFIG = {
  // 博客標題 雙語言
  TYPOGRAPHY_BLOG_NAME: process.env.NEXT_PUBLIC_TYPOGRAPHY_BLOG_NAME || '磕学英语',
  TYPOGRAPHY_BLOG_NAME_EN: process.env.NEXT_PUBLIC_TYPOGRAPHY_BLOG_NAME_EN || process.env.NEXT_PUBLIC_TYPOGRAPHY_BLOG_NAME || 'https://blog.baoya33.com',

  TYPOGRAPHY_POST_AD_ENABLE: process.env.NEXT_PUBLIC_TYPOGRAPHY_POST_AD_ENABLE || true,
  TYPOGRAPHY_POST_COVER_ENABLE: process.env.NEXT_PUBLIC_TYPOGRAPHY_POST_COVER_ENABLE || true,
  TYPOGRAPHY_ARTICLE_RECOMMEND_POSTS: process.env.NEXT_PUBLIC_TYPOGRAPHY_ARTICLE_RECOMMEND_POSTS || true,

  // 菜单配置
  TYPOGRAPHY_MENU_CATEGORY: true,
  TYPOGRAPHY_MENU_TAG: true,
  TYPOGRAPHY_MENU_ARCHIVE: true,

  // 不蒜子统计
  ANALYTICS_BUSUANZI_SITE_ID: true,

  // ========== 支持打赏按钮 ==========
  HEO_INFO_CARD_URL3: 'https://kexuelanguage.vercel.app/support',
  HEO_INFO_CARD_TEXT3: '支持打赏',

  // ========== 下方两条文字链接 ==========
  CUSTOM_LINK1_TEXT: '更多学习频道',
  CUSTOM_LINK1_URL: 'https://kexuelanguage.vercel.app/channel',
  CUSTOM_LINK2_TEXT: '联系作者',
  CUSTOM_LINK2_URL: 'https://kexuelanguage.vercel.app/contact',
}

export default CONFIG
