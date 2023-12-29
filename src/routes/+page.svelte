<script>
    import {onMount} from 'svelte';
    
    let totalStudyTime = 0;
    let goalHours = 0;
    let goalMinutes = 0;

    let completed = false;

    let minutesInput = 0;
    let hoursInput = 0;

    function calculateCompletion(time, goal) {
        const totalTimeMinutes = time / 60;
        completed = totalTimeMinutes >= goal;
    }

    function setGoal() {
        const totalGoalMinutes = goalHours * 60 + goalMinutes;
        localStorage.setItem('dailyStudyGoal', totalGoalMinutes);
        totalStudyTime = parseInt(localStorage.getItem('totalStudyTime') || '0', 10) + parseInt(localStorage.getItem('elapsedTime') || '0', 10);
        calculateCompletion(totalStudyTime, totalGoalMinutes);
        
    }

    function formatStudyTime(seconds) {
        const days = Math.floor(seconds / (3600 * 24))
        const hours = Math.floor((seconds % (3600 * 2400)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedDays = days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '';
        const formattedHours = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
        const formattedMinutes = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '';
        const formattedSeconds = remainingSeconds > 0 ? `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}` : '';

        const timeArray = [formattedDays, formattedHours, formattedMinutes, formattedSeconds].filter(Boolean);
        return timeArray.join(', ');
    }

    onMount (() => {
        const studyTime = parseInt(localStorage.getItem('totalStudyTime') || '0', 10) + parseInt(localStorage.getItem('elapsedTime') || '0', 10);
        totalStudyTime = studyTime;
        setGoal();
    });

</script>

<main>
<h1>Hello!</h1>
<p>Welcome to studyclock! Start a study session! </p>
<p>Set your daily goal! {goalHours} hr {goalMinutes} min </p> 

<!-- Input for hours and minutes -->
<label for="hoursInput">Hours</label>
<input type="number" id="hoursInput" bind:value={goalHours} bind:this={hoursInput} min="0">

<label for="minutesInput">Minutes</label>
<input type="number" id="minutesInput" bind:value={goalMinutes} bind:this={minutesInput} min="0" max="59">

<!-- Button to update the daily goal -->
<button on:click={setGoal}>Set Goal</button>

{#if completed}
<p>Great job! You completed your daily study goal! </p>
{/if}

<p> Total study time: {formatStudyTime(totalStudyTime)} </p>
</main>

<style>
    label,
    input,
    button {
        text-align: center;
        margin: 0 auto;
        display: block;
    }
</style>