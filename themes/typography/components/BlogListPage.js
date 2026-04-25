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
    <div className='w-full'>
      {/* 使用 global 样式，一套代码同时修复首页和文章页 */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          /* 1. 彻底打破“居中”和“Flex挤压”限制 */
          #theme-typography .flex-1.mx-auto,
          #article-wrapper,
          #notion-article {
            max-width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            display: block !important;
          }

          /* 2. 消除你截图中的“绿色截断区”(Padding Right) */
          /* 同时通过 Padding Left 为左侧固定的目录留出 280px 的绝对空间 */
          #theme-typography .flex.flex-col.md\:flex-row > .flex-1.mx-auto {
            padding-right: 0 !important;
            padding-left: 280px !important; 
            width: auto !important;
          }

          /* 3. 让文章正文（Table所在区域）横向拉伸，紧贴右侧信息栏 */
          /* 520px = 左侧目录(280px) + 右侧信息栏宽度(约240px) */
          #notion-article {
            width: calc(100vw - 520px) !important;
            min-width: 800px; /* 保证剧本表格不会无限缩小 */
          }

          /* 4. 移除 Notion 渲染插件自带的内边距限制 */
          .notion-viewport, .notion-page {
            padding-left: 0 !important;
            padding-right: 20px !important;
            max-width: 100% !important;
          }

          /* 5. 确保首页列表在拉宽后依然保持网格排列 */
          #posts-wrapper {
            display: grid !important;
            width: 100% !important;
          }
        }
      `}</style>

      {/* 首页内容区域 */}
      <div id='posts-wrapper' className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10'>
        {posts?.map((p, index) => (
          <BlogItem key={p.id} post={p} />
        ))}
      </div>

      {/* 分页按钮 */}
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
