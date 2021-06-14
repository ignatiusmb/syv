# Syv ![Total npm downloads](https://img.shields.io/npm/dt/syv) &middot; ![Published npm version](https://img.shields.io/npm/v/syv) ![Monthly npm downloads](https://img.shields.io/npm/dm/syv) ![License](https://img.shields.io/github/license/ignatiusmb/syv) [![Made with Svelte](https://img.shields.io/badge/made%20with-Svelte-ff3e00)](https://svelte.dev/)

> The Svelte Complementary Library, one-stop multipurpose complementary library for working with Svelte.

Focus on your ideation, let Syv handle the minutiae. Boost any Svelte projects, especially those in the early development stages.

## Usage

```bash
npm install -D syv
```

Notes:

- All classes in Namespaces are also written in `PascalCase` and can be accessed as such.
- Prop attributes with `*` means it's required to pass a value that's not nullish or empty

### Disclaimer

This starts out as (and is still is) a hobby project I'm doing to help myself in other projects. Syv does not adhere to any existing design language, any resemblance to certain design language is either inspired by or purely coincidental. The focus is mostly on functionality, go with an actual component library implementation of a certain design if you need pre-made styled components.

***

<h3 align="center"><pre>
API Documentation
</pre></h3>

***

## Namespaces

### `syv/icons`

#### Feather

| Props  | Default          |
| ------ | ---------------- |
| size   | `24`             |
| weight | `1.5`            |
| color  | `'currentColor'` |
| class  | `''`             |

