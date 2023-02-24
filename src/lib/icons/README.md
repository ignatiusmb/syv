# Syv Icons

```svelte
<script>
  import System from '@syv/icons/{System}.svelte';
</script>

<System icon={import('@syv/icons/{system}/...')}>
```

## Feather

| Props   | Default       |
| ------- | ------------- |
| icon \* | `import(...)` |
| label   | `''`          |
| scale   | `1.5`         |
| girth   | `1.5`         |
| flip    | `undefined`   |
| style   | `''`          |

All icons from [Feather Icons](https://feathericons.com/) are available under the `@syv/icons/feather` module.

```svelte
<script>
  import Feather from '@syv/icons/Feather.svelte';
</script>

<Feather icon={import('@syv/icons/feather/...')}>
```

### Credits

| About      | Feather Icons                                                       |
| ---------- | ------------------------------------------------------------------- |
| Repository | GitHub <<https://github.com/feathericons/feather>>                  |
| Author     | Cole Bemis <<https://github.com/colebemis>>                         |
| License    | MIT <<https://github.com/feathericons/feather/blob/master/LICENSE>> |
