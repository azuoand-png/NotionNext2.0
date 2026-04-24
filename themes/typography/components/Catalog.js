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
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        const bbox = section.getBoundingClientRect()
        const offset = 100
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
        } else {
          break
        }
      }
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

    const content = document.querySelector('#container-inner')
    if (!content) return
    content.addEventListener('scroll', actionSectionScrollSpy)
    setTimeout(() => actionSectionScrollSpy(), 300)
    return () => content?.removeEventListener('scroll', actionSectionScrollSpy)
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
