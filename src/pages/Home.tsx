import FilmPresentation from '~/components/FilmPresentation'
import Loading from '~/components/Loading'
import useData from '~/hooks/useData'

export default function Main() {
  const { loading, films } = useData()
  return loading ? <Loading /> : <FilmPresentation films={films} />
}
