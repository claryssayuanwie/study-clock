<script>
    import {onMount, onDestroy} from 'svelte';

    let elapsedSeconds = 0;
    let stopwatch;
    let isRunning = false;

    function startPauseStopwatch() {
        if (isRunning) {
            clearInterval(stopwatch);
            isRunning = false;
    } else {
        stopwatch = setInterval(() => {
            elapsedSeconds++;
            formattedTime = formattedElapsed(elapsedSeconds);
            }, 1000);
            isRunning = true;
    }
}

function resetStopwatch() {

    const confirmation = confirm("Do you want to save your stopwatch data before resetting?");

    if (confirmation) {
    const storedTime = parseInt(localStorage.getItem('elapsedTime')||'0', 10);
    localStorage.setItem('elapsedTime', storedTime + parseInt(elapsedSeconds, 10));
    }
    clearInterval(stopwatch);
    elapsedSeconds = 0;
    isRunning = false;
}

onMount(() => {

});

onDestroy(() => {
    clearInterval(stopwatch);
});

// format time with reactive declaration
$: formattedTime = formattedElapsed(elapsedSeconds);

// function to format time
function formattedElapsed(seconds){
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
</script>


<h1>Set a stopwatch!</h1>
<p>Study for as long as you'd like.</p>
<p> 
    Time elapsed: <b> {formattedTime} </b>
</p>

<div class="button-container">
    <!-- Play/Pause button -->
    <button on:click={startPauseStopwatch}>
        {#if isRunning}
        &#10074;&#10074;
        {:else}
        &#x25B6;
        {/if}
    </button>
    
        <!-- Reset button -->
        <button on:click={resetStopwatch}>
            &#x21BA;
        </button>
    </div>
    
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

