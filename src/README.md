# Vue3 + TypeScript 基础开发规范

在线阅读：[Vue3 + TypeScript 基础开发规范](https://kirigaya.cn/blog/article?seq=215)


## 使用组合式函数

使用 [组合式API](https://cn.vuejs.org/guide/extras/composition-api-faq.html) 而不要使用 vue2 选项式 API，即便 vue3 支持这么做。

### 变量与函数

vue3 不再区分 methods 和 data，全部都是 ref 和 reactive 代理对象。 setup scope 内，reactive 对象直接进行 get 和 set；ref 对象需要通过 `.value` 的方式索引原本的值进行 get 和 set。

```html
<script setup lang="ts">
import { reactive, ref} from 'vue';

// vue3 不再区分 methods 和 data，全部都是 ref 和 reactive 代理对象
const showDialog = ref(false);

const dialog = reactive({
    name: 'dialog',
    show: true
});
</script>
```

### props 与 emits

props 和 emits 是开发组件必备的两个特性。 vue2 中通过 选项式的 props 和 emits 配置组件的参数和参数的 setter。 vue3 中则更加贴近普通编程语言的开发习惯，直接使用 `defineProps, defineEmits` 定义和返回 props 和 emits。

```html
<script setup lang="ts">
import { defineEmits } from 'vue';

// 相当于 vue2 中的 props 定义
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        default: 16
    }
});

// 相当于 vue2 中的 emits 定义
const emits = defineEmits(['update:modelValue']);
</script>
```

### 计算样式 computed

vue2 中的计算样式通过选项式的 computed，vue3 中直接通过 `computed` 构造对应的对象。

```html
<script setup lang="ts">
import { computed } from 'vue';

...

// 相当于 vue2 的 computed
// 可以直接返回一个数值
const finalShowDialog = computed(() => showDialog.value && dialog.show);

// 也可以设置 getter setter
const modelValue = computed({
    get: () => props.modelValue,
    set: v => emits('update:modelValue', v)
});
</script>
```

### 生命周期钩子

```html
<script setup lang="ts">
import { onMounted } from 'vue';
import { reqLogin } from '@/api';

// 相当于 vue2 的 mounted
onMounted(async () => {
    const res = await reqLogin();
    // ...
})

// 其他生命周期钩子可以通过 on + 名字的方式使用
</script>
```

### 操作插槽 slots

在 vue3 中，一个组件对它的 slots 进行操作在一些复杂领域是一个很常用的方式：

```html
<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
// 获取默认插槽
const defaultSlot = slots.default();
// 获取名字为 name 的具名插槽
const nameSlot = slots.name();

</script>
```

很可惜，typescript 的官方垫片对于 slots 的支持还有限，可以看一下 useSlots 返回值类型 `SetupContext['slots']` 的源码:

```typescript
export type SetupContext<E = EmitsOptions, S extends SlotsType = {}> = E extends any ? {
    attrs: Data;
    slots: UnwrapSlotsType<S>;
    emit: EmitFn<E>;
    expose: (exposed?: Record<string, any>) => void;
} : never;
```

也就是说，我们在 ts 中的 `useSlots()` 获取到的 slots 对象的 type 其实是一个不完全的 `UnwrapSlotsType<{}>`。因此，使用插槽不能像上面的那样使用，需要判断一下属性是否存在：

```html
<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
// 获取默认插槽
const defaultSlot = slots.default && slots.default();
// 获取名字为 name 的具名插槽
const nameSlot = slots.name && slots.name();

</script>
```

此时得到的 `defaultSlot` 就是如下的类型：

```typescript
VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>[] | undefined
```

---

### 使用 computed 构建动态 style 而不是 通过 :style="" 的方式

不要通过如下的方式设置一个动态样式：

```html
<template>
    <span :style="`font-size:${artFont.size}px`">
        hello world
    </span>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const artFont = reactive({
    size: 16    
});
</script>
```

这么做虽然方便，但是在后期维护会形成灾难。使用 `computed` + 对象字面量的返回值形式可以更加优雅地构造动态响应式的样式。

```html
<template>
    <span :style="artFontStyle">
        hello world
    </span>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';

const artFont = reactive({
    size: 16    
});

const artFontStyle = computed(() => ({
    // 基础命名规则
    // font-size => fontSize
    // background-color => backgroundColor
    // 值必须是字符串
    fontSize: artFont + 'px',
    // ... 其他属性
}));

</script>
```

---

## 使用 ref 而不是 id 来捕获 html 元素

### 静态 ref 赋值

native html 通过 id 和 `getElementById` 获取元素，而在 vue3 中尽量通过 ref 获取，这样效率更高，也能提高代码的可读性：

```html
<template>
    <!-- 此处的 spanEl 必须和 下面的 const spanEl = ref(null) 同名 -->
    <span ref="spanEl">hello world</span>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 通过 null 赋值
const spanEl = ref(null);
</script>
```

这个过程必须在 setup 阶段执行，setup完成后， `spanEl.value` 就等价于 `getElementById` 的返回值，即 `spanEl.value` 是一个 `HTMLElement`.

### 动态 ref 赋值

但是需要注意，静态 ref 赋值会出现重复的情况，ref 会最终被解释为 id。为了避免命名重复的情况，生产过程中建议使用动态 ref 赋值，除非你能确定这个 vue 是单例的。

```html
<template>
    <span :ref="el => elementManage.span = el;">hello world</span>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

// 通过 null 赋值
const elementManage = reactive({
    span: undefined
})
</script>
```

这么做更加灵活，你甚至可以在 `v-for` 内直接获取所有子元素的 element 并扔到一个数组内以供后续使用，完全不需要担心 id 或者 ref 重名的现象。

因为 ref 只发生在 setup 阶段，所以如果目标元素有 `v-if` 标签，则会因为 setup 阶段不挂载而让 ref 失效，这种情况请使用 id 或者在 v-if 的父元素上使用 ref。

---

## 善用 垫片文件 .d.ts

对于大型 vue3 + typescript 项目，建议在 `@/src` 下创建一个 `types` 文件夹，在里面罗列上高复用的类型。

### 一阶类型体操

请务必设计成可以进行一阶类型体操的类型，这样可以最大限度提升代码的灵活性，比如对于下面这个描述登录接口数据的接口：

```typescript
export declare type SignInForm = {
    emailAddress: string;
    password: string;
}
```

可以改进为：

```typescript
export declare type EmailAddress = { emailAddress: string };
export declare type Password = { password: string };

export declare type SignInForm = EmailAddress & Password;
```

当然，这么做未必一定是好的，抽象的增加会提高代码的灵活度，但是也会降低代码的可读性，增加团队协作的难度，应用时一定要具体情况具体分析。

### import 垫片文件

引入垫片文件请务必使用如下的样式：

```typescript
import type { FloatWindowProps } from '@/types';
```

这样做的好处是不会造成循环引用，在一些复杂的、前期设计不佳的项目中，循环 import 是一件不算罕见的事情。

---

### CSS 的全局变量

对于常用的 CSS 变量，比如主题颜色，字体，渐变动画参数，请务必在 `@/assets/css` 中的 `:root` 中正确声明。

```css
:root {
    --main-color: rgb(16, 16, 16);
    --base-font: "NerdFontMono";
    --animation-7s: .7s cubic-bezier(0.23, 1, 0.32, 1);
    --animation-5s: .5s cubic-bezier(0.23, 1, 0.32, 1);
    --animation-3s: .35s cubic-bezier(0.23, 1, 0.32, 1);
    --gray-box-shadow-0: 0 0 8px 3px rgba(182, 181, 182, 0.9);
}

@font-face {
    font-family: "NerdFontMono";
    src: url("../fonts/RobotoSlab-Regular.ttf");
}
```


CSS 的参数化是非常重要的一件事，请务必在项目开发伊始好好规划。

---

## 代码规范

### 命名

变量名统一采用 camelCase 命名法：

```typescript
const userName = '锦恢';
const userPrivilege = 3;
const updateUserTimer = setTimeout(async () => {
    const axiosRes = await reqLookUpPrivilege({ userName, userPrivilege });
    const res = axiosRes.data;
    // ...
}, 300);
```

class, type, interface 统统采用 PascalCase 命名法：

```typescript
interface UserLogin {
    // ...
}

type UserKey = string;

class WaveRender {
    // ...
}
```

文件名，vue组件名，CSS 类名统统采用 kebab-case 命名法：

```typescript
// 文件名采用 kebab-case 命名法，import 得到的变量使用 camelCase
import floatWindow from '@/components/float-window.vue';

// vue组件名 采用 kebab-case 命名法
defineComponent({ name: 'sign-in' });
```

```css
/* css 类名 采用 kebab-case 命名法 */
.medical-dataset-container {
    display: flex;
    align-item: center;
    transition: var(--animation-3s);
}
```


### import 书写顺序

类似于 google python 规范，在 ts 代码中，`import` 语句请放在文件的开头（vue 中则放在 script 的开头），并按照如下的规则进行排列：

```typescript
// type
import type * as UserApi from '@/api/user';

// vue 相关库
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";

// 第三方库
import * as live2d from 'live2d-render';
import * as echarts from "echarts";
import { ElLoading } from 'element-plus';

// 自己写的函数库
import { showInfoWindow, KLoading } from "@/hook/window";
import { hello } from '@/hook/greet';

// 自己写的组件库
import NavigationBar from '@/components/NavigationBar';
import KTabs from "@/components/Writing/KTabs.vue";
import KPane from "@/components/Writing/KPane.vue";
```

### vue 文件长度

单个 vue 的 template 部分（不需要考虑 CSS）不要太长，如果 template 部分非常长（超过300行），考虑是否需要进行二级拆分。请不要担心拆分是否会对数据通信造成额外负担， vue3 提供的 inject 和 provide 很好得解决了这个问题。

