import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleSignup = () => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    users.push({
      name,
      email,
      password,
      tasks: [],
    });

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    navigate("/");
  };

  return (
    <div>
      <h1>Create Account</h1>

      <input
        placeholder="Name"
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}

export default Signup;