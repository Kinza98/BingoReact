import Logo from "./Logo";
import ProfileMenu from "./ProfileMenu";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-6">
      <Logo />

      <ProfileMenu />
    </header>
  );
}

export default Header;
