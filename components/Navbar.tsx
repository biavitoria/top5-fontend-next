"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { getToken, getUser } from "@/lib/auth";

function useClient() {
  return useSyncExternalStore( () => () => {}, () => true, () => false
  );
}

export default function Navbar() {
  const router = useRouter();
  const isClient = useClient();

  if (!isClient) return null;

  const token = getToken();
  const user = getUser();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/");
    router.refresh();
  };

  return (
    <nav className="bg-[#8B4513] text-white px-4 py-3 flex flex-wrap items-center justify-between">
      
      <div className="flex items-center gap-3">
        <img
          src="https://i.ytimg.com/vi/VWxq5qUP8x0/hqdefault.jpg"
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white"
        />

        <span className="hidden sm:block text-lg font-semibold">
          Tião Carreiro & Pardinho
        </span>
      </div>

      <div className="flex gap-2 flex-wrap mt-2 sm:mt-0">
        <Link href="/">Home</Link>

        {!token && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Cadastrar</Link>
          </>
        )}

        {user?.is_admin === 1 && (
          <Link href="/admin" className="flex gap-2 flex-wrap mt-2 sm:mt-0">
            Admin
          </Link>
        )}

        {token && (
          <button onClick={logout}>
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}