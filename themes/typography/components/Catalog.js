import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useEffect, useRef, useState } from 'react'

const Catalog = ({ post }) => {
  const { locale } = useGlobal()
  const tRef = useRef(null)
  const [activeSection, setActiveSection] = useState(null)
  const [readProgress, setReadProgress] = useState(0)
  const isManualScrolling = useRef(false)
  const manualScrollTimer = useRef(null)

  const updateProgress = () => {
    const articleWrapper = document.getElementById('article-wrapper')
    if (!articleWrapper) return
    const articleHeight = articleWrapper.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    if (articleHeight <= 0) {
      setReadProgress(0)
      return
    }
    let progress = (scrolled / articleHeight) * 100
    progress = Math.min(100, Math.max(0, progress))
    setReadProgress(Math.floor(progress))
  }

  useEffect(() => {
    if (!post || !post?.toc || post?.toc?.length < 1) return

    const OFFSET = 80
    const THROTTLE_MS = 100

    let retryCount = 0
    const maxRetry = 5
    let scrollTarget = null
    let throttledUpdate = null

    const init = () => {
      // 等待文章正文标题元素出现
      const sections = document.getElementsByClassName('notion-h')
      if (sections.length === 0 && retryCount < maxRetry) {
        retryCount++
        setTimeout(init, 200)
        return
      }

      const updateActiveSection = () => {
        if (isManualScrolling.current) return

        const sectionsNow = document.getElementsByClassName('notion-h')
        if (!sectionsNow.length) return

        let bestMatchId = null
        let bestDistance = Infinity

        for (let i = 0; i < sectionsNow.length; i++) {
          const section = sectionsNow[i]
          const rect = section.getBoundingClientRect()
          const distance = rect.top - OFFSET
          if (distance <= 0 && Math.abs(distance) < bestDistance) {
            bestDistance = Math.abs(distance)
            bestMatchId = section.getAttribute('data-id')
          }
        }

        if (!bestMatchId && sectionsNow.length > 0) {
          bestMatchId = sectionsNow[0].getAttribute('data-id')
        }

        if (bestMatchId && bestMatchId !== activeSection) {
          setActiveSection(bestMatchId)
          const index = post.toc.findIndex(obj => uuidToId(obj.id) === bestMatchId)
          if (index !== -1 && tRef.current) {
            tRef.current.scrollTo({ top: index * 28, behavior: 'smooth' })
          }
        }
      }

      throttledUpdate = throttle(() => {
        updateActiveSection()
        updateProgress()
      }, THROTTLE_MS)

      const container = document.querySelector('#container-inner')
      scrollTarget = container || window
      scrollTarget.addEventListener('scroll', throttledUpdate)
      updateActiveSection()
      updateProgress()
    }

    init()

    return () => {
      if (scrollTarget && throttledUpdate) {
        scrollTarget.removeEventListener('scroll', throttledUpdate)
      }
      if (manualScrollTimer.current) clearTimeout(manualScrollTimer.current)
    }
  }, [post, activeSection])

  const handleClick = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    isManualScrolling.current = true
    if (manualScrollTimer.current) clearTimeout(manualScrollTimer.current)

    const OFFSET = 80
    const elementPosition = target.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: elementPosition - OFFSET, behavior: 'smooth' })

    setActiveSection(id)

    manualScrollTimer.current = setTimeout(() => {
      isManualScrolling.current = false
      window.dispatchEvent(new Event('scroll'))
    }, 500)
  }

  if (!post || !post?.toc || post?.toc?.length < 1) return null

  return (
    <div className="sticky top-6 z-10 w-full">
      <div className="bg-white/90 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-3">
        <div className="dark:text-white mb-2 text-sm font-bold flex items-center">
          <i className="mr-1 fas fa-stream" /> 目录
        </div>

        {/* 阅读进度条 */}
        <div className="w-full py-2">
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 dark:bg-amber-400 transition-all duration-200 rounded-full"
              style={{ width: `${readProgress}%` }}
            ></div>
          </div>
          {readProgress > 0 && (
            <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
              {readProgress}%
            </div>
          )}
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-200px)] scroll-hidden" ref={tRef}>
          <nav className="text-sm">
            {post.toc.map(tocItem => {
              const id = uuidToId(tocItem.id)
              const isActive = activeSection === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className={`block border-l-2 pl-3 py-1 transition-all duration-200 no-underline leading-[21px] ${
                    isActive
                      ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-semibold bg-amber-50/30 dark:bg-amber-900/20'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:border-gray-300 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                  style={{ paddingLeft: (tocItem.indentLevel || 0) * 12 + 12 }}
                >
                  <span className="truncate inline-block max-w-full align-middle">{tocItem.text}</span>
                </a>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Catalog
