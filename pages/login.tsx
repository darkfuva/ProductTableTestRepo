import { Button, Input } from "@mui/base";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type UserKeys = "username" | "password" | "expiresInMins";
// { userObj }: any
type UserType = {
  [key in UserKeys]: string | number;
};
type UserFormType = {
  label: string;
  type?: string;
  accessor: UserKeys;
};
export default function Login() {
  const router = useRouter();
  let _userObj: UserType = {
    username: "emilys",
    password: "emilyspass",
    expiresInMins: 1,
  };
  let [userObj, setUserObj] = useState(_userObj);

  let userForm: UserFormType[] = [
    { label: "Username", accessor: "username" },
    { label: "Password", type: "password", accessor: "password" },
  ];

  const handleUserLogin = () => {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userObj),
    })
      .then((res) => res.json())
      .then((user) => {
        localStorage.setItem("token", user.token);
        router.push("/");
      });
  };

  return (
    <div className="flex justify-center">
      <div>
        {userForm.map((formItem) => (
          <Input
            key={formItem.accessor}
            onChange={(e) =>
              setUserObj({ ...userObj, [formItem.accessor]: e.target.value })
            }
            slotProps={{
              input: {
                className: "textInput",
              },
            }}
            placeholder={`${formItem.label}...`}
          ></Input>
        ))}
        <Button
          slotProps={{
            root: {
              className: "buttonClass",
            },
          }}
          onClick={() => handleUserLogin()}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
