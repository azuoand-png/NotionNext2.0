import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import NotionIcon from '@/components/NotionIcon'
import { useEffect } from 'react'

export default function ArticleInfo(props) {
  const { post } = props
  const { locale } = useGlobal()

  const tagItems = post?.tagItems || []
  const plainTags = post?.tags || []
  const tagsWithColor = tagItems.length > 0 
    ? tagItems 
    : plainTags.map(tag => ({ name: tag, color: 'gray' }))

  const publishDate = post.date?.start_date || post.createdTime
  const enableBusuanzi = siteConfig('ANALYTICS_BUSUANZI_SITE_ID', null, {})

  // 手动刷新不蒜子计数（解决动态渲染后计数为0的问题）
  useEffect(() => {
    if (enableBusuanzi && window.busuanzi) {
      window.busuanzi.fetch()
    }
  }, [enableBusuanzi])

  return (
    // sticky 固定，距离顶部 5rem（避免贴边），毛玻璃背景遮挡正文
    <section className="sticky top-20 z-10 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 mt-2 text-gray-600 dark:text-gray-400 leading-8 overflow-visible">
      <h2 className="blog-item-title mb-3 font-bold text-black text-xl md:text-2xl no-underline">
        {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post?.pageIcon} />}
        <span className="inline-block transition-transform duration-300 hover:scale-110 origin-left">
          {post?.title}
        </span>
      </h2>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400 pb-3">
        <div className="flex items-center space-x-1">
          <i className="far fa-calendar-alt"></i>
          <span>发布于</span>
          <SmartLink
            className="hover:text-red-400 transition-all duration-200"
            href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
          >
            {publishDate}
          </SmartLink>
        </div>

        {post?.type !== 'Page' && tagsWithColor.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tagsWithColor.map(t => {
              const tagName = t.name
              const tagColor = t.color || 'gray'
              return (
                <SmartLink
                  key={tagName}
                  href={`/tag/${encodeURIComponent(tagName)}`}
                  className={`
                    inline-block px-2 py-0.5 rounded-full text-xs font-medium
                    notion-${tagColor}_background
                    transition-all duration-200
                    hover:!bg-[var(--primary-color)] hover:!text-white
                    dark:hover:!text-white
                  `}
                >
                  #{tagName}
                </SmartLink>
              )
            })}
          </div>
        )}

        {enableBusuanzi && (
          <div className="flex items-center space-x-1">
            <i className="fas fa-eye"></i>
            <span>已被阅读</span>
            <span id="busuanzi_value_page_pv">0</span>
            <span>次</span>
          </div>
        )}
      </div>

      {/* 下划线：宽度与主标题一致，粗细2磅 */}
      <div className="flex justify-start">
        <div className="w-fit h-[2px] bg-red-700 dark:bg-gray-400 rounded-full mt-1 mb-2"></div>
      </div>
    </section>
  )
}
