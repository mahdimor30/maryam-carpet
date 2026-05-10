import { Link } from "@tanstack/react-router";

function RaastehLogo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img width={40} height={40} src="/images/logo.svg" alt="raasteh-logo" />
      <span className="font-black text-moon-primary-950 text-xl leading-7">
        راسته
      </span>
    </Link>
  );
}

export default RaastehLogo;
