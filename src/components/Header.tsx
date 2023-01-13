import Image from "next/image";

const Header = () => {
  return (
    <header className="logo">
      <Image
        src="/assets/voshod-logo.png"
        alt="Восход лого"
        width={275}
        height={136}
      />
    </header>
  );
};

export default Header;
