import React from "react";
import { Input } from "./ui/Input.jsx";
import { Button } from "./ui/button.jsx";

function Login() {
  return (
    <div className="h-full w-auto border-black border-2 p-5">
      <Input type="email" placeholder="email" />
      <br />
      <Input type="text" placeholder="username" />
      <br />
      <Button variant="outline">Button</Button>
      <br />
    </div>
  );
}

export { Login };
