import type { PropsWithChildren } from 'react'
import React from 'react'

const Layout: React.FC<PropsWithChildren> = ({ children, ...rest }) => {
  return (
    <main {...rest}>
      <div>{children}</div>
    </main>
  )
}

export default Layout
