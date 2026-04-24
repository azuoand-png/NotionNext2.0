import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

export const BlogItem = props => {
  const { post } = props
  const { NOTION_CONFIG } = useGlobal()
  const showPageCover = siteConfig('TYPOGRAPHY_POST_COVER_ENABLE', false, CONFIG)
  const showPreview =
    siteConfig('POST_LIST_PREVIEW', false, NOTION_CONFIG) && post.blockMap

  return (
    <div key={post.id} className="flex flex-col h-full overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      {/* 图片封面区域（纵向布局，图片在上方） */}
      {showPageCover && (
        <div className="relative w-full pt-[56.25%] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <SmartLink href={post.href} passHref legacyBehavior>
            <LazyImage
              src={post?.pageCoverThumbnail || post?.pageCover}
              className="absolute inset-0 w-full h-full object-cover object-center hover:scale-110 duration-500"
            />
          </SmartLink>
        </div>
      )}

      {/* 内容区域（下方） */}
      <article className="article-info p-4 flex flex-col flex-grow">
        <h2 className="mb-2">
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

        {/* 文章元信息：发布日期、标签 */}
        <header className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-2 mb-3">
          <div className="flex items-center space-x-1">
            <i className="far fa-calendar-alt"></i>
            <span>{formatDateFmt(post?.publishDate || post?.date?.start_date, 'yyyy-MM-dd')}</span>
          </div>
          {post?.tags && post?.tags?.length > 0 && (
            <div className="flex items-center flex-wrap gap-1">
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
        </header>

        {/* 文章摘要 / 预览 */}
        <main className="text-gray-600 dark:text-gray-300 line-clamp-3 overflow-hidden text-ellipsis leading-relaxed text-sm">
          {!showPreview && <>{post.summary}</>}
          {showPreview && post?.blockMap && (
            <div className="line-clamp-3 overflow-hidden">
              <NotionPage post={post} />
            </div>
          )}
        </main>

        {/* 可选：阅读更多链接 */}
        <div className="mt-4">
          <SmartLink
            href={post.href}
            className="text-sm text-[var(--primary-color)] dark:text-white hover:underline inline-flex items-center"
          >
            阅读全文 <i className="fas fa-arrow-right ml-1 text-xs"></i>
          </SmartLink>
        </div>
      </article>
    </div>
  )
}
