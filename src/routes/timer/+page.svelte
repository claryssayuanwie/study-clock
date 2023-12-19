<script>
    // import lifecycle hooks 
    import {onMount, onDestroy} from 'svelte';

    // variables to hold total time and remaining time
    let totalSeconds = 0;
    let secondsremaining = 0;
    let timer; // reference to the timer interval

    // variables to store user input
    let minutesInput = 0;
    let secondsInput = 0;

    // Function to start timer
    function startTimer() {
        // calculate total time in seconds
        totalSeconds = minutesInput * 60 + secondsInput;
        secondsRemaining = totalSeconds; // initializing remaining time = total time

       // function for timer logic
       function handleTimer() {
        secondsRemaining--; // decrements remaining time
        if (secondsRemaining === 0){
            clearInterval(timer);
        }
       }
       // set timer
       timer = setInterval(handleTimer, 1000);
    }

</script>

<style>

</style>

<h1>Start a timer!</h1>
<p>Choose how long your study session runs.</p>

<div>

</div>
