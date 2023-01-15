import { Button, Divider } from "@mui/material";
import { useRouter } from "next/router";

const prerequisites = ["Google Account", "Node (>14.X)", "Firebase CLI"];
const topics = [
  {
    label: "Firebase Authentication",
    href: "https://firebase.google.com/docs/auth",
  },
  {
    label: "Firebase Storage",
    href: "https://firebase.google.com/docs/storage",
  },
  {
    label: "Firebase Firestore",
    href: "https://firebase.google.com/docs/firestore",
  },
  {
    label: "Firebase Functions",
    href: "https://firebase.google.com/docs/functions",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ padding: 10 }}>
      <h1>DSC - Backend Workshop</h1>
      <h2>Benjamin Lui | Ezekiel Toh | Faith Chua</h2>
      <p>Welcome to DSC's backend workshop!</p>

      <div>
        <Button onClick={() => router.push("/signInPage")}>Sign In Page</Button>
        <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
      </div>

      <Divider />

      <h2>Pre-requisites</h2>
      <ol>
        {prerequisites.map((pre) => (
          <li>{pre}</li>
        ))}
      </ol>

      <a href="https://firebase.google.com/docs/cli">
        How to install Firebase CLI
      </a>

      <h2>Topics Covered</h2>
      <ul>
        {topics.map(({ label, href }) => (
          <li>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
