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

  // 格式化日期
  const publishDate = post.date?.start_date || post.createdTime
  const formattedDate = formatDateFmt(post?.publishDate, 'yyyy-MM-dd')

  // 判断是否开启不蒜子统计
  const enableBusuanzi = siteConfig('ANALYTICS_BUSUANZI_SITE_ID', null, {})

  return (
    // 修改点1：添加 sticky 定位，使标题区域滚动时固定在顶部
    <section className='sticky top-0 z-10 bg-white dark:bg-gray-900 mt-2 text-gray-600 dark:text-gray-400 leading-8 overflow-visible'>
      <h2 className='blog-item-title mb-3 font-bold text-black text-xl md:text-2xl no-underline'>
        {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post?.pageIcon} />}
        {/* 标题悬停放大效果 */}
        <span className="inline-block transition-transform duration-300 hover:scale-110 origin-left">
          {post?.title}
        </span>
      </h2>

      {/* 修改点2：新增第二行，显示日期和阅读次数 */}
      <div className='flex flex-wrap justify-between items-center text-sm text-gray-500 dark:text-gray-400 pb-3 mb-2 border-b border-gray-200 dark:border-gray-700'>
        <div className='flex items-center space-x-2'>
          <i className='far fa-calendar-alt'></i>
          <span>发布于</span>
          <SmartLink
            className='hover:text-red-400 transition-all duration-200'
            href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}>
            {publishDate}
          </SmartLink>
        </div>

        {/* 不蒜子阅读次数显示 */}
        {enableBusuanzi && (
          <div className='flex items-center space-x-1'>
            <i className='fas fa-eye'></i>
            <span id="busuanzi_value_page_pv">0</span>
            <span>次阅读</span>
          </div>
        )}
      </div>

      {/* 标签区域 */}
      {post?.type !== 'Page' && tagsWithColor.length > 0 && (
        <div className='flex flex-wrap text-[var(--primary-color)] dark:text-gray-300 pb-2'>
          <div className='flex flex-wrap gap-2'>
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
                    dark:hover:!bg-[var(--primary-color)] dark:hover:!text-black
                  `}
                >
                  #{tagName}
                </SmartLink>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
