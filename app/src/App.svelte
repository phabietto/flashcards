<script lang="ts">
  import { text } from "svelte/internal";
  import DeckPreview from "./components/cards/DeckPreview.svelte";
  import StudyMode from "./components/cards/StudyMode.svelte";
  import ActiveBreakpointIndicator from "./components/debug/ActiveBreakpointIndicator.svelte";
  import FlashCard from "./components/flashcard/FlashCard.svelte";
  import Tailwind from "./Tailwind.svelte";

  let decks = [
    {
      name: "Hangul - Korean alphabet",
      description: "Learning the Hangul alphabet with phonetics references.",
      lang: "en",
      author: "Fabio Bonacina",
      cards: [
        {
          "front": {
            "template": "text",
            "lang": "ko",
            "content": "ㅏ"
          },
          "back": {
            "template": "rawhtml",
            "lang": "en",
            "content": "<b>Romanization</b><i>a</i><br><b>English word</b>F<u>a</u>ther<br><b>IPA</b><i>/a/</i>",
            "media":[
              {
                "type": "application/ogg",
                "link": "/resources/a.mp3",
                "alternative": "https://upload.wikimedia.org/wikipedia/commons/0/0e/PR-open_front_unrounded_vowel.ogg"
              }
            ]
          },
          "quiz": [],
          "tags": ["hangul", "vowels", "tall vowel"]
        }
        ,{
          "front": {
            "template": "text",
            "lang": "ko",
            "content": "ㅣ"
          },
          "back": {
            "template": "rawhtml",
            "lang": "en",
            "content": "<i>Romanization</i>i<br><i>English word</i>S<u>ee</u><br><i>IPA</i>/i/",
            "media":[
              {
                "type": "application/ogg",
                "link": "/resources/i.mp3",
                "alternative": "https://en.wikipedia.org/wiki/File:Close_front_unrounded_vowel.ogg"
              }
            ]
          },
          "quiz": [],
          "tags": ["hangul", "vowels", "tall vowel"]
        }
      ]
    },
    {
      name: "International Phonetic Alphabet (English-based)",
      description:
        "Basic symbols of the Internation Phonetic Alphabet. Several rare IPA symbols are not included.",
      notes:
        "Initial version containing only the phonetics used for learning Korean",
      lang: "en",
      author: "Fabio Bonacina",
      cards: [
        {
          _id: 101,
          front: "front 101",
          back: "back 101",
        },
        {
          _id: 102,
          front: "front 102",
          back: "back 102",
        },
        {
          _id: 103,
          front: "front 103",
          back: "back 103",
        },
      ],
    },
  ];
  let selectedDeck = decks[0]/**/;
</script>

<Tailwind />

<main class="text-center p-4 mx-0 w-screen">
  {#if selectedDeck}
    <div class="flex flex-col w-1/2 mx-auto">
      <h1 class="text-gray-800 font-bold text-2xl my-6 text-left">
        {selectedDeck.name}
      </h1>
      <div class="flex gap-3">
        <section class="w-1/3">
          <h2 class="font-bold text-lg text-gray-700 text-left mb-4">
            Choose how to study
          </h2>
          <ul>
            <li>
              <StudyMode
                title="Flashcards"
                description="Review terms and definitions"
              >
                <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd" />
              </StudyMode>
            </li>
            <li>
              <StudyMode
                title="Learn"
                description="Focus your study using spaced repetition"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </StudyMode>
            </li>
            <li>
              <StudyMode title="Quiz" description="Take a practice test">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
              </StudyMode>
            </li>
          </ul>
        </section>
        <section class="flex-grow h-[400px]"><FlashCard card={selectedDeck.cards[0]}></FlashCard></section>
      </div>
    </div>
  {:else}
    <div class="w-7/12 mx-auto">
      <ul class="grid grid-cols-3 gap-4 auto-rows-fr">
        {#each decks as deck (deck.name)}
          <li><DeckPreview {deck} on:click={() => (selectedDeck = deck)} /></li>
        {/each}
      </ul>
    </div>
  {/if}
</main>
<ActiveBreakpointIndicator />

<style>
  :root {
    --svelte-rgb: 255, 62, 0;
  }
</style>
