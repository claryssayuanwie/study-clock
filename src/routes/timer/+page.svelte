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
        if (!isTimerRunning) { 
        // calculate total time in seconds
        totalSeconds = minutesInput * 60 + secondsInput;
        secondsRemaining = totalSeconds; // initializing remaining time = total time

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


<!-- Displaying the timer (remaining time) -->
<div>
    <!-- Displaying the timer (remaining time) -->
    <p>Time left: {formattedTime}</p>
</div>
