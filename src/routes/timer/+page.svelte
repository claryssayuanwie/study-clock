<script>
    // import lifecycle hooks 
    import {onMount, onDestroy} from 'svelte';

    // import writable store
    import {totalStudyTime} from './routes/stores';

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
            // increment total study time by elapsed time
            totalStudyTime.update(value => value + elapsedTime)
        }

        // store elapsed time in local storage
        localStorage.getItem('elapsedTime', totalSeconds - secondsRemaining);
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
    const confirmation = confirm("Do you want to save your progress before resetting?");

    if (confirmation) {
        // save to local storage
        localStorage.setItem('elapsedTime', totalSeconds - secondsRemaining);
    } else {
        // clear fron local storage
        localStorage.removeItem('elapsedTime');
    }

    clearInterval(timer);
    isTimerRunning = false;
    secondsRemaining = 0;
    // Reset user input = to 0
    minutesInput = 0;
    secondsInput = 0;
}

// lifecycle hook - runs when component is mounted
onMount(() => {
    // get elapsed time from local storage on mount
    const storedElapsedTime = localStorage.getItem('elapsedTime');
    if (storedElapsedTime) {
        const elapsedTime = parseInt(storedElapsedTime, 10);
        secondsRemaining = totalSeconds - elapsedTime;
        if (secondsRemaining <= 0) {
            secondsRemaining = 0;
            clearInterval(timer);
        } else {
            timer = setInterval(handleTimer, 1000);
        }      
    }
});

onDestroy(() => {
    clearInterval(timer);
});

// reactive declaration to update timer
$: formattedTime = `${Math.floor(secondsRemaining / 60)} min ${secondsRemaining % 60} sec`;


</script>

<style>

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