<script>
    
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();
dispatch('totalStudyTimeChanged', { totalStudyTime });

</script>
