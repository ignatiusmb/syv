# Syv Icons

```js
import { ... } from 'syv/icons';
```

## Feather

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

### Credits

| About      | Feather Icons                                                       |
| ---------- | ------------------------------------------------------------------- |
| Repository | GitHub <<https://github.com/feathericons/feather>>                  |
| Author     | Cole Bemis <<https://github.com/colebemis>>                         |
| License    | MIT <<https://github.com/feathericons/feather/blob/master/LICENSE>> |
