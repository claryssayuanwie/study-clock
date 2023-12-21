<script>
    import {onMount} from 'svelte';
    import {totalStudyTime} from './routes/stores';

    let timeSpentStudying = 0;

    totalStudyTime.subscribe(value => {
        timeSpentStudying  = value;
    });

    onMount (() => {
    });

    function getTotalStudyTime() {
        const studyTime = localStorage.getItem('totalStudyTime');

        if (studyTime) {
            return parseInt(studyTime, 10);
        } else {
            return 0;
        }
    }
</script>

<h1>Hello!</h1>
<p>Welcome to studyclock! Start a study session!
    You can check your stats here.
</p>
<p> 
    Total study time: {totalStudyTime}
</p>
