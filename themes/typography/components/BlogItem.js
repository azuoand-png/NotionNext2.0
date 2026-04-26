import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import SmartLink from '@/components/SmartLink'

export const BlogItem = props => {
  const { post } = props
  const { tagOptions } = useGlobal()

  const coverImage =
    post?.pageCoverThumbnail ||
    post?.pageCover ||
    post?.cover ||
    post?.thumbnail ||
    (post?.blockMap && post?.blockMap?.cover?.length > 0 ? post.blockMap.cover : null)

  const subTitle = post?.summary || ''

  const tagColorMap = {}
  if (tagOptions && Array.isArray(tagOptions)) {
    tagOptions.forEach(tag => {
      tagColorMap[tag.name] = tag.color || 'gray'
    })
  }

  const getTagColorClass = (tagName) => {
    const color = tagColorMap[tagName] || 'gray'
    return `notion-${color}_background`
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      {coverImage && (
        <div className="relative w-full pt-[37.5%] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <SmartLink href={post.href} passHref legacyBehavior>
            <LazyImage
              src={coverImage}
              className="absolute inset-0 w-full h-full object-cover object-center hover:scale-110 duration-500"
              alt={post.title}
            />
          </SmartLink>
        </div>
      )}

      <article className="article-info px-3 pt-3 pb-2">
        <h2 className="mb-1 line-clamp-2">
          <SmartLink
            href={post.href}
            className="inline-block text-xl font-bold text-[var(--primary-color)] dark:text-white hover:underline decoration-2"
          >
            {siteConfig('POST_TITLE_ICON') && (
              <NotionIcon icon={post.pageIcon} className="mr-1 inline" />
            )}
            {post.title}
          </SmartLink>
        </h2>

        {subTitle && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
            {subTitle}
          </div>
        )}

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
                  className={`
                    inline-block px-2 py-0.5 rounded-full text-xs font-medium
                    ${getTagColorClass(t)}
                    transition-all duration-200
                    hover:!bg-[var(--primary-color)] hover:!text-white
                    dark:hover:!text-white
                  `}
                  style={{ display: 'inline-block' }}
                >
                  #{t}
                </SmartLink>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
