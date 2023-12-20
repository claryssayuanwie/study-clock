<script>
    // import lifecycle hooks 
    import {onMount, onDestroy} from 'svelte';

    // variables to hold total time and remaining time
    let totalSeconds = 0;
    let secondsRemaining = 0;
    let timer; // reference to the timer interval
    let isTimerRunning = false;

    // variables to store user input
    let minutesInput = 0;
    let secondsInput = 0;

    // Function to start timer
    function startPauseTimer() {
        const inputSeconds = secondsInput + minutesInput * 60; // total inputted seconds
        if (!isTimerRunning && inputSeconds > 0) { 
        totalSeconds = inputSeconds;
        secondsRemaining = totalSeconds; // remaining time = total time

       // function for timer logic
       function handleTimer() {
        if (!isTimerRunning) return; // timer is not running
        secondsRemaining--; // decrements remaining time
        if (secondsRemaining === 0){
            clearInterval(timer);
        }
       }
       // set timer
       timer = setInterval(handleTimer, 1000);
       isTimerRunning = true;

    } else {
        clearInterval(timer);
        isTimerRunning = false;
    }
}

// function to reset timer
function resetTimer(){
    clearInterval(timer);
    isTimerRunning = false;
    secondsRemaining = 0;
    // Reset user input = to 0
    minutesInput = 0;
    secondsInput = 0;
}

// lifecycle hook - runs when component is mounted
onMount(() => {
    
});

onDestroy(() => {
    clearInterval(timer);
});

// reactive declaration to update timer
$: formattedTime = `${Math.floor(secondsRemaining / 60)} min ${secondsRemaining % 60} sec`;


</script>

<style>
body {
    text-align: center; 
}

h1, p {
    text-align: center; 
}

label, input {
    display: block;
    margin: 0 auto;
    text-align: center;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 10px; 
    margin-top: 20px; 
}

.button-container button {

}
</style>

<h1>Start a timer!</h1>
<p>Choose how long your study session runs.</p>

<div>
    <label for = "minutes">Minutes</label>
    <input type="number" id = "minutes" bind:value={minutesInput} min = "0"/>
</div>

<div>
    <label for = "seconds">Seconds</label>
    <input type="number" id = "seconds" bind:value={secondsInput} min = "0" max = "59"/>
</div>

<div class="button-container">
<!-- Play/Pause button -->
<button on:click={startPauseTimer}>
    {#if isTimerRunning}
    &#10074;&#10074;
    {:else}
    &#x25B6;
    {/if}
</button>

    <!-- Reset button -->
    <button on:click={resetTimer}>
        &#x21BA;
    </button>
</div>

<!-- Displaying the timer (remaining time) -->
<div>
    {#if secondsRemaining === 0 && isTimerRunning}
        <p>Time's up! Take a break.</p>
    {:else}
        <p>Time left: {formattedTime}</p>
    {/if}
</div>