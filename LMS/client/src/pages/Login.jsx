import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function Login() {

  const [loginInput, setLoginInput] = useState({
    password: "",
    username: ""
  });
  
  const [signUpInput, setSignUpInput] = useState({
    username: "",
    password: "",
    email: ""
  });
  
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signUp") {
      setSignUpInput({ ...signUpInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleData = (type) => {
    const inputData = type === "signUp" ? signUpInput : loginInput;
    console.log(inputData);
  };

  return (
    <div className="flex items-center w-full justify-center">
      <Tabs defaultValue="account" className="w-[400px]"> 
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signUp">SignUp</TabsTrigger>
          <TabsTrigger value="logIn">LogIn</TabsTrigger>
        </TabsList>
        <TabsContent value="signUp">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input 
                  type="text"
                  name="username"
                  value={signUpInput.username}
                  placeholder="Eg. Priyanshu"
                  required
                  onChange={(e) => changeInputHandler(e, "signUp")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input 
                  type="email"
                  name="email"
                  value={signUpInput.email}
                  placeholder="Eg. Priyanshu636@gmail.com" 
                  required
                  onChange={(e) => changeInputHandler(e, "signUp")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input 
                  type="password"
                  name="password"
                  value={signUpInput.password}
                  placeholder="Password" 
                  required
                  onChange={(e) => changeInputHandler(e, "signUp")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleData("signUp")}>SignUp</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="logIn">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter with your valid username and password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input 
                  type="text"
                  placeholder="username"
                  onChange={(e) => changeInputHandler(e, "logIn")}
                  name="username"
                  value={loginInput.username} 
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input 
                  placeholder="password" 
                  type="password"
                  onChange={(e) => changeInputHandler(e, "logIn")}
                  name="password"
                  value={loginInput.password} 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleData("logIn")}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Login;
