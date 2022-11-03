import { Header, Logo, Mobile, NotMobile } from "decentraland-ui"
import { useState } from "react"
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {

  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <div className={`dcl navbar ${toggle ? 'open' : ''}`}>
      <div className="ui container">
        <NotMobile>
          <div className="dcl navbar-menu">
            <div className="ui secondary stackable menu">
              <Link className="dcl navbar-logo" to="https://decentraland.org"><Logo /></Link>
              <NavBarLink to="/">Decentraland Status</NavBarLink>
              <NavBarLink to="/metrics">Metrics</NavBarLink>
            </div>
          </div>
        </NotMobile>
        <Mobile>
        <div className="dcl navbar-mobile-menu">
            <a className="dcl navbar-logo" href="https://decentraland.org">
              <Logo />
            </a>
            <Header
              size="small"
              className={`dcl active-page ${
                toggle ? 'caret-up' : 'caret-down'
              }`}
              onClick={() => setToggle(!toggle)}
            >
              Decentraland
            </Header>
          </div>
        </Mobile>
        <div className="dcl navbar-account"></div>
      </div>
      <div className="mobile-menu">
        <NavBarLink to="/">Decentraland Status</NavBarLink>
        <NavBarLink to="/metrics">Metrics</NavBarLink>
      </div>
    </div>
  )
}

function NavBarLink({ to, children, ...props }: {to: LinkProps["to"], children: any}) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
      <Link to={to} {...props} className={isActive ? "active item" : "item"}>
        {children}
      </Link>
  )
}
