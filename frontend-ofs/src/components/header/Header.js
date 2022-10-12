const initialState = {level:3, content:''};

export function Header ({level, children} = initialState) {
  const HeaderLevel = `h${level}`;
  return <HeaderLevel>{children}</HeaderLevel>
}

export default Header;