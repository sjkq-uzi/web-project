## 组件间通信

### defineExpose

```
<template>
  <!-- 给子组件添加 ref 属性 -->
  <ChildComponent ref="childRef" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ChildComponent from './ChildComponent.vue'

// 创建一个 ref 来引用子组件
const childRef = ref(null)

onMounted(() => {
  // 确保子组件已挂载后，可以通过 childRef.value 访问子组件实例
  console.log(childRef.value.count) // 子组件的 count 属性
  childRef.value.increment() // 调用子组件的 increment 方法
})
</script>
```

### mitt

在 Vue 3 的上下文中，mitt 是一个非常小巧的、函数式的事件发射器（Event Emitter）/事件监听器（Event Listener）库，它可以用来在不同的组件或者模块之间进行通信。mitt 并不是 Vue 官方的一部分，但它经常被用在 Vue 应用程序中，特别是当你需要一个简单的跨组件通信解决方案时。

mitt 的主要优点是它非常小（压缩后大约200字节），并且没有依赖，这使得它成为轻量级应用的一个理想选择。它的 API 非常简单，有 on、off 和 emit 三个主要的函数，分别用于监听事件、取消监听事件和触发事件

类似vue2的全局事件总栈 $bus

### Joi

在expressJoi验证用户名和密码输入格式时，增加joi错误处理的中间件，并且在接口请求时将验证的错误传递给中间件处理

```javascript
router.post("/register", (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    // 验证失败时，抛出错误给中间件
    return next(error);
  }
  loginHandler.register(req, res, next);
});
```

```javascript
//对不符合joi规则的情况进行报错提醒
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    console.log(err);
    return res.cc(err);
  }
});
```

### exports和module.exports的区别

在 Node.js 中，module.exports 和 exports 都用于导出模块中的内容，以便其他模块可以使用 require 函数来引入和使用。尽管它们通常可以互换使用，但它们之间有一些关键的区别和细微之处。

1. **module.exports 是真正的特殊对象，它被返回给引入模块的 require 调用。**
2. **exports 是对 module.exports 的引用，它被 Node.js 预定义为 module.exports 的一个空对象 {}。**
   
   **这意味着你可以使用 exports 添加属性或方法，这些添加的属性或方法会反映到 module.exports 上**

<br/>

```javascript
// file: myModule.js
exports.myFunction = function() {
  console.log('Hello from myFunction');
};
```

等同于

```javascript
// file: myModule.js
module.exports.myFunction = function() {
  console.log('Hello from myFunction');
};
```

**然而，由于 exports 只是 module.exports 的一个引用，如果你直接分配一个新值给 exports，这将不会影响 module.exports，并且 require 调用不会返回你期望的值。例如：**

```javascript
// file: myModule.js
exports = function() {
  console.log('Hello from myFunction');
};

// file: anotherModule.js
const myModule = require('./myModule');
myModule(); // TypeError: myModule is not a function
```

**在上面的代码中，exports 被分配了一个新的函数，但这并没有改变 module.exports 的值。因此，当其他模块尝试引入 myModule.js 时，它们得到的是初始的 module.exports 对象，而不是新分配的函数。**

**正确的方式是直接将函数分配给 module.exports：**

```javascript
// file: myModule.js
module.exports = function() {
  console.log('Hello from myFunction');
};

// file: anotherModule.js
const myModule = require('./myModule');
myModule(); // 正常工作: 输出 "Hello from myFunction"
```

**这样，你就重写了 module.exports 对象，使其成为一个函数。当其他模块引入 myModule.js 时，它们就能得到这个函数并像预期的那样调用它。**

**总结一下：**

- **使用 exports 时，你只能给它添加属性或方法。**
- **使用 module.exports 时，你可以导出任何 JavaScript 有效的类型（例如对象、函数、字符串等）。**
- **如果你需要导出单个值或者一个完全不同的对象，你应该使用 module.exports。**
- **如果你只是想在导出对象上附加属性或方法，那么 exports 就足够了。**

### express-jwt 验证请求token

**在用户登录之后会生成token，一般token开头为Bearer+空格，在登陆之后请求关于用户的接口就需要token验证**

```javascript
    //设置token的过期时间
 const tokenStr = jwt.sign(user, jwtconfig.jwtSecretKey, {
      expiresIn: "7h"
    });
    //将token返回给前端
    res.send({
      code: 201,
      results: results[0],
      status: 0,
      message: "登录成功",
      token: "Bearer " + tokenStr,
    });
```

```javascript
app.use(
  jwt({
    secret: jwtconfig.jwtSecretKey,
    algorithms: ["HS256"],
  }).unless({
    // 除了这个接口，其他都需要验证
    // 这里的接口是登录接口，token是在登陆之后才生成的，不需要验证
    path: [/^\/api\//],
  })
);
```

### 设备报错处理的中间件

```javascript
//设置跟报错中间件。挂载cc方法
app.use((req, res, next) => {
  //status=0为成功，=1为失败，默认是1，方便处理失败的情况
  res.cc = (err, status = 1) => {
    res.send({
      status,
      //判断err是否为错误对象
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});
```

