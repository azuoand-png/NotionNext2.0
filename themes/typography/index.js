import { AdSlot } from '@/components/GoogleAdsense'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import BlogPostBar from './components/BlogPostBar'
import CONFIG from './config'
import { Style } from './style'
import Catalog from './components/Catalog'
import { MenuList } from './components/MenuList'
import SocialButton from './components/SocialButton'

const AlgoliaSearchModal = dynamic(() => import('@/components/AlgoliaSearchModal'), { ssr: false })

const BlogArchiveItem = dynamic(() => import('./components/BlogArchiveItem'), { ssr: false })
const ArticleLock = dynamic(() => import('./components/ArticleLock'), { ssr: false })
const ArticleInfo = dynamic(() => import('./components/ArticleInfo'), { ssr: false })
const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })
const ArticleAround = dynamic(() => import('./components/ArticleAround'), { ssr: false })
const TopBar = dynamic(() => import('./components/TopBar'), { ssr: false })
const JumpToTopButton = dynamic(() => import('./components/JumpToTopButton'), { ssr: false })
const Footer = dynamic(() => import('./components/Footer'), { ssr: false })
const WWAds = dynamic(() => import('@/components/WWAds'), { ssr: false })
const BlogListPage = dynamic(() => import('./components/BlogListPage'), { ssr: false })
const RecommendPosts = dynamic(() => import('./components/RecommendPosts'), { ssr: false })

const ThemeGlobalSimple = createContext()
export const useSimpleGlobal = () => useContext(ThemeGlobalSimple)

const LayoutBase = props => {
  const { children } = props
  const { onLoading } = useGlobal()
  const searchModal = useRef(null)
  const [currentPost, setCurrentPost] = useState(null)
  const siteInfo = props.siteInfo || {}

  return (
    <ThemeGlobalSimple.Provider value={{ searchModal, currentPost, setCurrentPost }}>
      <div id='theme-typography' className={`${siteConfig('FONT_STYLE')} font-typography min-h-screen bg-white dark:bg-[#232222]`}>
        <Style />
        {siteConfig('SIMPLE_TOP_BAR', null, CONFIG) && <TopBar {...props} />}

        <div className='max-w-[1400px] mx-auto px-4 md:px-8 py-6'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            {/* 左侧区域：文章页时显示目录和左侧菜单 */}
            {currentPost && (
              <div className='hidden md:block md:col-span-1 sticky top-8 self-start'>
                <Catalog post={currentPost} />
                <div className='mt-6'>
                  <div className="w-full">
                    <nav className="md:pt-4 z-20 flex-shrink-0 w-full">
                      <div id="nav-bar-inner" className="text-sm md:text-md text-left">
                        <MenuList {...props} />
                      </div>
                      <div className="mt-4 flex justify-start">
                        <SocialButton />
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            )}

            {/* 主内容区：文章页占2列，首页占3列 */}
            <main className={`${currentPost ? 'md:col-span-2' : 'md:col-span-3'} min-w-0`}>
              {onLoading ? (
                <div className='flex items-center justify-center min-h-[500px] w-full'>
                  <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white'></div>
                </div>
              ) : (
                children
              )}
            </main>

            {/* 右侧边栏：独立卡片（个人牌 + 菜单牌），永不重叠 */}
            <aside className='hidden md:block md:col-span-1 space-y-6'>
              {/* 个人牌卡片 */}
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-100 dark:border-gray-700 text-center'>
                <div className='text-3xl font-bold text-gray-800 dark:text-white mb-1'>
                  {siteConfig('TYPOGRAPHY_BLOG_NAME') || '磕学英语'}
                </div>
                <div className='text-lg font-medium text-gray-500 dark:text-gray-300 mb-3'>
                  {siteConfig('TYPOGRAPHY_BLOG_NAME_EN') || '抱鸭将军'}
                </div>
                <div className='text-sm text-gray-400 dark:text-gray-500 border-t pt-3 mt-2'>
                  {siteInfo?.description || '一个 NotionNext 搭建的博客'}
                </div>
              </div>

              {/* 菜单牌卡片（右侧菜单） */}
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-100 dark:border-gray-700'>
                <h3 className='text-lg font-bold mb-3'>📋 导航菜单</h3>
                <nav className='w-full'>
                  <div className='text-sm md:text-md'>
                    <MenuList {...props} />
                  </div>
                  <div className='mt-4'>
                    <SocialButton />
                  </div>
                </nav>
              </div>
            </aside>
          </div>
        </div>

        <div className='fixed right-4 bottom-4 z-20'>
          <JumpToTopButton />
        </div>
        <AlgoliaSearchModal cRef={searchModal} {...props} />
        <Footer />
      </div>
    </ThemeGlobalSimple.Provider>
  )
}

