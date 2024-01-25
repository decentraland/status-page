import { Header, Logo, Mobile, NotMobile } from "decentraland-ui";
import { useState } from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className={`dcl navbar ${toggle ? "open" : ""}`}>
      <div className="ui container">
        <NotMobile>
          <div className="dcl navbar-menu">
            <div className="ui secondary stackable menu">
              <a
                className="dcl navbar-logo"
                href="https://decentraland.org"
                rel="noreferrer"
              >
                <Logo />
              </a>
              <NavBarLink to="/">Decentraland Status</NavBarLink>
            </div>
          </div>
        </NotMobile>
        <Mobile>
          <div className="dcl navbar-mobile-menu">
            <a
              className="dcl navbar-logo"
              href="https://decentraland.org"
              rel="noreferrer"
            >
              <Logo />
            </a>
            <Header
              size="small"
              className={`dcl active-page ${
                toggle ? "caret-up" : "caret-down"
              }`}
              onClick={switchToggle}
            >
              Decentraland
            </Header>
          </div>
        </Mobile>
        <div className="dcl navbar-account"></div>
      </div>
      <div className="mobile-menu">
        <NavBarLink to="/" onClick={switchToggle}>
          Decentraland Status
        </NavBarLink>
      </div>
    </div>
  );

  function switchToggle(): any {
    setToggle(!toggle);
  }
}

function NavBarLink({
  to,
  children,
  ...props
}: {
  to: LinkProps["to"];
  children: any;
  onClick?: () => void;
}) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link to={to} {...props} className={isActive ? "active item" : "item"}>
      {children}
    </Link>
  );
}
