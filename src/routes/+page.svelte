<script>
    import {onMount} from 'svelte';
    
    let totalStudyTime = 0;

    onMount (() => {
        const studyTime = localStorage.getItem('totalStudyTime');
        totalStudyTime = studyTime ? parseInt(studyTime, 10) : 0;
    });

</script>

<h1>Hello!</h1>
<p>Welcome to studyclock! Start a study session!
    You can check your stats here.
</p>
<p> 
    Total study time: {totalStudyTime}
</p>
