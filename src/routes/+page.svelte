<script>
    import {onMount} from 'svelte';
    
    let totalStudyTime = 0;

    onMount (() => {
        const studyTime = localStorage.getItem('totalStudyTime') + localStorage.getItem('elapsedTime');
        totalStudyTime = studyTime ? parseInt(studyTime, 10) : 0;
    });

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

        return
    }

</script>

<h1>Hello!</h1>
<p>Welcome to studyclock! Start a study session!
    You can check your stats here.
</p>
<p> 
    Total study time: {formatStudyTime(totalStudyTime)}
</p>
