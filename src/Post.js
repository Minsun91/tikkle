import pb from "./lib/pocketbase.js";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Post() {
    const [isLoading, setLoading] = useState(false);
    const [dummy, setDummy ] = useState(0)
    const { register, handleSubmit } = useForm();

    const isLoggedIn = pb.authStore.isValid;

    async function login(data) {
        setLoading(true);
        try {
            const authData = await pb
                .collection("users")
                .authWithPassword(data.email, data.password);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }
    function logout() {
        pb.authStore.clear();
        setDummy(Math.random)
    }

    if (isLoggedIn)
        return (
            <>
                <h1> Logged In : {pb.authStore.model.email} </h1>
                <button onClick={logout}> Log Out </button>
            </>
        );
    return (
        <>
            {isLoading && <p> loading...</p>}
            <h1>Please Log In</h1>

            <form onSubmit={handleSubmit(login)}>
                <input type="text" placeholder="email" {...register("email")} />
                <input
                    type="password"
                    placeholder="password"
                    {...register("password")}
                />
                <button type="submit">{isLoading ? "Loading" : "Login"}</button>
            </form>
        </>
    );
}
