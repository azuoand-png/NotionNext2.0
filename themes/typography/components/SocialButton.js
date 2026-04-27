import { siteConfig } from '@/lib/config'

const SocialButton = () => {
  // 支持打赏按钮（按钮3）
  const support = {
    url: siteConfig('HEO_INFO_CARD_URL3', null, {}),
    text: siteConfig('HEO_INFO_CARD_TEXT3', null, {}),
  }

  // 下方两条文字链接
  const bottomLink1 = {
    text: siteConfig('CUSTOM_LINK1_TEXT', null, {}),
    url: siteConfig('CUSTOM_LINK1_URL', null, {}),
  }
  const bottomLink2 = {
    text: siteConfig('CUSTOM_LINK2_TEXT', null, {}),
    url: siteConfig('CUSTOM_LINK2_URL', null, {}),
  }

  const showSupport = support.url && support.text
  const showBottomLink1 = bottomLink1.text && bottomLink1.url
  const showBottomLink2 = bottomLink2.text && bottomLink2.url

  return (
    <div className="w-full">
      {/* 支持打赏按钮：右对齐，距离菜单牌底部 3rem（mt-3） */}
      {showSupport && (
        <div className="flex justify-end mt-3">
          <a
            href={support.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-1 rounded-full px-4 py-2 bg-indigo-400 dark:bg-yellow-500 transition-colors duration-200 hover:bg-white/80 dark:hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-white group-hover:text-indigo-400 dark:group-hover:text-yellow-500 transition-colors"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-bold text-white group-hover:text-indigo-400 dark:group-hover:text-yellow-500 transition-colors">
              {support.text}
            </span>
          </a>
        </div>
      )}

      {/* 下方的文字链接，距离支持打赏按钮 2rem（mt-2），内部间距 0.5rem（space-y-2），行距 1.5rem（leading-6） */}
      {(showBottomLink1 || showBottomLink2) && (
        <div className="mt-2 space-y-1 leading-6">
          {showBottomLink1 && (
            <div className="text-left">
              <a
                href={bottomLink1.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium underline decoration-2 decoration-current hover:scale-105 transition-transform duration-200 text-[var(--primary-color)] dark:text-white"
              >
                {bottomLink1.text}
              </a>
            </div>
          )}
          {showBottomLink2 && (
            <div className="text-left">
              <a
                href={bottomLink2.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium underline decoration-2 decoration-current hover:scale-105 transition-transform duration-200 text-[var(--primary-color)] dark:text-white"
              >
                {bottomLink2.text}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SocialButton
