import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 展示文章推荐 – 样式优化版
 */
const RecommendPosts = ({ recommendPosts }) => {
  const { locale } = useGlobal()
  if (!siteConfig('TYPOGRAPHY_ARTICLE_RECOMMEND_POSTS', null, CONFIG) || !recommendPosts || recommendPosts.length < 1) {
    return <></>
  }

  return (
    <div className="mt-8 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="mb-3 font-bold text-lg flex items-center gap-2 text-gray-800 dark:text-gray-200">
        <span className="inline-block w-1 h-5 bg-[var(--primary-color)] rounded-full"></span>
        {locale.COMMON.RELATE_POSTS}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        {recommendPosts.map(post => (
          <div key={post.id} className="py-1">
            <SmartLink
              href={`/${post.slug}`}
              className="group flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--primary-color)] dark:hover:text-[var(--primary-color)] transition-colors duration-200"
            >
              <span className="inline-block w-1 h-1 rounded-full bg-gray-400 group-hover:bg-[var(--primary-color)] transition-all"></span>
              <span className="line-clamp-1">{post.title}</span>
            </SmartLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendPosts
