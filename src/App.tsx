/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from '~/routes/routes'
import DataProvider from './contexts/DataContext'
import AuthProvider from './contexts/AuthContext'

const App = () => {
  return (
    <div className='App' style={{ backgroundColor: 'var(--black-color)' }}>
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} Component={route.component}>
                  {route.children?.map((child, index) => (
                    <Route key={index} path={child.path} Component={child.component}>
                      {child.childrens?.map((child, index) => (
                        <Route key={index} path={child.path} Component={child.component} />
                      ))}
                    </Route>
                  ))}
                </Route>
              ))}
            </Routes>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}
export default App
