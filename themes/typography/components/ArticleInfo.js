import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import NotionIcon from '@/components/NotionIcon'
import { useEffect } from 'react'

export default function ArticleInfo(props) {
  const { post } = props
  const { locale } = useGlobal()

  // 原始标签处理逻辑
  const tagItems = post?.tagItems || []
  const plainTags = post?.tags || []
  const tagsWithColor = tagItems.length > 0 
    ? tagItems 
    : plainTags.map(tag => ({ name: tag, color: 'gray' }))

  const enableBusuanzi = siteConfig('ANALYTICS_BUSUANZI_SITE_ID', null, {})

  // 手动刷新不蒜子计数
  useEffect(() => {
    if (enableBusuanzi && window.busuanzi) {
      window.busuanzi.fetch()
    }
  }, [enableBusuanzi])

  return (
    <section className='mt-2 text-gray-600 dark:text-gray-400 leading-8'>
      <h2 className='blog-item-title mb-5 font-bold text-black text-xl md:text-2xl no-underline'>
        {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post?.pageIcon} />}
        {post?.title}
      </h2>

      <div className='flex flex-wrap text-[var(--primary-color)] dark:text-gray-300'>
        {post?.type !== 'Page' && (
          <header className='text-md text-[var(--primary-color)] dark:text-gray-300 flex-wrap flex items-center leading-6 gap-2'>
            <div className='space-x-2'>
              <span className='text-sm'>
                发布于
                <SmartLink
                  className='p-1 hover:text-red-400 transition-all duration-200'
                  href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}>
                  {post.date?.start_date || post.createdTime}
                </SmartLink>
              </span>
            </div>

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

            {/* 不蒜子阅读次数（新增） */}
            {enableBusuanzi && (
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <i className="fas fa-eye"></i>
                <span>已被阅读</span>
                <span id="busuanzi_value_page_pv">0</span>
                <span>次</span>
              </div>
            )}
          </header>
        )}
      </div>
    </section>
  )
}
