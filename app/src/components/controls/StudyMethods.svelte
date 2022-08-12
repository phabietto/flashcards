<script lang="ts">
import { StudyMethod } from "../../models/enums";
import StudyMode from "../cards/StudyMode.svelte";

export let studyMode: StudyMethod = StudyMethod.Flashcards;
</script>

<section class="{$$props.class}">
    <h2 class="font-bold text-lg text-gray-700 text-left mb-4">
    Choose how to study
    </h2>
    <ul>
    <li>
        <StudyMode
        selected={studyMode === StudyMethod.Flashcards || studyMode === StudyMethod.Undefined}
        title="Flashcards"
        description="Review terms and definitions"
        on:click={() => studyMode = StudyMethod.Flashcards}
        >
        <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd" />
        </StudyMode>
    </li>
    <li>
        <StudyMode
        selected={studyMode === StudyMethod.Learn}
        title="Learn"
        description="Focus your study using spaced repetition"
        on:click={() => studyMode = StudyMethod.Learn}
        >
        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </StudyMode>
    </li>
    <li>
        <StudyMode 
        selected={studyMode === StudyMethod.Quiz}
        title="Quiz" 
        description="Take a practice test"
        on:click={() => studyMode = StudyMethod.Quiz}
        >
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
        </StudyMode>
    </li>
    </ul>
</section>
