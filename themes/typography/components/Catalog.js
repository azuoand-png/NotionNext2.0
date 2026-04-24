import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useRef, useState } from 'react'

const Catalog = ({ post }) => {
  const { locale } = useGlobal()
  const tRef = useRef(null)
  const [activeSection, setActiveSection] = useState(null)

  // 获取文章目录（从 post.toc）
  const toc = post?.toc || []

  // 预存所有标题的 id 数组，用于滚动目录列表
  const tocIdsRef = useRef([])

  const actionSectionScrollSpy = useCallback(
    throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      if (!sections || sections.length === 0) return

      let currentSectionId = null
      let prevBBox = null

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue

        const bbox = section.getBoundingClientRect()
        // 计算与上一个标题的间距，用于动态偏移量
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
        // 动态偏移：至少 100px，如果标题间距很大则适当增加
        const offset = Math.max(100, prevHeight / 3)

        // 如果标题顶部减去偏移量后还在视口上方或正好在视口内，则认为是当前激活的标题
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
          prevBBox = bbox
          continue
        }
        // 遇到第一个不满足条件的标题就停止循环
        break
      }

      // 如果没有找到任何激活的标题，回退到第一个
      if (!currentSectionId && sections.length > 0) {
        currentSectionId = sections[0].getAttribute('data-id')
      }

      if (currentSectionId !== activeSection) {
        setActiveSection(currentSectionId)
        // 滚动目录列表，使当前激活项可见
        const index = tocIdsRef.current.indexOf(currentSectionId)
        if (index !== -1 && tRef.current) {
          tRef.current.scrollTo({ top: 28 * index, behavior: 'smooth' })
        }
      }
    }, 100),
    [activeSection, toc]
  )

  useEffect(() => {
    if (!toc || toc.length === 0) return

    // 预存所有目录项对应的 id（只在 toc 变化时更新）
    tocIdsRef.current = toc.map(item => uuidToId(item.id))

    // 获取真正的滚动容器（您的布局中文章滚动的是 #container-inner）
    const scrollContainer = document.querySelector('#container-inner')
    if (!scrollContainer) return

    scrollContainer.addEventListener('scroll', actionSectionScrollSpy)
    // 初始执行一次，确保正确高亮
    actionSectionScrollSpy()

    return () => {
      scrollContainer.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [toc, actionSectionScrollSpy])

  // 无目录时不渲染
  if (!toc || toc.length === 0) return null

  return (
    <div className='px-2'>
      <div className='dark:text-white mb-2 text-sm font-semibold flex items-center'>
        <i className='mr-1 fas fa-stream' />
        {locale.COMMON.TABLE_OF_CONTENTS || '目录'}
      </div>
      <div
        className='overflow-y-auto max-h-[calc(100vh-300px)] scroll-hidden'
        ref={tRef}
      >
        <nav className='text-sm space-y-1'>
          {toc.map(tocItem => {
            const id = uuidToId(tocItem.id)
            const isActive = activeSection === id
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`
                  block border-l-2 pl-3 py-1 transition-all duration-200 no-underline
                  ${isActive
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-semibold'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }
                `}
                style={{ marginLeft: (tocItem.indentLevel || 0) * 12 }}
              >
                <span className='truncate inline-block max-w-full align-middle'>
                  {tocItem.text}
                </span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Catalog
