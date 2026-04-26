import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useEffect, useRef, useState } from 'react'

const Catalog = ({ post }) => {
  const { locale } = useGlobal()
  const tRef = useRef(null)
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    if (!post || !post?.toc || post?.toc?.length < 1) return

    const throttleMs = 100
    const actionSectionScrollSpy = throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      if (!sections || sections.length === 0) return

      let currentSectionId = null
      // 修复：从最后一个标题往前找，确保最后一项能被高亮
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        const bbox = section.getBoundingClientRect()
        // 如果标题顶部距离视口顶部小于 100px，则认为它是当前活动的
        if (bbox.top - 100 < 0) {
          currentSectionId = section.getAttribute('data-id')
          break
        }
      }
      // 如果没有符合条件的标题（例如页面顶部），则取第一个标题
      if (!currentSectionId && sections.length > 0) {
        currentSectionId = sections[0].getAttribute('data-id')
      }

      if (currentSectionId !== activeSection) {
        setActiveSection(currentSectionId)
        const index = post?.toc?.findIndex(obj => uuidToId(obj.id) === currentSectionId)
        if (index !== -1 && tRef?.current) {
          tRef.current.scrollTo({ top: 28 * index, behavior: 'smooth' })
        }
      }
    }, throttleMs)

    const container = document.querySelector('#container-inner')
    const scrollTarget = container || window
    scrollTarget.addEventListener('scroll', actionSectionScrollSpy)
    actionSectionScrollSpy()

    return () => scrollTarget.removeEventListener('scroll', actionSectionScrollSpy)
  }, [post, activeSection])

  // 修复：点击目录时平滑滚动到对应标题，并计算偏移量，避免被固定标题栏遮挡
  const handleClick = (e, id) => {
    e.preventDefault()
    const targetElement = document.getElementById(id)
    if (targetElement) {
      const offset = 80 // 顶部偏移量（5rem = 80px，根据您的固定标题栏高度调整）
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' })
      setActiveSection(id)
    }
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
            {post?.toc?.map(tocItem => {
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
