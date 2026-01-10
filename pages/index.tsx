import Login from "@/src/components/login";

export const metadata = {
  title: "My Application",
  description: "My Application description",
};
export default function Home() {
  return (
    <div className="vh-100" style={{ backgroundColor: "#EEE" }}>
      <title>Login In</title>
      <meta name="description" content="Login" />
      <link rel="icon" href="/favicon.ico" />

      <Login />
    </div>
  );
}
