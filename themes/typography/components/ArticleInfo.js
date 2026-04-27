import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import NotionIcon from '@/components/NotionIcon'
import { useEffect, useState } from 'react'

export default function ArticleInfo(props) {
  const { post } = props
  const { locale } = useGlobal()
  const [wordCount, setWordCount] = useState(0)
  const [readTime, setReadTime] = useState(1)

  const tagItems = post?.tagItems || []
  const plainTags = post?.tags || []
  const tagsWithColor = tagItems.length > 0 
    ? tagItems 
    : plainTags.map(tag => ({ name: tag, color: 'gray' }))

  const enableBusuanzi = siteConfig('ANALYTICS_BUSUANZI_SITE_ID', null, {})

  // 不蒜子刷新（修复：确保每次文章切换后重新获取，并增加重试机制）
  useEffect(() => {
    if (!enableBusuanzi) return
    const refreshBusuanzi = (retries = 3) => {
      if (window.busuanzi && typeof window.busuanzi.fetch === 'function') {
        window.busuanzi.fetch()
      } else if (retries > 0) {
        setTimeout(() => refreshBusuanzi(retries - 1), 200)
      }
    }
    refreshBusuanzi()
  }, [enableBusuanzi, post?.id])  // 依赖文章ID，确保切换文章时重新刷新

  // 计算文章字数（从 DOM 中获取正文纯文本）
  useEffect(() => {
    if (!post) return
    const timer = setTimeout(() => {
      const articleWrapper = document.getElementById('article-wrapper')
      if (articleWrapper) {
        const text = articleWrapper.innerText || articleWrapper.textContent || ''
        const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length
        const englishWords = (text.match(/[a-zA-Z]+(?:['’-]?[a-zA-Z]+)?/g) || []).length
        const total = chineseChars + englishWords
        setWordCount(total)
        setReadTime(Math.max(1, Math.ceil(total / 300)))
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [post])

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

      {/* 字数和阅读时长统计行，行距1.5倍 */}
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex gap-3 font-light leading-6">
          <span className="flex whitespace-nowrap items-center">
            <i className="pl-1 pr-2 fas fa-file-word"></i>
            <span>字数</span>&nbsp;
            <span>{wordCount}</span>
          </span>
          <span className="flex whitespace-nowrap items-center">
            <i className="mr-1 fas fa-clock"></i>
            <span>阅读时长≈</span>&nbsp;
            <span>{readTime}</span>&nbsp;分钟
          </span>
        </div>
      </div>
    </section>
  )
}
