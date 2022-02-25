# Syv ![Total npm downloads](https://img.shields.io/npm/dt/syv) &middot; ![Published npm version](https://img.shields.io/npm/v/syv) ![Monthly npm downloads](https://img.shields.io/npm/dm/syv) ![License](https://img.shields.io/github/license/ignatiusmb/syv) [![Made with Svelte](https://img.shields.io/badge/made%20with-Svelte-ff3e00)](https://svelte.dev/)

> The Svelte Complementary Library, a multipurpose library for working with Svelte.

Relieve the initial heavy-lifting and focus on your ideation. These are some of the advantages of using Syv

- Provides most of the essential components that are usually rewritten in a new project
  - Need to lazy-load a component? `import { LazyLoad } from 'syv';`
  - Need to see if an element is in view? `import { Observe } from 'syv';`
- Prepackaged customizable set of icons from various sources, import from `syv/icons`
- Built-in loaders that are ready-to-use anywhere transitions are needed, import from `syv/loader`
- Imports are modularized into their own namespaces and provides intuitive API for a nice usage with Svelte
- All modules works for both client-side and server-side, no need to short-circuit or guard your code with `if (browser)`

--- **Previously `svelement`**, last published [v0.0.13](https://github.com/ignatiusmb/syv/tree/9c0f59cb811bdbeb9d5eee5544142119307bb4bd) (click to browse files in tree) ---

## Usage

```bash
npm install -D syv
```

Notes:

- All components are written in `PascalCase` and can be accessed as such, including icons.
- Prop attributes with `*` means it's required to pass a value that's not nullish or empty
- You might need to add `vite: { ssr: { noExternal: ['mauss'] } }` to `svelte.config.js` when working with SvelteKit

### Disclaimer

This starts out as (and is still is) a hobby project I'm doing to help myself in other projects. Syv does not adhere to any existing design language, any resemblance to certain design language is either inspired by or purely coincidental. The focus is mostly on functionality, so go with an actual component library implementation of a certain design if you need pre-made styled components.

***

<h3 align="center"><pre>API Documentation</pre></h3>

***

## Modules

### `syv/icons`

#### Feather

| Props  | Default          |
| ------ | ---------------- |
| size   | `24`             |
| weight | `1.5`            |
| color  | `'currentColor'` |
| class  | `''`             |

All icons from [Feather Icons](https://feathericons.com/) are available as classes to use in this namespace. Declaration `.d.ts` files are included as well, but if you don't get the autocompletion, you can just refer to Feather's website and convert the `kebab-name` to `PascalName`.

```svelte
<script>
  import { Feather } from 'syv/icons';
  // or import each icons individually
  // import { IconName } from 'syv/icons/feather';
</script>

<Feather.IconName />
<!-- <IconName weight="2" /> -->
```

### `syv/loader`

| Props | Default |
| ----- | ------- |
| -     | `-`     |

There's currently only one loader available to use, which is `Ellipsis`. More is coming soon...

```svelte
<script>
  import Loader from 'syv/loader';
  // or import each loader individually
  // import { Ellipsis } from 'syv/loader';
</script>

<Loader.Ellipsis />
<!-- <Ellipsis /> -->
```

### `syv/store`

#### Browser

```svelte
<script>
  import { browser } from 'syv/store';
  const { viewport } = browser;
  // or import directly without destructuring
  // import { viewport } from 'syv/store/browser';
</script>

{#if $viewport.sm}
  <!-- Stuff for devices wider than 640px -->
{:else if $viewport.xl}
  <!-- Stuff for devices wider than 1280px -->
{/if}
```

## Components

| Type       | Components                                                                     |
| ---------- | ------------------------------------------------------------------------------ |
| Essentials | `Dialog`, `Image`, `LazyLoad`, `Link`, `Modal`, `Observer`, `Overlay`, `Video` |
| Functional | `Pagination`, `SearchBar`, `ThemeSwitcher`                                     |
| Styled     | `ButtonLink`, `GradientBorder`, `ProgressBar`, `ScrollTop`, `WeavedImage`      |

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

| Props      | Default  |
| ---------- | -------- |
| src \*     | `''`     |
| alt \*     | `''`     |
| ratio      | `9 / 16` |
| lazy       | `false`  |
| contain    | `false`  |
| overlay    | `false`  |
| absolute   | `false`  |
| transition | `{}`     |

Image element is created to have a fixed ratio, **not size**. It will be responsive by default and will follow its parent container size. To set a fixed size, just explicitly set the parent container size.

```svelte
<script>
  import { Image } from 'syv';
  const src = '//example.com/image.png';
  const alt = 'An example text for this element';
</script>

<Image {src} {alt}  />
```

- `ratio` - this receives a float to determine the ratio of your image, set to 16:9 by default

```svelte
<!-- Square Image -->
<Image {src} {alt} ratio={1} />

<!-- Vertical format -->
<Image {src} {alt} ratio={4 / 3} />

<!-- Horizontal format -->
<Image {src} {alt} ratio={3 / 4} />
```

- `lazy` - lazy load image when it's sighted in viewport

```svelte
<Image {src} {alt} lazy>
  <p>I will appear when this Image is hovered</p>
</Image>
```

- `contain` - images will have property `object-fit` with the value of `cover` by default, pass this prop to set the value to `contain`

```svelte
<Image {src} {alt} contain />
```

- `overlay` - Overlay element is provided and available to use if you need it, you can pass in other components when this prop is used

```svelte
<Image {src} {alt} overlay>
  <p>I will appear when this Image is hovered</p>
</Image>
```

- `absolute` - set the Image container position as absolute

```svelte
<div style="position: relative">
  <!-- Image is now absolute positioned in this div -->
  <Image {src} {alt} absolute />
</div>
```

### LazyLoad

| Props    | Default     |
| -------- | ----------- |
| files \* | `undefined` |
| when     | `true`      |

Lazily loads a component defined from the callback passed to `file`.

```svelte
<script>
  import { LazyLoad } from 'syv';
  let show = false;
</script>

<LazyLoad when={show} files={[() => import('../components/Modal.svelte')]} let:loaded={[Modal]}>
  <Modal bind:show other modal props />
</LazyLoad>
```

- `when` - the only prop with a default value of `true`, the component will load immediately when this is not used

```svelte
<!-- no when prop, indicating LazyLoad to load '../icons/Burger.svelte' immediately  -->
<LazyLoad files={[() => import('../icons/Burger.svelte')]} let:loaded>
  <svelte:component this={loaded[0]} />
</LazyLoad>
```

Multiple imports simultaneously

```svelte
<LazyLoad
  when={show}
  files={[
    () => import('$lib/components/Modal.svelte'),
    () => import('$lib/components/Video.svelte'),
    () => import('$lib/components/Button.svelte'),
    () => import('$lib/icons/Share.svelte'),
  ]}
  let:loaded={[Modal, Video, Button, ShareIcon]}
>
  <Modal bind:show>
    <Video src="/assets/demo.mp4" />
    <Button on:click={() => navigator.share()}>
      <ShareIcon />
    </Button>
  </Modal>
</LazyLoad>
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
- `let:jump` - function that takes in a number between `0` and `limit`

```svelte
<script>
  export let items = []; // Your data array
  import { Pagination } from 'syv';
  import { posts as store } from './stores.js';
</script>

<Pagination {store} {items} />
<!-- or with custom buttons -->
<Pagination {store} {items} let:limit let:page let:jump>
  {#each { length: limit + 1 } as _, i}
    <button on:click={() => jump(i)} class:active={i === page}>
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

| Props       | Default                                         |
| ----------- | ----------------------------------------------- |
| query \*    | `''`                                            |
| placeholder | `'Type your queries here (Press "/" to focus)'` |
| items       | `[]`                                            |
| icon        | `false`                                         |
| size        | `'24'`                                          |
| filters     | `false`                                         |
| unique      | `undefined`                                     |

SearchBar element provides a searchbox and `query` to bind the value.

- `query` - prop that holds the query value from the searchbox
- `placeholder` - string placeholder passed to input attribute
- `items` - array of items to be searched and shown in autocompletion box
- `icon` - can be `true` to use built-in icon, `string` to use as `src` in `<img>`, or a callback function that imports a svelte component
- `size` - icon size to be passed to Search and Filter icons
- `filters` - object that consists of arrays or string that holds the checked value(s) by user
- `unique` - object that consists of arrays consisting of unique values complementing filters or objects with the key as unique values and value as the displayed text

```svelte
<script>
  import { SearchBar } from 'syv';

  // Filtered object of arrays with unique values
  let unique = {
    categories: [],
    tags: [],
    sort_by: {
      published: 'Last Published',
      updated: 'Last Updated'
    }
  };

  let filters = {
    categories: [],
    tags: [],
    sort_by: 'updated',
    custom: 'hello'
  };

  let query;
</script>

<!-- Only searchbox with icon -->
<SearchBar bind:query icon />

<!-- With filters and custom icon -->
<SearchBar
  bind:query
  bind:filters
  icon={() => import('../icons/CustomIcon.svelte')}
  {unique}
/>

<!-- With filters using slot and string icon -->
<SearchBar
  bind:query
  bind:filters
  icon="/assets/custom-icon.svg"
  {unique}
>
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

<h3 align="center"><pre>Syv | <a href="LICENSE">MIT License</a></pre></h3>

***

<h5 align="center"><pre>Copyright &copy; 2020 - 2022 <a href="https://mauss.dev">Ignatius Bagussuputra</a></pre></h5>
