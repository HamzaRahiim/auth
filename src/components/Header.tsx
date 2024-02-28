import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <ul className="flex gap-4">
      <li>
        <Link href="/"> Home</Link>
      </li>
      <li>
        <Link href="/login"> Login</Link>
      </li>
      <li>
        <Link href="/profile"> Profile</Link>
      </li>
    </ul>
  );
};
