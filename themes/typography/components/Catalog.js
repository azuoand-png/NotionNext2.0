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

      let currentActiveId = null
      // 获取滚动容器的滚动位置
      const container = document.querySelector('#container-inner')
      const scrollTop = container ? container.scrollTop : window.scrollY

      // 遍历所有标题，找到当前滚动位置所在的标题
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        
        const rect = section.getBoundingClientRect()
        const containerRect = container ? container.getBoundingClientRect() : null
        // 相对于滚动容器的顶部偏移
        const offsetTop = containerRect ? rect.top - containerRect.top : rect.top
        
        // 设置一个较小的阈值（比如 80px），用于判断标题是否已进入可视区顶部附近
        const threshold = 80
        if (offsetTop <= threshold) {
          currentActiveId = section.getAttribute('data-id')
        } else {
          // 一旦发现标题还在阈值以下，停止循环（因为后续标题更远）
          break
        }
      }

      // 如果没找到，且至少有一个标题，则默认激活第一个
      if (!currentActiveId && sections.length > 0) {
        currentActiveId = sections[0].getAttribute('data-id')
      }

      if (currentActiveId !== activeSection) {
        setActiveSection(currentActiveId)
        // 同步滚动目录列表到当前激活项
        const index = post?.toc?.findIndex(obj => uuidToId(obj.id) === currentActiveId)
        if (index !== -1 && tRef?.current) {
          tRef.current.scrollTo({ top: 28 * index, behavior: 'smooth' })
        }
      }
    }, throttleMs)

    const content = document.querySelector('#container-inner')
    if (!content) return

    content.addEventListener('scroll', actionSectionScrollSpy)
    // 初始化执行一次，确保正确高亮
    setTimeout(() => actionSectionScrollSpy(), 300)

    return () => {
      content.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [post, activeSection])

  if (!post || !post?.toc || post?.toc?.length < 1) return null

  return (
    <div className='px-2'>
      <div className='dark:text-white mb-2 text-sm font-semibold flex items-center'>
        <i className='mr-1 fas fa-stream' /> {locale.COMMON.TABLE_OF_CONTENTS || '目录'}
      </div>
      <div className='overflow-y-auto max-h-[calc(100vh-300px)] scroll-hidden' ref={tRef}>
        <nav className='text-sm space-y-1'>
          {post?.toc?.map(tocItem => {
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
