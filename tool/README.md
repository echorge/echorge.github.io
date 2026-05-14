# URL 编码/解码工具

这个工具提供了 URL 编码和解码的功能，支持单个组件编码和完整 URL 编码两种方式。

## 文件结构

```
tool/
├── urlCodec.js    # 核心编码解码库
├── index.html     # Web 交互界面
└── README.md      # 本文件
```

## 功能说明

### 1. 核心库 (urlCodec.js)

提供四个主要方法：

#### `encode(str)`
- **功能**: 对字符串进行 URL 编码（编码所有特殊字符）
- **参数**: 输入字符串
- **返回**: URL 编码后的字符串
- **例子**: 
  ```javascript
  urlCodec.encode("hello world") 
  // 返回: "hello%20world"
  
  urlCodec.encode("特殊&符号")
  // 返回: "%E7%89%B9%E6%AE%8A%26%E7%AC%A6%E5%8F%B7"
  ```

#### `decode(str)`
- **功能**: 对 URL 编码后的字符串进行解码
- **参数**: URL 编码的字符串
- **返回**: 解码后的原始字符串
- **例子**:
  ```javascript
  urlCodec.decode("hello%20world")
  // 返回: "hello world"
  ```

#### `encodeURL(url)`
- **功能**: 对完整 URL 进行编码（保留 URL 结构，仅编码必要部分）
- **参数**: 完整的 URL 字符串
- **返回**: 编码后的 URL
- **例子**:
  ```javascript
  urlCodec.encodeURL("https://example.com/path?q=hello world")
  // 返回: "https://example.com/path?q=hello%20world"
  ```

#### `decodeURL(url)`
- **功能**: 对编码的完整 URL 进行解码
- **参数**: 编码后的 URL
- **返回**: 原始 URL
- **例子**:
  ```javascript
  urlCodec.decodeURL("https://example.com/path?q=hello%20world")
  // 返回: "https://example.com/path?q=hello world"
  ```

## 使用方式

### 方式 1: 在浏览器中使用

打开 `index.html` 文件，使用图形界面进行编码和解码操作：

1. **组件方式**: 用于编码/解码单个 URL 参数或字符串
2. **完整 URL 方式**: 用于编码/解码完整的 URL

### 方式 2: 在 Node.js 中使用

```javascript
const urlCodec = require('./urlCodec.js');

// 编码
const encoded = urlCodec.encode("hello world");
console.log(encoded); // "hello%20world"

// 解码
const decoded = urlCodec.decode(encoded);
console.log(decoded); // "hello world"
```

### 方式 3: 在网页中引入

```html
<script src="tool/urlCodec.js"></script>
<script>
  const result = urlCodec.encode("test");
  console.log(result);
</script>
```

## 编码规则

### 组件编码 (encodeURIComponent)
- 编码所有特殊字符
- 适用于 URL 参数、查询字符串等单个组件
- 保留的字符: `A-Z a-z 0-9 - _ . !  ~ * ' ( )`

### 完整 URL 编码 (encodeURI)
- 仅编码 URL 中的特殊字符
- 保留 URL 结构（如 `:`, `/`, `?`, `&`, `=` 等）
- 适用于完整的 URL 字符串

## 示例

### 编码示例

```
输入: "中文测试 & 特殊符号"
输出: "%E4%B8%AD%E6%96%87%E6%B5%8B%E8%AF%95%20%26%20%E7%89%B9%E6%AE%8A%E7%AC%A6%E5%8F%B7"
```

### 解码示例

```
输入: "hello%20world%20%26%20test"
输出: "hello world & test"
```

## 特点

✅ 支持中文和各种 Unicode 字符  
✅ 提供两种编码方式（组件级和 URL 级）  
✅ 包含错误处理  
✅ 支持浏览器和 Node.js 环境  
✅ 简洁易用的 Web 界面  
✅ 一键复制功能  

## 错误处理

所有方法都包含验证和错误处理：

```javascript
try {
  const result = urlCodec.decode("invalid%");
} catch (e) {
  console.error("解码失败:", e.message);
}
```

## 许可证

MIT