// 以下函数（LayoutIndex, LayoutPostList, LayoutSearch, groupArticlesByYearArray, LayoutArchive, LayoutSlug, Layout404, LayoutCategoryIndex, LayoutTagIndex）与您原代码完全相同，只保留 LayoutSlug 中的 mt-20 等
// 为节省篇幅，此处省略（您可保留原有实现）。但为了保证完整性，下面列出保持不变的部分。

const LayoutIndex = props => <LayoutPostList {...props} />
const LayoutPostList = props => (
  <>
    <BlogPostBar {...props} />
    <BlogListPage {...props} />
  </>
)

const LayoutSearch = props => {
  const { keyword } = props
  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: { element: 'span', className: 'text-red-500 border-b border-dashed' }
      })
    }
  }, [keyword])
  return <LayoutPostList {...props} />
}

function groupArticlesByYearArray(articles) {
  const grouped = {}
  for (const article of articles) {
    const year = new Date(article.publishDate).getFullYear().toString()
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(article)
  }
  for (const year in grouped) grouped[year].sort((a, b) => b.publishDate - a.publishDate)
  return Object.entries(grouped).sort(([a], [b]) => b - a).map(([year, posts]) => ({ year, posts }))
}

const LayoutArchive = props => {
  const { posts } = props
  const sortPosts = groupArticlesByYearArray(posts)
  return (
    <div className='mb-10 pb-20 md:pb-12 p-5 min-h-screen w-full'>
      {sortPosts.map(p => <BlogArchiveItem key={p.year} archiveTitle={p.year} archivePosts={p.posts} />)}
    </div>
  )
}

const LayoutSlug = props => {
  const { post, lock, validPassword, prev, next, recommendPosts } = props
  const { fullWidth } = useGlobal()
  const { setCurrentPost } = useSimpleGlobal()

  useEffect(() => {
    if (post) setCurrentPost(post)
    return () => setCurrentPost(null)
  }, [post, setCurrentPost])

  return (
    <>
      {lock && <ArticleLock validPassword={validPassword} />}
      {!lock && post && (
        <div className="mt-20">
          <ArticleInfo post={post} />
          <WWAds orientation='horizontal' className='w-full' />
          <div id='article-wrapper'>
            <NotionPage post={post} />
          </div>
          <AdSlot type='in-article' />
          {post?.type === 'Post' && (
            <>
              <ArticleAround prev={prev} next={next} />
              <RecommendPosts recommendPosts={recommendPosts} />
            </>
          )}
          <Comment frontMatter={post} />
        </div>
      )}
    </>
  )
}

const Layout404 = props => {
  const { post } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector('#article-wrapper #notion-article')
          if (!article) router.push('/404').then(() => console.warn('找不到页面', router.asPath))
        }
      }, waiting404)
    }
  }, [post])
  return <>404 Not found.</>
}

const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  return (
    <div id='category-list' className='px-5 duration-200 flex flex-wrap'>
      {categoryOptions?.map(category => (
        <SmartLink key={category.name} href={`/category/${category.name}`} passHref legacyBehavior>
          <div className='hover:text-black dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600 px-5 cursor-pointer py-2 hover:bg-gray-100'>
            <i className='mr-4 fas fa-folder' /> {category.name}({category.count})
          </div>
        </SmartLink>
      ))}
    </div>
  )
}

const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <div id='tags-list' className='px-5 duration-200 flex flex-wrap'>
      {tagOptions.map(tag => (
        <div key={tag.name} className='p-2'>
          <SmartLink
            href={`/tag/${encodeURIComponent(tag.name)}`}
            className={`cursor-pointer inline-block rounded hover:bg-gray-500 hover:text-white duration-200 mr-2 py-1 px-2 text-xs whitespace-nowrap dark:hover:text-white text-gray-600 hover:shadow-xl dark:border-gray-400 notion-${tag.color}_background dark:bg-gray-800`}>
            <div className='font-light dark:text-gray-400'>
              <i className='mr-1 fas fa-tag' /> {tag.name + (tag.count ? `(${tag.count})` : '')}
            </div>
          </SmartLink>
        </div>
      ))}
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
