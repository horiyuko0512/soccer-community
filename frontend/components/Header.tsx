import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-sky-500 p-4 text-white mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/matches" className="text-xl font-bold">
          Soccer Community
        </Link>
        <Link href="/my" className="text-xl font-bold">
          MyPage
        </Link>
      </div>
    </div>
  )
}

export default Header;