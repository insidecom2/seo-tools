import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { HTTP_STATUS_CODE } from "../utils/constants";
import Http from "../utils/http";

export interface LoginFormData {
  email: string;
  password: string;
  rememberPassword: number;
}

export default function Login() {
  const defaultForm: LoginFormData = {
    email: "",
    password: "",
    rememberPassword: 0,
  };
  const [formData, setFormData] = useState<LoginFormData>(defaultForm);
  const [alert, setAlert] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (!loading && form.checkValidity()) {
      setAlert("");
      setLoading(true);
      try {
        const response: any = await Http.post("/api/login", formData);
        if (response.status === HTTP_STATUS_CODE.OK) {
          if (response.data.status) {
            Cookies.set("token", response.data.token);
            router.push("/dashboard/binance/history");
          } else {
            setAlert(response.data.message);
          }
        }
      } catch (error) {
        setAlert("Login failed. Please try again.");
      }
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const style: { [k: string]: React.CSSProperties } = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f7f7f8",
      padding: "12px",
    },
    card: {
      width: "100%",
      maxWidth: 420,
      background: "#fff",
      padding: 28,
      borderRadius: 12,
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      boxSizing: "border-box",
    },
    title: { margin: 0, marginBottom: 18, fontSize: 20, textAlign: "center" },
    label: { display: "block", fontSize: 13, marginBottom: 6, color: "#333" },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px solid #e6e6e9",
      marginBottom: 14,
      fontSize: 14,
      boxSizing: "border-box",
    },
    checkboxRow: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 14,
    },
    button: {
      width: "100%",
      padding: "10px 14px",
      borderRadius: 8,
      border: "none",
      background: "#111827",
      color: "#fff",
      fontSize: 15,
      cursor: "pointer",
    },
    buttonDisabled: { opacity: 0.6, cursor: "default" },
    alert: {
      marginTop: 12,
      color: "#c53030",
      textAlign: "center",
      fontSize: 14,
    },
    passwordContainer: {
      position: "relative" as const,
      marginBottom: 14,
    },
    passwordIconButton: {
      position: "absolute" as const,
      right: 10,
      top: "35%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 18,
      padding: 0,
      color: "#666",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <div style={style.page}>
      <form onSubmit={handleSubmit} style={style.card} noValidate>
        <h2 style={style.title}>Sign in</h2>

        <label style={style.label} htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          name="email"
          autoComplete="off"
          type="email"
          value={formData.email}
          placeholder="you@example.com"
          onChange={handleChange}
          style={style.input}
          required
        />

        <label style={style.label} htmlFor="password">
          Password
        </label>
        <div style={style.passwordContainer}>
          <input
            id="password"
            name="password"
            autoComplete="off"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            style={style.input}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={style.passwordIconButton}
            tabIndex={-1}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <div style={style.checkboxRow}>
          <input
            id="remember"
            name="rememberPassword"
            type="checkbox"
            onChange={handleChange}
            checked={formData.rememberPassword === 1}
          />
          <label htmlFor="remember">Remember password</label>
        </div>

        <button
          type="submit"
          style={{
            ...(style.button as object),
            ...(loading ? style.buttonDisabled : {}),
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {alert && <div style={style.alert}>{alert}</div>}
      </form>
    </div>
  );
}
