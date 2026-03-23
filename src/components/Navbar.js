import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-black p-4 flex gap-6 text-white">
      <Link to="/">Home</Link>
      <Link to="/hollywood">Hollywood</Link>
      <Link to="/bollywood">Bollywood</Link>
      <Link to="/tollywood">Tollywood</Link>
    </div>
  );
}