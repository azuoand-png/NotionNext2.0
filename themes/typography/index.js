import { AdSlot } from '@/components/GoogleAdsense'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef } from 'react'
import BlogPostBar from './components/BlogPostBar'
import CONFIG from './config'
import { Style } from './style'
import Catalog from './components/Catalog'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

const BlogArchiveItem = dynamic(() => import('./components/BlogArchiveItem'), { ssr: false })
const ArticleLock = dynamic(() => import('./components/ArticleLock'), { ssr: false })
const ArticleInfo = dynamic(() => import('./components/ArticleInfo'), { ssr: false })
const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })
const ArticleAround = dynamic(() => import('./components/ArticleAround'), { ssr: false })
const TopBar = dynamic(() => import('./components/TopBar'), { ssr: false })
const NavBar = dynamic(() => import('./components/NavBar'), { ssr: false })
const JumpToTopButton = dynamic(() => import('./components/JumpToTopButton'), { ssr: false })
const Footer = dynamic(() => import('./components/Footer'), { ssr: false })
const WWAds = dynamic(() => import('@/components/WWAds'), { ssr: false })
const BlogListPage = dynamic(() => import('./components/BlogListPage'), { ssr: false })
const RecommendPosts = dynamic(() => import('./components/RecommendPosts'), { ssr: false })

const ThemeGlobalSimple = createContext()
export const useSimpleGlobal = () => useContext(ThemeGlobalSimple)

// 1. 恢复基础布局，不添加全局干扰样式
const LayoutBase = props => {
  const { children } = props
  const { onLoading } = useGlobal()
  const searchModal = useRef(null)

  return (
    <ThemeGlobalSimple.Provider value={{ searchModal }}>
      <div
        id='theme-typography'
        className={`${siteConfig('FONT_STYLE')} font-typography h-screen flex flex-col dark:text-gray-300 bg-white dark:bg-[#232222] overflow-hidden`}>
        <Style />
        {siteConfig('SIMPLE_TOP_BAR', null, CONFIG) && <TopBar {...props} />}

        <div className='flex flex-1 mx-auto overflow-hidden py-8 md:p-0 md:max-w-7xl w-screen'>
          <div className='overflow-hidden md:mt-8 flex-1'>
            <div
              id='container-inner'
              className='h-full w-full md:px-0 overflow-y-auto scroll-hidden relative'>
              <div className='md:hidden'>
                <NavBar {...props} />
              </div>
              {onLoading ? (
                <div className='flex items-center justify-center min-h-[500px] w-full'>
                  <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white'></div>
                </div>
              ) : (
                <>{children}</>
              )}
              <AdSlot type='native' />
              <div className='md:hidden z-30'>
                <Footer {...props} />
              </div>
            </div>
          </div>

          <div className='hidden md:flex md:flex-col md:flex-shrink-0 md:h-[100vh] sticky top-0'>
            <div className='flex flex-col justify-between md:mt-0 md:h-[70vh] w-64'>
              <NavBar {...props} />
            </div>
            <Footer {...props} />
          </div>
        </div>

        <div className='fixed right-4 bottom-4 z-20'>
          <JumpToTopButton />
        </div>
        <AlgoliaSearchModal cRef={searchModal} {...props} />
      </div>
    </ThemeGlobalSimple.Provider>
  )
}

const LayoutIndex = props => <LayoutPostList {...props} />
const LayoutPostList = props => (
  <>
    <BlogPostBar {...props} />
    <BlogListPage {...props} />
  </>
)

// 2. 精准修改 LayoutSlug：这是调整正文宽度最安全的地方
const LayoutSlug = props => {
  const { post, lock, validPassword, prev, next, recommendPosts } = props
  const { fullWidth } = useGlobal()
  
  return (
    <>
      {lock && <ArticleLock validPassword={validPassword} />}
      {!lock && post && (
        /* 这里把原来的 px-5 去掉一部分，改为 md:pl-2，减少左边绿色间隔 */
        <div className='flex flex-col md:flex-row pt-3 pr-5'>
          
          {/* 目录：固定 280px 宽度 */}
          <div className='hidden md:block md:w-[280px] flex-shrink-0'>
            <Catalog post={post} />
          </div>

          {/* 正文区域：使用 flex-grow 让它占满剩下的所有空间 */}
          <div className='flex-grow min-w-0 md:ml-4'> 
            <ArticleInfo post={post} />
            <WWAds orientation='horizontal' className='w-full' />
            
            {/* 这个容器必须是 w-full，内部的 notion-article 也要被强制拉宽 */}
            <div id='article-wrapper' className='w-full overflow-visible'>
               <NotionPage post={post} />
               
               {/* 局部补丁：只在这里强制 notion 居中容器失效 */}
               <style jsx>{`
                 :global(#notion-article) {
                    max-width: 100% !important;
                    width: 100% !important;
                    margin: 0 !important;
                 }
                 :global(.notion-page) {
                    width: 100% !important;
                    max-width: 100% !important;
                    padding-left: 0 !important;
                 }
               `}</style>
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
        </div>
      )}
    </>
  )
}

// 其余配置代码保持不变...
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
  for (const year in grouped) {
    grouped[year].sort((a, b) => b.publishDate - a.publishDate)
  }
  return Object.entries(grouped)
    .sort(([a], [b]) => b - a)
    .map(([year, posts]) => ({ year, posts }))
}

const LayoutArchive = props => {
  const { posts } = props
  const sortPosts = groupArticlesByYearArray(posts)
  return (
    <div className='mb-10 pb-20 md:pb-12 p-5 min-h-screen w-full'>
      {sortPosts.map(p => (
        <BlogArchiveItem key={p.year} archiveTitle={p.year} archivePosts={p.posts} />
      ))}
    </div>
  )
}

const Layout404 = props => {
  const { post } = props
  const router = useRouter()
  useEffect(() => {
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector('#article-wrapper #notion-article')
          if (!article) router.push('/404')
        }
      }, 3000)
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
          <div className='hover:text-black dark:hover:text-white px-5 cursor-pointer py-2 hover:bg-gray-100 uppercase text-sm font-bold'>
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
          <SmartLink href={`/tag/${encodeURIComponent(tag.name)}`} className='cursor-pointer inline-block rounded hover:bg-gray-500 hover:text-white duration-200 mr-2 py-1 px-2 text-xs border text-gray-600 uppercase font-medium'>
            <i className='mr-1 fas fa-tag' /> {tag.name}
          </SmartLink>
        </div>
      ))}
    </div>
  )
}

export {
  Layout404, LayoutArchive, LayoutBase, LayoutCategoryIndex, LayoutIndex, LayoutPostList, LayoutSearch, LayoutSlug, LayoutTagIndex, CONFIG as THEME_CONFIG
}
