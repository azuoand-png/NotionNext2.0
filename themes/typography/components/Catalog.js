import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useEffect, useRef, useState } from 'react'

const Catalog = ({ post }) => {
  const { locale } = useGlobal()
  const tRef = useRef(null)
  const [activeSection, setActiveSection] = useState(null)
  const isManualScrolling = useRef(false)
  const manualScrollTimer = useRef(null)

  useEffect(() => {
    if (!post || !post?.toc || post?.toc?.length < 1) return

    const OFFSET = 80 // 固定标题栏高度，根据你的 sticky top-20 调整
    const THROTTLE_MS = 100

    const updateActiveSection = () => {
      if (isManualScrolling.current) return

      const sections = document.getElementsByClassName('notion-h')
      if (!sections.length) return

      let bestMatchId = null
      let bestDistance = Infinity

      // 遍历所有标题，找到距离视口顶部最近且位于偏移线上方的标题
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const rect = section.getBoundingClientRect()
        const distance = rect.top - OFFSET
        // 如果标题顶部已经滚动到偏移线之上（distance <= 0），并且距离线更近
        if (distance <= 0 && Math.abs(distance) < bestDistance) {
          bestDistance = Math.abs(distance)
          bestMatchId = section.getAttribute('data-id')
        }
      }

      // 如果没有找到合适的（例如页面开头），取第一个标题
      if (!bestMatchId && sections.length > 0) {
        bestMatchId = sections[0].getAttribute('data-id')
      }

      if (bestMatchId && bestMatchId !== activeSection) {
        setActiveSection(bestMatchId)
        // 同步滚动目录菜单
        const index = post.toc.findIndex(obj => uuidToId(obj.id) === bestMatchId)
        if (index !== -1 && tRef.current) {
          tRef.current.scrollTo({ top: index * 28, behavior: 'smooth' })
        }
      }
    }

    const throttledUpdate = throttle(updateActiveSection, THROTTLE_MS)
    const container = document.querySelector('#container-inner')
    const scrollTarget = container || window
    scrollTarget.addEventListener('scroll', throttledUpdate)
    // 初始调用
    updateActiveSection()

    return () => {
      scrollTarget.removeEventListener('scroll', throttledUpdate)
      if (manualScrollTimer.current) clearTimeout(manualScrollTimer.current)
    }
  }, [post, activeSection])

  const handleClick = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    // 开始手动滚动，禁止监听器覆盖高亮
    isManualScrolling.current = true
    if (manualScrollTimer.current) clearTimeout(manualScrollTimer.current)

    const OFFSET = 80
    const elementPosition = target.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: elementPosition - OFFSET, behavior: 'smooth' })

    // 立即设置高亮为当前点击项
    setActiveSection(id)

    // 滚动结束后恢复监听（假设动画500ms）
    manualScrollTimer.current = setTimeout(() => {
      isManualScrolling.current = false
      // 手动触发一次更新，确保最终高亮正确
      window.dispatchEvent(new Event('scroll'))
    }, 500)
  }

  if (!post || !post?.toc || post?.toc?.length < 1) return null

  return (
    <div className="sticky top-6 z-10 w-full">
      <div className="bg-white/90 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-3">
        <div className="dark:text-white mb-2 text-sm font-bold flex items-center">
          <i className="mr-1 fas fa-stream" /> {locale.COMMON.TABLE_OF_CONTENTS || '目录'}
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-200px)] scroll-hidden" ref={tRef}>
          <nav className="text-sm space-y-1">
            {post.toc.map(tocItem => {
              const id = uuidToId(tocItem.id)
              const isActive = activeSection === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className={`block border-l-2 pl-3 py-1.5 transition-all duration-200 no-underline ${
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
