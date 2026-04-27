import { siteConfig } from '@/lib/config'

/**
 * 个人资料底部按钮（Heo 风格）
 * 显示两个图标按钮 + 一个单独右对齐的带箭头按钮 + 两个自定义文字链接
 */
const SocialButton = () => {
  // 读取配置
  const card1 = {
    url: siteConfig('HEO_INFO_CARD_URL1', null, {}),
    icon: siteConfig('HEO_INFO_CARD_ICON1', null, {}),
  }
  const card2 = {
    url: siteConfig('HEO_INFO_CARD_URL2', null, {}),
    icon: siteConfig('HEO_INFO_CARD_ICON2', null, {}),
  }
  const card3 = {
    url: siteConfig('HEO_INFO_CARD_URL3', null, {}),
    text: siteConfig('HEO_INFO_CARD_TEXT3', null, {}),
  }

  // 自定义文字链接配置
  const customLink1 = {
    text: siteConfig('CUSTOM_LINK1_TEXT', null, {}),
    url: siteConfig('CUSTOM_LINK1_URL', null, {}),
  }
  const customLink2 = {
    text: siteConfig('CUSTOM_LINK2_TEXT', null, {}),
    url: siteConfig('CUSTOM_LINK2_URL', null, {}),
  }

  const showCard1 = card1.url && card1.icon
  const showCard2 = card2.url && card2.icon
  const showCard3 = card3.url && card3.text
  const showCustom1 = customLink1.text && customLink1.url
  const showCustom2 = customLink2.text && customLink2.url

  return (
    <div className="w-full">
      {/* 第一行：左侧两个图标按钮 */}
      <div className="flex justify-between w-full">
        <div className="flex space-x-3">
          {showCard1 && (
            <a
              href={card1.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-indigo-400 dark:bg-yellow-500 rounded-full transition-colors duration-200 hover:bg-white dark:hover:bg-black"
            >
              <i className={`${card1.icon} text-white dark:text-white hover:text-black dark:hover:text-white transition-colors`} />
            </a>
          )}
          {showCard2 && (
            <a
              href={card2.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-indigo-400 dark:bg-yellow-500 rounded-full transition-colors duration-200 hover:bg-white dark:hover:bg-black"
            >
              <i className={`${card2.icon} text-white dark:text-white hover:text-black dark:hover:text-white transition-colors`} />
            </a>
          )}
        </div>
      </div>

      {/* 第三个按钮：右对齐，距离上方图标 4rem（mt-16），悬停时背景不变，文字颜色改为主题色 */}
      {showCard3 && (
        <div className="flex justify-end mt-16">
          <a
            href={card3.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-1 rounded-full px-4 py-2 bg-indigo-400 dark:bg-yellow-500 transition-colors duration-200"
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
              {card3.text}
            </span>
          </a>
        </div>
      )}

      {/* 两个自定义文字链接，距离第三个按钮 3rem（mt-12），行距 1.5 倍 */}
      {(showCustom1 || showCustom2) && (
        <div className="mt-12 space-y-3 leading-6">
          {showCustom1 && (
            <div className="text-left">
              <a
                href={customLink1.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block underline decoration-2 hover:scale-105 transition-transform duration-200"
                style={{
                  color: '#833737',
                  textDecorationColor: '#833737',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#833737'
                  e.currentTarget.style.textDecorationColor = '#833737'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#833737'
                  e.currentTarget.style.textDecorationColor = '#833737'
                }}
              >
                {customLink1.text}
              </a>
            </div>
          )}
          {showCustom2 && (
            <div className="text-left">
              <a
                href={customLink2.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block underline decoration-2 hover:scale-105 transition-transform duration-200"
                style={{
                  color: '#833737',
                  textDecorationColor: '#833737',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#833737'
                  e.currentTarget.style.textDecorationColor = '#833737'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#833737'
                  e.currentTarget.style.textDecorationColor = '#833737'
                }}
              >
                {customLink2.text}
              </a>
            </div>
          )}
        </div>
      )}

      {/* 暗色模式覆盖：使用 CSS 变量或全局样式，为了简单，通过 JS 监听切换，但为了代码简洁，我们使用内联 style 配合 dark 类？但 tailwind dark 类不能直接控制内联。更好的方式：将颜色写到 global css 中或使用 css 变量。由于需求明确，我们使用 CSS 变量。 */}
      <style jsx>{`
        .custom-link {
          color: #833737;
          text-decoration-color: #833737;
        }
        .dark .custom-link {
          color: #E4C500;
          text-decoration-color: #E4C500;
        }
      `}</style>
    </div>
  )
}

export default SocialButton
