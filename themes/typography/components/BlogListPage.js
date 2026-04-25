import { AdSlot } from '@/components/GoogleAdsense'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import CONFIG from '../config'
import { BlogItem } from './BlogItem'

export default function BlogListPage(props) {
  const { page = 1, posts, postCount } = props
  const router = useRouter()
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const currentPage = +page

  const showPrev = currentPage > 1
  const showNext = page < totalPage
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')

  return (
    /* 关键修改：增加针对桌面端的左内边距 pl-64 或 pl-72，避开左侧挂件 */
    <div className='w-full px-4 md:px-4 lg:pl-72 lg:pr-10'>
      
      {/* 这里的 style 是为了暴力覆盖主题可能存在的居中限制 */}
      <style jsx>{`
        :global(#theme-typography main) {
            max-width: 100vw !important;
            display: block !important;
        }
        :global(#article-wrapper) {
            padding-left: 0 !important; /* 防止重复偏移 */
            max-width: 100% !important;
        }
      `}</style>

      <div id='posts-wrapper' className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10'>
        {posts?.map((p, index) => (
          <BlogItem key={p.id} post={p} />
        ))}
      </div>

      <div className='flex justify-between text-xs mt-12 mb-10'>
        <SmartLink
          href={{
            pathname:
              currentPage - 1 === 1
                ? `${pagePrefix}/`
                : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`${showPrev ? 'text-blue-600 border-b border-blue-400 visible ' : ' invisible bg-gray pointer-events-none '} no-underline pb-1 px-3`}>
          <i className='fa-solid fa-arrow-left mr-2'></i> NEWER POSTS
        </SmartLink>
        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`${showNext ? 'text-blue-600 border-b border-blue-400 visible' : ' invisible bg-gray pointer-events-none '} no-underline pb-1 px-3`}>
          OLDER POSTS <i className='fa-solid fa-arrow-right ml-2'></i>
        </SmartLink>
      </div>
    </div>
  )
}
