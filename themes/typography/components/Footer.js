import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'

export default function Footer(props) {
  return (
    <footer>
      <DarkModeButton className='pt-4' />
    </footer>
  )
}