**一定要做好处理，不然会发现你写的接口在被请求时没有任何反应。。。。。一脸懵逼**

## nodemon 

**在 Node.js 开发中，nodemon 是一个非常流行的实用工具，它用于帮助开发者自动化开发流程。nodemon 是一个命令行界面（CLI）工具，它监视你的 Node.js 应用程序中的文件变化。一旦你保存了一个文件，nodemon 将自动重启你的 Node.js 应用程序。这样，你就不需要在每次做出更改后手动停止和重新启动服务器了。**

## Multer

**Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。本项目用来上传头像**

## 编译时问题

1. **在vite.config中配置路径别名时，当编译器不识别时，需要在 jsconfig.json（对于 JavaScript 项目）或 tsconfig.json（对于 TypeScript 项目）中也设置相应的别名：**

```json
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
```

```json
// jsconfig.json 或 tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  // 其他配置...
}
```

## defineExpose（父子组件通信）

**在 Vue 3 中，defineExpose 是一个特殊的编译时宏，用于在使用 script setup 语法时明确地暴露组件的属性、方法或其他响应式状态给其父组件。当你使用 script setup 时，默认情况下，组件的所有内容都是内部的，不会暴露给父组件。如果你想让父组件能够访问子组件的某些属性或方法，你可以使用 defineExpose 来实现。**

```javascript
<script setup>
import { ref } from 'vue'

// 响应式状态
const count = ref(0)

// 方法
function increment() {
  count.value++
}

// 使用 defineExpose 暴露状态和方法
defineExpose({
  count,
  increment
})
</script>

```

**在上面的例子中，我们创建了一个响应式的 count 变量和一个 increment 方法。通过 defineExpose，我们将它们暴露给了父组件。**

**在父组件中，你可以使用 ref 或者 component ref="myComponent" 来获取对子组件的引用，然后通过这个引用访问被暴露的属性和方法：**

```javascript
<template>
  <ChildComponent ref="child" />
  <button @click="child.increment()">Increment Child Counter</button>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const child = ref(null)
//通过ref直接调用子组件暴露的方法，记得要+.value
child.value.increment()
</script>
```

**在这个父组件的例子中，我们通过模板引用 ref="child" 来获取子组件的实例，并且在按钮的点击事件中调用了子组件暴露出来的 increment 方法。**

**注意：defineExpose 只能在 script setup 语法中使用，并且它是一个编译时的宏，这意味着它不是一个真正的函数，而是在 Vue 的编译过程中被处理的。因此，你不能在普通的 script 块中或者在 script setup 块之外使用它。**

## pinia-persistedstate-plugin

**pinia-persistedstate-plugin 是一个针对 Vue.js 应用程序状态管理库 Pinia 的插件，它的作用是将 Pinia 状态存储在浏览器的本地存储中，例如 localStorage 或 sessionStorage，从而使得状态在页面刷新后能够保持。这是为了在用户关闭浏览器标签或浏览器后再次打开时，能够恢复之前的应用状态，提供更好的用户体验。**

**使用这个插件，你可以轻松地在 Pinia store 中配置持久化的状态，而不需要手动编写将状态保存到本地存储和从本地存储中恢复状态的代码。**

## pinia

**在使用pinia时 可能会遇见⚠ Error(TS2339) | 类型“Store<"userInfo", {} | _UnwrapAll>, {} | Pick, {} | Pick>”上不存在属性“imageUrl”但是能正常读取该属性，可以用第二种配置方式即可解决。**大概是ts类型检测导致出现问题

```javascript
export const useUserInfo = defineStore(
  "userInfo",
  {
    state: () => {
      return {
        imageUrl: "",
        name: "",
        gender: "",
        department: "",
        email: "",
        identity: "",
        account: "",
      };
    },
    actions: {
      async userInfo(id) {
        const res = await getUserInfo(id);
        console.log("res=", res);
        this.imageUrl = res.data.image_url;
        this.name = res.data.name;
        this.gender = res.data.sex;
        this.department = res.data.department;
        this.email = res.data.email;
        this.identity = res.data.identity;
        this.account = res.data.account;
      },
    },
  },
  {
    //配置数据持久化
    persist: {
      enabled: true, // 是否开启数据缓存
      key: "userInfo", // 缓存数据的唯一标识
      storage: localStorage,
    },
  }
);
```

```javascript
export const useUserInfo = defineStore(
  "userInfo",
  () => {
    let imageUrl = ref("");
    let name = ref("");
    let gender = ref("");
    let department = ref("");
    let email = ref("");
    let identity = ref("");
    let account = ref("");

    async function userInfo(id) {
      const res = await getUserInfo(id);
      console.log("res=", res);
      imageUrl.value = res.data.image_url;
      name.value = res.data.name;
      gender.value = res.data.sex;
      department.value = res.data.department;
      email.value = res.data.email;
      identity.value = res.data.identity;
      account.value = res.data.account;
    }
    return {
      imageUrl,
      name,
      gender,
      department,
      email,
      identity,
      account,
      userInfo,
    };
  },
  {
    enabled: true, // 是否开启数据缓存
    key: "userInfo", // 缓存数据的唯一标识
    storage: localStorage,
  }
);
```