import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const MenuItemDrop = ({ link, menuAlign = 'left' }) => {
  const hasSubMenu = link?.subMenus?.length > 0
  const [show, changeShow] = useState(false)
  const router = useRouter()

  if (!link || !link.show) {
    return null
  }
  const selected = router.pathname === link.href || router.asPath === link.href

  // 根据对齐方向确定子菜单的定位和间距
  // 左对齐菜单（左侧边栏）：子菜单向右展开，使用 left-full 并添加 ml-1 拉近间距
  // 右对齐菜单（右侧边栏）：子菜单向左展开，使用 right-full 并添加 mr-1 拉近间距
  const subMenuPositionClass = menuAlign === 'right'
    ? 'md:right-full md:top-0 top-6 mr-1'   // 右对齐时向左展开，并增加右外边距使其紧贴
    : 'md:left-full md:top-0 top-6 ml-1'    // 左对齐时向右展开，并增加左外边距使其紧贴

  return (
    <div className='menu-item'>
      {!hasSubMenu && (
        <SmartLink
          href={link?.href}
          target={link?.target}
          className='dark:hover:text-[var(--primary-color)] dark:hover:bg-white menu-link underline decoration-2 hover:no-underline hover:bg-[#2E405B] hover:text-white text-[var(--primary-color)] dark:text-gray-200 tracking-widest pb-1 font-bold'>
          {link?.name}
        </SmartLink>
      )}

      {hasSubMenu && (
        <>
          <div
            onMouseOver={() => changeShow(true)}
            onMouseOut={() => changeShow(false)}
            className={'relative ' + (selected ? 'bg-green-600 text-white hover:text-white' : 'hover:text-green-600')}>
            <div>
              <span className='dark:hover:text-[var(--primary-color)] dark:hover:bg-white menu-link underline decoration-2 hover:no-underline hover:bg-[#2E405B] hover:text-white text-[var(--primary-color)] dark:text-gray-200 tracking-widest pb-1 font-bold'>
                {link?.icon && <i className={link?.icon} />} {link?.name}
              </span>
              {hasSubMenu && (
                <i className={`px-2 fas fa-chevron-right duration-500 transition-all ${show ? ' rotate-180' : ''}`}></i>
              )}
            </div>

            <ul
              className={`${show ? 'visible opacity-100' : 'invisible opacity-0'} absolute glassmorphism ${subMenuPositionClass} w-auto min-w-32 border-gray-100 transition-all duration-300 z-20 block whitespace-nowrap`}>
              {link?.subMenus?.map((sLink, index) => {
                return (
                  <li
                    key={index}
                    className='dark:hover:bg-gray-900 tracking-widest transition-all duration-200 dark:border-gray-800 pb-3'>
                    <SmartLink href={sLink.href} target={link?.target}>
                      <span className='dark:hover:text-[var(--primary-color)] dark:hover:bg-white menu-link underline decoration-2 hover:no-underline hover:bg-[#2E405B] hover:text-white text-[var(--primary-color)] dark:text-gray-200 tracking-widest pb-1 font-bold'>
                        {sLink?.icon && <i className={sLink?.icon}> &nbsp; </i>}
                        {sLink.title}
                      </span>
                    </SmartLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
