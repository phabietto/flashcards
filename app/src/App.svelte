<script lang="ts">
  import Button from "./components/button/Button.svelte";
  import DeckPreview from "./components/cards/DeckPreview.svelte";
  import DeckControls from "./components/controls/DeckControls.svelte";
  import StudyMethods from "./components/controls/StudyMethods.svelte";
  import ActiveBreakpointIndicator from "./components/debug/ActiveBreakpointIndicator.svelte";
import Deck from "./components/deck/Deck.svelte";
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
    <Deck deck={selectedDeck} on:deck-controls::home={handleHome}/>
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
