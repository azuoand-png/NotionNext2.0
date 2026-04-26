import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import NotionIcon from '@/components/NotionIcon'

export default function ArticleInfo(props) {
  const { post } = props
  const { locale } = useGlobal()

  // 安全获取标签颜色信息
  // 优先使用 post.tagItems（包含颜色），否则回退到 plain tags 并赋予灰色
  const tagItems = post?.tagItems || []
  const plainTags = post?.tags || []
  const tagsWithColor = tagItems.length > 0 
    ? tagItems 
    : plainTags.map(tag => ({ name: tag, color: 'gray' }))

  return (
    // 添加 overflow-visible 防止标题放大时被裁剪
    <section className='mt-2 text-gray-600 dark:text-gray-400 leading-8 overflow-visible'>
      <h2 className='blog-item-title mb-5 font-bold text-black text-xl md:text-2xl no-underline'>
        {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post?.pageIcon} />}
        {/* 标题悬停放大：确保 inline-block 且父容器不裁剪 */}
        <span className="inline-block transition-transform duration-300 hover:scale-110 origin-left">
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
                // 颜色值可能是 'gray', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown'
                const tagColor = t.color || 'gray'
                // 使用 Notion 预设的背景色类（如果主题已定义），否则回退到 bg-gray-100
                // 注意：notion-${color}_background 类在 NotionNext 的主题中是存在的
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
