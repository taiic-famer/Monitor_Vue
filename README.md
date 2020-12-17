# Monitor_vue

### 1、项目克隆

```
git clone https://github.com/taiic-famer/Monitor_Vue.git
```

### 2、第三方插件安装

MQTT：
进入mqtt目录```cd mqtt```安装插件 ```npm i```

Web服务器
进入server目录```cd server ``` 安装插件 ```npm i```

Vue前端
进入vueclient目录```cd vueclient ``` 安装插件 ```npm i```


### 3、运行mqtt服务器

```cd mqtt ```

将目录node_modules\jsonschema\lib下的validator.js文件107行throw new SchemaError('Expected `schema` to be an object or boolean');注释掉

```npm mqtt.js```

### 4、运行Web服务器

```cd server ```

```npm run serve ```

### 5、运行vue前端

```cd vueclient ```

```npm run dev ```

### 6、运行mqtt客户端模拟无人机
```cd mqtt```

```node publish1.js ```

```node publish2.js ```

...
