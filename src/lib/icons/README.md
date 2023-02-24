# Syv Icons

```svelte
<script>
  import System from 'syv/icons/{System}.svelte';
</script>

<System icon={import('syv/icons/{system}/...')}>
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

All icons from [Feather Icons](https://feathericons.com/) are available under the `syv/icons/feather` module.

```svelte
<script>
  import Feather from 'syv/icons/Feather.svelte';
</script>

<Feather icon={import('syv/icons/feather/...')}>
```

### Credits

| About      | Feather Icons                                                       |
| ---------- | ------------------------------------------------------------------- |
| Repository | GitHub <<https://github.com/feathericons/feather>>                  |
| Author     | Cole Bemis <<https://github.com/colebemis>>                         |
| License    | MIT <<https://github.com/feathericons/feather/blob/master/LICENSE>> |

## Fluent

| Props   | Default       |
| ------- | ------------- |
| icon \* | `import(...)` |
| label   | `''`          |
| flip    | `undefined`   |

All icons from [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) are available under the `syv/icons/fluent` module.

```svelte
<script>
  import Fluent from 'syv/icons/Fluent.svelte';
</script>

<Fluent icon={import('syv/icons/fluent/...')}>
```

### Credits

| About      | Fluent UI System Icons                                                       |
| ---------- | ---------------------------------------------------------------------------- |
| Repository | GitHub <<https://github.com/microsoft/fluentui-system-icons>>                |
| Author     | Microsoft <<https://github.com/microsoft>>                                   |
| License    | MIT <<https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE>> |
