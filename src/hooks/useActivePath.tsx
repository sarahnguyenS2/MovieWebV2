import React from 'react'
import { useLocation } from 'react-router-dom'

const useActivePath = (pages: string[]): string => {
  const location = useLocation()

  return React.useMemo(() => {
    const currentPage = pages.find((page) => location.pathname.includes(page.toLowerCase()))
    return currentPage ? (currentPage === 'Home' ? '/' : `/${currentPage.toLowerCase()}`) : '/'
  }, [location.pathname, pages])
}

export default useActivePath
