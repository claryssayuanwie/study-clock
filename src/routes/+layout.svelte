<nav>
	<img src="studyclockpng.png" alt="Navbar Image" height="30">
    <a href="/login">login</a>
    <a href="/">home</a>
	<a href="/timer">timer</a>
    <a href="/stopwatch">stopwatch</a>
</nav>

<slot />

<script>
    import { onMount } from 'svelte';
    import Timer from '../../src/components/Timer.svelte';
    import Stopwatch from '../../src/components/Stopwatch.svelte';
    
    let totalStudyTime = 0;

    // update totalStudyTime when it changes in the child components
    function updateTotalStudyTime(event) {
        totalStudyTime = event.detail.totalStudyTime;
    }

    // event listeners for child component events
    let timerComponent;
    let stopwatchComponent;

    onMount(() => {
        const studyTime = localStorage.getItem('totalStudyTime');
        totalStudyTime = studyTime ? parseInt(studyTime, 10) : 0;

        // instantiate timer & stopwatch with updated totalStudyTime prop
        timerComponent = new Timer({
            target: document.body,
            props: {
                totalStudyTime
            }
        });
        stopwatchComponent = new Stopwatch({
            target: document.body,
            props: {
                totalStudyTime
            }
        });
        // Listen to events from child components to update totalStudyTime
        timerComponent.$on('totalStudyTimeChanged', updateTotalStudyTime);
        stopwatchComponent.$on('totalStudyTimeChanged', updateTotalStudyTime);
    })
    
</script>

