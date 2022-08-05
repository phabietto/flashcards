<script lang="ts">
  import Button from "./components/button/Button.svelte";
  import DeckPreview from "./components/cards/DeckPreview.svelte";
  import StudyMode from "./components/cards/StudyMode.svelte";
  import DeckControls from "./components/controls/DeckControls.svelte";
  import ActiveBreakpointIndicator from "./components/debug/ActiveBreakpointIndicator.svelte";
  import Tailwind from "./Tailwind.svelte";


  let decks = [
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

  function loadDeck() {
    fetch(deckPath)
      .then(response => response.json())
      .then(data => {
        decks = [data, ...decks];
      })
      .catch(e => console.log(e));
  }

  function handleHome() {
    selectedDeck = null;
  }

  // let selectedDeck = decks[0]/**/;
  let selectedDeck = null;
  let deckPath = '';
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
        <DeckControls deck={selectedDeck} on:deck-controls::home={handleHome}/>
      </div>
    </div>
  {:else}
    <div class="w-7/12 mx-auto">
      <div class="flex min-w-full flex-grow my-4">
        <div class="bg-gray-100 text-gray-600 inline-flex items-center w-1/3 mr-4 p-2 rounded-lg">
          <input type="text" placeholder="path" class="bg-transparent outline-none text-base px-1 min-w-full" bind:value={deckPath}>
        </div>
        <Button text="Load level" iconLeft={false} primary fill="fill-transparent" stroke="stroke-current" on:click={loadDeck}>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </Button>
      </div>
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
