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

// 首页左侧个人牌（样式与原始 NameCard 完全一致）
const LeftNameCard = () => {
  const blogName = siteConfig('TYPOGRAPHY_BLOG_NAME', null, CONFIG) || '磕学英语'
  const blogNameEn = siteConfig('TYPOGRAPHY_BLOG_NAME_EN', null, CONFIG) || '抱鸭将军'
  return (
    <div className="w-full mb-6">
      <header className="w-fit self-start md:pb-8 md:border-l-2 dark:md:border-white dark:text-white md:border-[var(--primary-color)] text-[var(--primary-color)] md:[writing-mode:vertical-lr] px-4 hover:bg-[var(--primary-color)] dark:hover:bg-white hover:text-white dark:hover:text-[var(--primary-color)] ease-in-out duration-700 md:hover:pt-4 md:hover:pb-4">
        <SmartLink href='/'>
          <div className="flex flex-col items-start">
            <div className="font-bold text-4xl text-center" id="blog-name">{blogName}</div>
            <div className="font-bold text-xl text-center" id="blog-name-en">{blogNameEn}</div>
          </div>
        </SmartLink>
      </header>
    </div>
  )
}

const LayoutBase = props => {
  const { children } = props
  const { onLoading } = useGlobal()
  const searchModal = useRef(null)
  const [currentPost, setCurrentPost] = useState(null)
  const router = useRouter()
  const isHomePage = router.pathname === '/'

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

          {/* 文章页和 Page 页显示右上角固定个人牌，首页不显示 */}
          {!isHomePage && <NameCard />}

          <div className='max-w-[1400px] mx-auto px-4 md:px-8'>
            <div className='flex flex-col md:flex-row gap-6'>
              {/* 左侧边栏：首页宽度 w-48，文章页保持 w-64？用户要求首页削减，文章页不变，但左侧边栏在文章页也是同样结构，为了不影响文章页布局，我们需要分别设置 */}
              <div className={`hidden md:block flex-shrink-0 sticky top-8 self-start ${isHomePage ? 'w-48' : 'w-64'}`}>
                {currentPost ? (
                  <>
                    <Catalog post={currentPost} />
                    <div className='mt-8'>
                      <MenuCardLeft {...props} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className='mt-28'>
                      <LeftNameCard />
                    </div>
                    <div className='mt-16'>
                      <MenuCardLeft {...props} />
                    </div>
                  </>
                )}
              </div>

              {/* 右侧主内容区：首页添加 md:pr-16（4rem），文章页不加右边距 */}
              <div className={`flex-1 min-w-0 ${isHomePage ? 'md:pr-16' : ''}`}>
                <div className={`${isHomePage ? 'mt-24' : ''}`}>
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

// 以下所有导出函数与您的原代码完全相同，无任何改动
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
