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
import { NameCard, MenuCardLeft } from './components/NavBar'
import Script from 'next/script'
import Head from 'next/head'

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
  const router = useRouter()
  const isHomePage = router.pathname === '/'
  const customMenu = props.customMenu || []
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (searchKeyword.trim()) {
        router.push(`/search?keyword=${encodeURIComponent(searchKeyword.trim())}`)
      }
    }
  }

  return (
    <>
      <Head>
        <Script
          src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
          strategy="afterInteractive"
        />
      </Head>
      <ThemeGlobalSimple.Provider value={{ searchModal, currentPost, setCurrentPost }}>
        <div id='theme-typography' className={`${siteConfig('FONT_STYLE')} font-typography min-h-screen bg-white dark:bg-[#232222]`}>
          <Style />
          {siteConfig('SIMPLE_TOP_BAR', null, CONFIG) && <TopBar {...props} />}

          <NameCard />

          {isHomePage && !currentPost && (
            <div className="relative w-full border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90">
              <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                  <div className="flex items-center space-x-4 overflow-x-auto">
                    {customMenu.map((item, idx) => {
                      if (item.show === false) return null
                      const hasSubMenu = item.subMenus && item.subMenus.length > 0
                      if (!hasSubMenu) {
                        return (
                          <SmartLink
                            key={idx}
                            href={item.href || '/'}
                            target={item.target || '_self'}
                            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-current hover:text-white dark:hover:bg-white dark:hover:text-[var(--primary-color)] transition-colors rounded-md"
                          >
                            {item.name || item.title}
                          </SmartLink>
                        )
                      }
                      return (
                        <div key={idx} className="relative group">
                          <div className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-current hover:text-white dark:hover:bg-white dark:hover:text-[var(--primary-color)] transition-colors rounded-md cursor-pointer">
                            {item.name || item.title}
                          </div>
                          <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50">
                            <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 min-w-32">
                              {item.subMenus.map((sub, subIdx) => (
                                <SmartLink
                                  key={subIdx}
                                  href={sub.href}
                                  target={sub.target || '_self'}
                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
                                >
                                  {sub.title || sub.name}
                                </SmartLink>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      placeholder="按Enter键 搜索"
                      className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] w-48 md:w-64"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='max-w-[1400px] mx-auto px-4 md:px-8'>
            <div className='flex flex-col md:flex-row gap-6'>
              {currentPost && (
                <div className='hidden md:block w-64 flex-shrink-0 sticky top-8 self-start'>
                  <Catalog post={currentPost} />
                  <div className='mt-8'>
                    <MenuCardLeft {...props} />
                  </div>
                </div>
              )}

              <div className='flex-1 min-w-0 md:pr-32'>
                {onLoading ? (
                  <div className='flex items-center justify-center min-h-[500px] w-full'>
                    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white' />
                  </div>
                ) : (
                  children
                )}
              </div>
            </div>
          </div>

          <div className='fixed right-4 bottom-16 z-20'>
            <JumpToTopButton />
          </div>
          <AlgoliaSearchModal cRef={searchModal} {...props} />
          <Footer />
        </div>
      </ThemeGlobalSimple.Provider>
    </>
  )
}

// 以下所有导出函数与您原代码完全相同，无任何改动
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
        <div className="mt-10">
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
