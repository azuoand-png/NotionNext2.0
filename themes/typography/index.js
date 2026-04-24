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

/**
 * 基础布局（顶部固定导航 + 左右两栏：目录+内容）
 */
const LayoutBase = props => {
  const { children } = props
  const { onLoading } = useGlobal()
  const searchModal = useRef(null)
  const [currentPost, setCurrentPost] = useState(null)

  return (
    <ThemeGlobalSimple.Provider value={{ searchModal, currentPost, setCurrentPost }}>
      <div
        id='theme-typography'
        className={`${siteConfig('FONT_STYLE')} font-typography h-screen flex flex-col dark:text-gray-300 bg-white dark:bg-[#232222] overflow-hidden`}>
        <Style />
        {siteConfig('SIMPLE_TOP_BAR', null, CONFIG) && <TopBar {...props} />}

        {/* 顶部固定导航栏 */}
        <div className='sticky top-0 z-30 bg-white dark:bg-[#232222] border-b border-gray-200 dark:border-gray-700'>
          <NavBar {...props} />
        </div>

        {/* 主内容区域：左右水平布局 */}
        <div className='flex flex-1 overflow-hidden'>
          {/* 左侧目录（仅在文章详情页显示） */}
          {currentPost && (
            <div className='hidden md:block w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto p-4'>
              <Catalog post={currentPost} />
            </div>
          )}

          {/* 右侧主要内容区（滚动） */}
          <div className='flex-1 overflow-y-auto' id='container-inner'>
            {onLoading ? (
              <div className='flex items-center justify-center min-h-[500px] w-full'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white'></div>
              </div>
            ) : (
              <>{children}</>
            )}
            <AdSlot type='native' />
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

// 其余 LayoutIndex, LayoutPostList, LayoutSearch, LayoutArchive, LayoutSlug, Layout404, LayoutCategoryIndex, LayoutTagIndex 保持不变……
// （请从您原来的代码中复制，此处省略重复内容，避免过长）
