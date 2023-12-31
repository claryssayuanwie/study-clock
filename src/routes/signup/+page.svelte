<script>
    import supabase from "../../routes/supa";
    import { goto } from "$app/navigation";

    let email = "";
    let password = "";

    async function handleSignup(email, password) {
        const {user, error} = await supabase.auth.signUp({
            email: email,
            password: password
        }); 
        if (user) {
            goto("/");
        } else {
    console.error(error);
}
}

function handleSubmit(event) {
    event.preventDefault();
    handleSignup(email, password);
}
</script>


<div class="signupFormContainer">
    <h1>Sign up</h1>
    <form class="signupForm" on:submit={handleSubmit}>
        <input type="email" bind:value={email} placeholder="email@email.com"/>
        <input type="password" bind:value={password} placeholder="Password"/>
        <button type="submit">Sign Up</button>
    </form>
</div>

<style>

.signupFormContainer {
    padding: 30px;
    border-radius: 15px;
    box-shadow: 2px 4px 4px rgba(0,0,0,0.25);
    background-color: var(--bg-2);
    max-height: 80vh;
    max-width: 100vh;
    }
</style>

