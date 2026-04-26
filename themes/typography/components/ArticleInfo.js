import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import NotionIcon from '@/components/NotionIcon'

export default function ArticleInfo(props) {
  const { post } = props
  const { locale } = useGlobal()

  // 获取标签颜色信息
  const tagItems = post?.tagItems || []
  const plainTags = post?.tags || []
  const tagsWithColor = tagItems.length > 0 
    ? tagItems 
    : plainTags.map(tag => ({ name: tag, color: 'gray' }))

  // 格式化发布日期
  const publishDate = post.date?.start_date || post.createdTime

  // 是否开启不蒜子统计
  const enableBusuanzi = siteConfig('ANALYTICS_BUSUANZI_SITE_ID', null, {})

  return (
    <section className="sticky top-0 z-10 mt-2 text-gray-600 dark:text-gray-400 leading-8 overflow-visible" style={{ background: 'transparent' }}>
      {/* 标题 */}
      <h2 className="blog-item-title mb-3 font-bold text-black text-xl md:text-2xl no-underline">
        {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post?.pageIcon} />}
        <span className="inline-block transition-transform duration-300 hover:scale-110 origin-left">
          {post?.title}
        </span>
      </h2>

      {/* 元信息行：日期 + 标签 + 阅读次数，水平排列 */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400 pb-2 border-b border-red-800/50">
        {/* 发布日期 */}
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

        {/* 标签列表 */}
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

        {/* 不蒜子阅读次数（仅在启用时显示） */}
        {enableBusuanzi && (
          <div className="flex items-center space-x-1">
            <i className="fas fa-eye"></i>
            <span>已被阅读</span>
            <span id="busuanzi_value_page_pv">0</span>
            <span>次</span>
          </div>
        )}
      </div>
    </section>
  )
}
