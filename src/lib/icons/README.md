# syv/icons

```svelte
<script>
  import * as system from 'syv/icons/system';
  import System from 'syv/icons/{System}.svelte';
</script>

<System icon={system.IconName}>
```

## Feather.svelte

| Props   | Default                           |
| ------- | --------------------------------- |
| icon \* | `import from 'syv/icons/feather'` |
| label   | `''`                              |
| scale   | `1.5`                             |
| girth   | `1.5`                             |
| flip    | `undefined`                       |
| style   | `''`                              |

All icons from [Feather Icons](https://feathericons.com/) are available under the `syv/icons/feather` module.

```svelte
<script>
  import * as feather from 'syv/icons/feather';
  import Feather from 'syv/icons/Feather.svelte';
</script>

<Feather icon={feather.IconName}>
```

### Credits

| About      | Feather Icons                                                       |
| ---------- | ------------------------------------------------------------------- |
| Repository | GitHub <<https://github.com/feathericons/feather>>                  |
| Author     | Cole Bemis <<https://github.com/colebemis>>                         |
| License    | MIT <<https://github.com/feathericons/feather/blob/master/LICENSE>> |

## Fluent.svelte

| Props   | Default                          |
| ------- | -------------------------------- |
| icon \* | `import from 'syv/icons/fluent'` |
| label   | `''`                             |
| flip    | `undefined`                      |

All icons from [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) are available under the `syv/icons/fluent` module.

```svelte
<script>
  import * as fluent from 'syv/icons/fluent';
  import Fluent from 'syv/icons/Fluent.svelte';
</script>

<Fluent icon={feather.IconName}>
```

### Credits

| About      | Fluent UI System Icons                                                       |
| ---------- | ---------------------------------------------------------------------------- |
| Repository | GitHub <<https://github.com/microsoft/fluentui-system-icons>>                |
| Author     | Microsoft <<https://github.com/microsoft>>                                   |
| License    | MIT <<https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE>> |
