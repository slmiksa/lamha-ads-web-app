import { useEffect, useState } from "react";
import AdminWorkspace from "@/components/AdminWorkspace";

const ADMIN_SESSION_KEY = "lamha_admin_unlocked";
const ADMIN_PASSWORD_HASH_KEY = "lamha_admin_password_hash";
const DEFAULT_PASSWORD_HASH = "0e2292e0fde71e24022fc18496fd7ba7e25c342b790450ee9897d7bcc6261ce1";

/** Pure-JS SHA-256 — used when crypto.subtle is missing (http:// or old WebViews). */
function sha256Fallback(message: string): string {
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];
  const H = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];
  const bytes = Array.from(new TextEncoder().encode(message));
  const bitLen = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  for (let i = 7; i >= 0; i--) bytes.push(Math.floor(bitLen / Math.pow(2, i * 8)) & 0xff);

  const rotr = (x: number, n: number) => (x >>> n) | (x << (32 - n));
  const w = new Uint32Array(64);
  const at = (arr: number[], i: number) => arr[i] as number;
  for (let i = 0; i < bytes.length; i += 64) {
    for (let t = 0; t < 16; t++) {
      w[t] =
        ((at(bytes, i + t * 4) << 24) |
          (at(bytes, i + t * 4 + 1) << 16) |
          (at(bytes, i + t * 4 + 2) << 8) |
          at(bytes, i + t * 4 + 3)) >>>
        0;
    }
    for (let t = 16; t < 64; t++) {
      const w15 = w[t - 15] as number;
      const w2 = w[t - 2] as number;
      const s0 = rotr(w15, 7) ^ rotr(w15, 18) ^ (w15 >>> 3);
      const s1 = rotr(w2, 17) ^ rotr(w2, 19) ^ (w2 >>> 10);
      w[t] = ((w[t - 16] as number) + s0 + (w[t - 7] as number) + s1) >>> 0;
    }
    let a = at(H, 0);
    let b = at(H, 1);
    let c = at(H, 2);
    let d = at(H, 3);
    let e = at(H, 4);
    let f = at(H, 5);
    let g = at(H, 6);
    let h = at(H, 7);
    for (let t = 0; t < 64; t++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + at(K, t) + (w[t] as number)) >>> 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;
      h = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }
    const next = [a, b, c, d, e, f, g, h];
    for (let t = 0; t < 8; t++) H[t] = (at(H, t) + at(next, t)) >>> 0;
  }
  return H.map((x) => x.toString(16).padStart(8, "0")).join("");
}

async function hashPassword(value: string) {
  const subtle = typeof window !== "undefined" ? window.crypto?.subtle : undefined;
  if (!subtle) return sha256Fallback(value);
  const bytes = new TextEncoder().encode(value);
  const digest = await subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export default function AdminPanelGate() {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "1");
    setReady(true);
  }, []);

  const login = async () => {
    const password = window.prompt("أدخل كلمة مرور لوحة التحكم");
    if (password === null) return;
    const expected = window.localStorage.getItem(ADMIN_PASSWORD_HASH_KEY) ?? DEFAULT_PASSWORD_HASH;
    if ((await hashPassword(password)) !== expected) {
      window.alert("كلمة المرور غير صحيحة");
      return;
    }
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
    setUnlocked(true);
  };

  const logout = () => {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setUnlocked(false);
  };

  const changePassword = async () => {
    const password = window.prompt("أدخل كلمة المرور الجديدة");
    if (password === null) return;
    if (password.trim().length < 6) {
      window.alert("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل");
      return;
    }
    window.localStorage.setItem(ADMIN_PASSWORD_HASH_KEY, await hashPassword(password.trim()));
    window.alert("تم تغيير كلمة المرور");
  };

  if (!ready) return null;

  if (!unlocked) {
    return (
      <main className="grid min-h-screen place-items-center bg-secondary/30 px-4" dir="rtl">
        <section className="w-full max-w-sm rounded-2xl border border-border bg-card p-7 text-center shadow-sm">
          <img src="/logo.png" alt="شعار تطبيق لمحة" className="mx-auto h-24 w-auto object-contain" />
          <h1 className="mt-4 font-display text-xl">لوحة تحكم الموقع</h1>
          <button type="button" onClick={login} className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">
            تسجيل الدخول
          </button>
        </section>
      </main>
    );
  }

  return <AdminWorkspace onLogout={logout} onChangePassword={changePassword} />;
}