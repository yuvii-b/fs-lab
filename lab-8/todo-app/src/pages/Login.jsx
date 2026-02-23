import { useState } from "react";

export default function Login({ onLogin }){

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const uname = "yuvi";
    const pass = "123456";

    const handleSubmit = (e) => {    
        e.preventDefault();
        if(!name || !password){
            setError("All fields are required!");
            return;
        }
        if(password.length < 6){
            setError("Password must be atleast 6 characters");
            return;
        }
        if(name !== uname || password !== pass){
            setError("Invalid Credentials");
            return;
        }
        setError("");
        onLogin(name);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login Page</h2>
                { error && <p style={{color: "red"}}> {error} </p> }
                <input type="text" value={name} placeholder="username" onChange={(e) => setName(e.target.value)} /><br /><br />
                <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}