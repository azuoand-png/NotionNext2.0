import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'

/**
 * 展示文章推荐 – 卡片网格样式
 */
const RecommendPosts = ({ recommendPosts }) => {
  const { locale } = useGlobal()
  if (!siteConfig('TYPOGRAPHY_ARTICLE_RECOMMEND_POSTS', null, CONFIG) || !recommendPosts || recommendPosts.length < 1) {
    return <></>
  }

  // 获取每篇文章的封面图（优先使用 pageCoverThumbnail，其次 pageCover，否则使用随机占位图）
  const getCoverImage = (post) => {
    return post?.pageCoverThumbnail || post?.pageCover || 'https://source.unsplash.com/random/720x480/?blog'
  }

  return (
    <div className="pt-8 hidden md:block">
      <div className="mb-2 px-1 flex flex-nowrap justify-between">
        <div className="dark:text-gray-300 text-lg font-bold">
          <i className="mr-2 fas fa-thumbs-up"></i>
          {locale.COMMON.RELATE_POSTS || '相关文章'}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {recommendPosts.map(post => (
          <SmartLink
            key={post.id}
            href={`/${post.slug}`}
            title={post.title}
            className="flex h-40 cursor-pointer overflow-hidden rounded-2xl"
          >
            <div className="h-full w-full relative group">
              <div className="flex items-center justify-center w-full h-full duration-300 z-10 relative">
                <div className="text-lg px-4 font-bold text-white text-center shadow-text select-none">
                  {post.title}
                </div>
              </div>
              <LazyImage
                src={getCoverImage(post)}
                alt={post.title}
                className="absolute top-0 w-full h-full object-cover object-center group-hover:scale-110 group-hover:brightness-50 transform duration-200"
              />
              <div className="h-3/4 w-full absolute left-0 bottom-0">
                <div className="h-full w-full absolute opacity-80 group-hover:opacity-100 transition-all duration-1000 bg-gradient-to-b from-transparent to-black"></div>
              </div>
            </div>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

export default RecommendPosts
