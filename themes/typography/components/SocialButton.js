import { siteConfig } from '@/lib/config'

/**
 * 个人资料底部按钮（Heo 风格）
 * 只显示三个卡片：两个图标按钮 + 一个带文字和箭头的按钮
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

  const showCard1 = card1.url && card1.icon
  const showCard2 = card2.url && card2.icon
  const showCard3 = card3.url && card3.text

  if (!showCard1 && !showCard2 && !showCard3) {
    return null
  }

  return (
    <div className="flex justify-between w-full mt-6">
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
      {showCard3 && (
        <a
          href={card3.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-indigo-400 dark:bg-yellow-500 hover:bg-white dark:hover:bg-black rounded-full px-4 py-2 flex items-center space-x-1 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-white group-hover:text-black dark:group-hover:text-white transition-colors"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-bold text-white group-hover:text-black dark:group-hover:text-white transition-colors">
            {card3.text}
          </span>
        </a>
      )}
    </div>
  )
}

export default SocialButton
