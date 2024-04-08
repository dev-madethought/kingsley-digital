# Made Thought - Kingsley Digital

## Detect user language

```jsx
useEffect(() => {
  const detectLanguage = () => {
    const userLanguage = navigator.language || navigator.userLanguage
    const isKorean = userLanguage.includes("ko")
    console.log("is korean", isKorean)
  }

  detectLanguage()
}, [])
```