All icons from [Feather Icons](https://feathericons.com/) are available as classes to use in this namespace. Declaration `.d.ts` file is included, but if you don't get the autocompletion, you can just refer to Feather's website and convert the `kebab-name` to `PascalName`.

```svelte
<script>
  import { Feather } from 'syv/icons';
</script>

<Feather.IconName />
```

### `syv/loader`

| Props | Default |
| ----- | ------- |
| -     | `-`     |

There's currently only one loader available to use, which is `Ellipsis`. More is coming soon...

```svelte
<script>
  import Loader from 'syv/loader';
</script>

<Loader.Ellipsis />
```

## Components

| Essentials | Functional      | Styled           |
| ---------- | --------------- | ---------------- |
| `Dialog`   | `LazyLoadImage` | `ButtonLink`     |
| `Image`    | `Pagination`    | `GradientBorder` |
| `Link`     | `SearchBar`     | `ProgressBar`    |
| `Modal`    | `ThemeSwitcher` | `ScrollTop`      |
| `Observer` |                 | `WeavedImage`    |
| `Overlay`  |                 |                  |

### Dialog

| Props | Default |
| ----- | ------- |
| show  | `false` |

Dialog element backdrop can be clicked by the user to close the interface, its almost exactly the same as [`Modal`](#modal) with some minor difference in functionality, see [this question on Quora](https://www.quora.com/Whats-the-difference-between-a-modal-and-dialog) for more details on why.

```svelte
<script>
  import { Dialog } from 'syv';
</script>

<Dialog show>
  <!-- Immediately shows the Dialog -->
</Dialog>
```

```svelte
<script>
  import { Dialog } from 'syv';
  let show = false;
</script>

<button on:click={() => (show = true)}>Show</button>

<!-- Use "bind:" so "show" variable here will be updated too -->
<Dialog bind:show>
  <!-- Optional: Explicitly have button to close "Dialog" inside -->
  <button on:click={() => (show = false)}>Close</button>
</Dialog>
```

### Image

| Props    | Default  |
| -------- | -------- |
| src *    | `''`     |
| alt *    | `''`     |
| contain  | `false`  |
| overlay  | `false`  |
| absolute | `false`  |
| ratio    | `9 / 16` |

Image element is created to have a fixed ratio, **not size**. It will be responsive by default and will follow its parent container size. To set a fixed size, just explicitly set the parent container size.

- `contain` - images will have property `object-fit` with the value of `cover` by default, pass this prop to set the value to `contain`

```svelte
<script>
  import { Image } from 'syv';
  const src = '//example.com/image.png';
  const alt = 'An example text for this element';
</script>

<Image {src} {alt} contain />
```

- `overlay` - Overlay element is provided and available to use if you need it, you can pass in other components when this prop is used

```svelte
<script>
  import { Image } from 'syv';
  const src = '//example.com/image.png';
  const alt = 'An example text for this element';
</script>

<Image {src} {alt} overlay>
  <p>I will appear when this Image is hovered</p>
</Image>
```

- `absolute` - set the Image container position as absolute

```svelte
<script>
  import { Image } from 'syv';
  const src = '//example.com/image.png';
  const alt = 'An example text for this element';
</script>

<div style="position: relative">
  <!-- Image is now absolute positioned in this div -->
  <Image {src} {alt} absolute />
</div>
```

- `ratio` - this receives a float to determine the ratio of your image, set to 16:9 by default

```svelte
<script>
  import { Image } from 'syv';
  const src = '//example.com/image.png';
  const alt = 'An example text for this element';
</script>

<!-- Square Image -->
<Image {src} {alt} ratio={1} />

<!-- Vertical format -->
<Image {src} {alt} ratio={4 / 3} />

<!-- Horizontal format -->
<Image {src} {alt} ratio={3 / 4} />
```

### Pagination

| Props     | Default        |
| --------- | -------------- |
| store \*  | `writable([])` |
| items \*  | `[]`           |
| bound     | `3`            |
| increment | `bound`        |
| tween     | `false`        |

Pagination element will handle all the complicated and unnecessary stuff, including all the edge cases (hopefully). We just need to pass in a store and the items. There's other props as well for further customization, but only those 2 are necessary.

- `store` - data store that will be updated from the component and can be read
- `items` - your complete list of items for the component to paginate
- `bound` - maximum number of items per page
- `increment` - number of items to skip every next/prev page
- `tween` - boolean value to use tween increments rather than jump

There's also 3 exposed slot props available to use to manually move to certain page or for styling purposes.

- `let:limit` - the maximum number of page with the current items
- `let:page` - a number to indicate the current page it is on
- `let:moveTo` - function that takes in a number between `0` and `limit`

```svelte
<script>
  export let items = []; // Your data array
  import { Pagination } from 'syv';
  import { posts as store } from './stores.js';
</script>

<Pagination {store} {items} />
<!-- or with custom buttons -->
<Pagination {store} {items} let:limit let:page let:moveTo>
  {#each { length: limit + 1 } as _, i}
    <button on:click={() => moveTo(i)} class:active={i === page}>
      {i + 1}
    </button>
  {/each}
</Pagination>

{#each $store as post}
  <div>
    <h2>{post.title}</h2>
    <p>{post.description}</p>
  </div>
{:else}
  <h2>No posts available</h2>
{/each}
```

### SearchBar

| Props   | Default |
| ------- | ------- |
| query * | `''`    |
| filters | `null`  |
| unique  | `null`  |

SearchBar element provides a searchbox and `query` to bind the value.

- `query` - prop that holds the query value from the searchbox
- `filters` - object that consists of arrays or string that holds the checked value(s) by user
- `unique` - object that consists of arrays consisting of unique values complementing filters or objects with the key as unique values and value as the displayed text

```svelte
<script>
  // Filtered object of arrays with unique values
  export let unique = {
    categories: [],
    tags: [],
    sort_by: {
      published: 'Last Published',
      updated: 'Last Updated'
    }
  };
  import { SearchBar } from 'syv';
  let filters = { categories: [], tags: [], sort_by: 'updated', custom: 'hello' };
  let query;
</script>

<!-- Only searchbox -->
<SearchBar bind:query />

<!-- With filters -->
<SearchBar bind:query bind:filters {unique} />

<!-- With filters using slot -->
<SearchBar bind:query bind:filters {unique}>
  <section>
    <h3>Satisfaction</h3>
    <label>
      <input type="radio" bind:group={filters.custom} value="satisfied" />
      <span>Satisfied</span>
    </label>
    <label>
      <input type="radio" bind:group={filters.custom} value="mediocre" />
      <span>Mediocre</span>
    </label>
  </section>
</SearchBar>
```

***

<h3 align="center"><pre>
Syv | <a href="LICENSE">MIT License</a>
</pre></h3>

***

<h5 align="center"><pre>
Copyright &copy; 2020 - 2021 <a href="https://mauss.dev">Ignatius Bagussuputra</a>
</pre></h5>
