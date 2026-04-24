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

// 主题组件
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

        {/* 外层容器：左右内边距从 md:px-8 改为 md:px-4，内容区更宽 */}
        <div className='flex flex-1 mx-auto overflow-hidden py-8 md:p-0 md:max-w-7xl md:px-4 w-screen'>
          <div className='overflow-hidden md:mt-8 flex-1'>
            {/* 内容区容器：左右内边距从 md:px-2 改为 md:px-0（完全贴边） */}
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

          {/* 右侧边栏：顶部距离 top-12（已上移），内部 mt-10 高度减半 */}
          <div className='hidden md:flex md:flex-col md:flex-shrink-0 md:h-[100vh] sticky top-12'>
            <div className='flex flex-col justify-between md:mt-10 md:h-[70vh]'>
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

// 以下所有函数（LayoutIndex, LayoutPostList, LayoutSearch, groupArticlesByYearArray,
// LayoutArchive, LayoutSlug, Layout404, LayoutCategoryIndex, LayoutTagIndex 以及导出）
// 与您原有的完全一致，这里不再重复，请保留您原来的内容。

// 注意：请确保您原有的那些函数（从 LayoutIndex 到 export 部分）保持不变，
// 只需替换上面的 LayoutBase 即可。
