import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import NotionIcon from '@/components/NotionIcon'

export default function ArticleInfo(props) {
  const { post } = props
  const { locale } = useGlobal()

  // 从 post 中获取带颜色的标签列表（如果存在 tagItems，则使用；否则回退到普通 tag 数组）
  const tagItems = post?.tagItems || []
  const plainTags = post?.tags || []

  // 合并标签：优先使用 tagItems 中的颜色信息
  const tagsWithColor = tagItems.length > 0 
    ? tagItems 
    : plainTags.map(tag => ({ name: tag, color: 'gray' }))

  return (
    <section className='mt-2 text-gray-600 dark:text-gray-400 leading-8'>
      <h2 className='blog-item-title mb-5 font-bold text-black text-xl md:text-2xl no-underline'>
        {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post?.pageIcon} />}
        {/* 标题增加悬停放大效果 */}
        <span className="inline-block transition-transform duration-200 hover:scale-110">
          {post?.title}
        </span>
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
                // 使用 Notion 预设的背景色类，并添加悬停颜色互换效果
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
          </header>
        )}
      </div>
    </section>
  )
}
