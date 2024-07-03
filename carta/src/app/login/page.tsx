"use client";

import { useFetch } from "@/hock/useFetch";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './LoginForm.module.css';
interface Props {}

function LoginPages({}: Props) {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { post } = useFetch();
  const router = useRouter();

  const sendLogin =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await post(user, password, "api/auth/login");

  
   router.push("/admin");
      
    
  };
  return (
    <form onSubmit={sendLogin} className={styles.loginForm}>
      <div className={styles.inputContainer}>
        <input
          placeholder="usuario"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          placeholder="contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
          className={styles.inputField}
        />
      </div>
      <button type="submit" className={styles.submitButton}>Enviar</button>
    </form>
  );
}

export default LoginPages;
