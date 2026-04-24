import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'

/**
 * 页脚
 * @param {*} props
 * @returns
 */
export default function Footer(props) {
  return (
    <footer>
      {/* 仅保留暗色模式切换按钮（月亮图标） */}
      <DarkModeButton className='pt-4' />
      
      {/* 以下版权文字已删除 */}
    </footer>
  )
}
