import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import SmartLink from '@/components/SmartLink'

export const BlogItem = props => {
  const { post } = props

  // 获取封面图
  const coverImage =
    post?.pageCoverThumbnail ||
    post?.pageCover ||
    post?.cover ||
    post?.thumbnail ||
    (post?.blockMap && post?.blockMap?.cover?.length > 0 ? post.blockMap.cover : null)

  // 副标题就是 summary
  const subTitle = post?.summary || ''

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      {/* 图片区域 */}
      {coverImage && (
        <div className="relative w-full pt-[56.25%] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <SmartLink href={post.href} passHref legacyBehavior>
            <LazyImage
              src={coverImage}
              className="absolute inset-0 w-full h-full object-cover object-center hover:scale-110 duration-500"
              alt={post.title}
            />
          </SmartLink>
        </div>
      )}

      {/* 内容区域 */}
      <article className="article-info p-4 flex flex-col">
        {/* 第1行：主标题 - 限制2行 */}
        <h2 className="mb-2 line-clamp-2">
          <SmartLink
            href={post.href}
            className="text-xl font-bold text-[var(--primary-color)] dark:text-white hover:underline decoration-2"
          >
            {siteConfig('POST_TITLE_ICON') && (
              <NotionIcon icon={post.pageIcon} className="mr-1 inline" />
            )}
            {post.title}
          </SmartLink>
        </h2>

        {/* 第2行：副标题 (summary) - 限制2行 */}
        {subTitle && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
            {subTitle}
          </div>
        )}

        {/* 第3行：日期（左） + 标签（右，即右下角） */}
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <i className="far fa-calendar-alt"></i>
            <span>{formatDateFmt(post?.publishDate || post?.date?.start_date || post?.createdTime, 'yyyy-MM-dd')}</span>
          </div>
          {post?.tags && post?.tags?.length > 0 && (
            <div className="flex items-center flex-wrap gap-1 justify-end">
              {post.tags.map(t => (
                <SmartLink
                  key={t}
                  href={`/tag/${t}`}
                  className="hover:text-red-400 transition-all duration-200"
                >
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs">#{t}</span>
                </SmartLink>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
