const LayoutBase = props => {
  const { children } = props
  const { onLoading, fullWidth } = useGlobal()
  const searchModal = useRef(null)
  const [currentPost, setCurrentPost] = useState(null)

  return (
    <ThemeGlobalSimple.Provider value={{ searchModal, currentPost, setCurrentPost }}>
      <div
        id='theme-typography'
        className={`${siteConfig('FONT_STYLE')} font-typography h-screen flex flex-col dark:text-gray-300 bg-white dark:bg-[#232222] overflow-hidden`}>
        <Style />
        {siteConfig('SIMPLE_TOP_BAR', null, CONFIG) && <TopBar {...props} />}

        {/* 外层容器 - 减小整体上下内边距 */}
        <div className='flex flex-1 mx-auto overflow-hidden py-1 md:p-0 md:max-w-[90rem] md:px-8 w-screen'>
          
          {/* 左侧边栏：去掉多余的 md:mt-20，调整粘性位置 */}
          <div className='hidden md:flex md:flex-col md:flex-shrink-0 md:w-64 md:h-[100vh] sticky top-4 overflow-y-auto scroll-hidden'>
            <NavBar {...props} />
            {currentPost && (
              <div className='mt-4 px-2'>
                <Catalog post={currentPost} />
              </div>
            )}
            <Footer {...props} />
          </div>

          {/* 右侧主要内容区域：适度增加顶部外边距，既不过紧也不过远 */}
          <div className='overflow-hidden md:mt-8 flex-1'>
            <div id='container-inner' className='h-full w-full md:px-8 overflow-y-auto scroll-hidden relative'>
              <div className='md:hidden'>
                <NavBar {...props} />
              </div>
              {onLoading ? (
                <div className='flex items-center justify-center min-h-[500px] w-full'>
                  <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white'></div>
                </div>
              ) : (
                <>{children}</>
              )}
              <AdSlot type='native' />
              <div className='md:hidden z-30'>
                <Footer {...props} />
              </div>
            </div>
          </div>
        </div>

        <div className='fixed right-4 bottom-4 z-20'>
          <JumpToTopButton />
        </div>
        <AlgoliaSearchModal cRef={searchModal} {...props} />
      </div>
    </ThemeGlobalSimple.Provider>
  )
}
