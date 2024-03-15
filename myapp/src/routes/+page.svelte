<script>
  import { onMount } from "svelte";
  import axios from "axios";

  let languages = [];
  let errorMessage = "";
  let selected = "C++";
  let code = "";
  let output = "";
  let input ="";

  async function fetchLanguages() {
    try {
      const response = await axios.get("http://localhost:3000/languages", {
        headers: {
          "X-RapidAPI-Key":
            "95a67c64aemsh8590f0db2679eb6p12fa0cjsn3f0edad2fc7c",
          "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
        },
      });
      languages = response.data;
      console.log(languages)
    } catch (error) {
      console.error(error);
      errorMessage = "Failed to fetch languages";
    }
  }

  onMount(fetchLanguages);

  async function executeCode() {
    try {
      console.log(selected)
      const response = await axios.post( "http://localhost:3000/execute",
        {
          language: "C++",
          code,
          input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "95a67c64aemsh8590f0db2679eb6p12fa0cjsn3f0edad2fc7c",
            "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
          },
        }
      );

      output =response.data.output;
    } catch (error) {
      console.error(error);
      errorMessage = "Failed to execute code";
    }
  }
</script>

<main>
  <h1>Code Execution</h1>


  <select bind:value={selected}>
    {#each languages as language} <option value={language.code}>{language.name}</option>{/each}
  </select>

  <textarea bind:value={code} placeholder="Enter your code" id="codeEditor"
  ></textarea>

  <button on:click={executeCode} id="executeButton">Execute Code</button>

  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {:else}
    <div id="outputDisplay">{output}</div>
  {/if}
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  #languagesDropdown {
    margin-bottom: 10px;
  }

  #codeEditor {
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
    padding: 10px;
    font-family: monospace;
  }

  #executeButton {
    display: block;
    margin: 10px 0;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  #outputDisplay {
    margin-top: 20px;
  }
</style>
