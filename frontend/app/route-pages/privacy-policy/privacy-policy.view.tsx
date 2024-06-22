import { MainContent } from '~/components/main-content/main-content.view'
import { Back } from './views/back/back.view'
import { Article } from './views/article/article.view'

export const PrivacyPolicyViews = () => {
  return (
    <MainContent sx={{ maxWidth: 1108, px: 2, pb: 6 }}>
      <h1 className="mb-14 text-3xl sm:text-[2.75rem] text-center leading-snug font-bold">
        Privacy Policy
      </h1>

      <Back />
      <Article />
      <Back />
    </MainContent>
  )
}
