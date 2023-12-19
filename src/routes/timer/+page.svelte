<script>
    // import lifecycle hooks 
    import {onMount, onDestroy} from 'svelte';

    // variables to hold total time and remaining time
    let totalSeconds = 0;
    let secondsremaining = 0;
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

// lifecycle hook - runs when component is mounted
onMount(() => {
    const interval = setInterval(() => {
        if (isTimerRunning && secondsRemaining > 0) {
            secondsRemaining--;
        } else {
            clearInterval(interval)
            isTimerRunning = false;
        }
    }, 1000)
});

onDestroy(() => {
    clearInterval(timer);
});

// reactive declaration to update timer
$: formattedTime = `${Math.floor(secondsRemaining / 60)}:${secondsRemaining % 60}`;


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

<!-- Button to start/pause the timer -->
<button on:click={startPauseTimer}>
    &#x25B6;
</button>

<!-- Displaying the timer (remaining time) -->
<div>
    <!-- Displaying the timer (remaining time) -->
<h1>Timer: {formattedTime}</h1>
</div>
