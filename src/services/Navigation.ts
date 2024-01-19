import { useHistory } from 'react-router'

export default function Navigation() {
  const history = useHistory()

  function navigateTo(path: string) {
    history.push(path)
  }

  return {
    navigateTo,
  }
}
