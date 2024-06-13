// src/components/atoms/TidioScriptLoader.ts

const loadTidioScript = () => {
    const script = document.createElement('script');
    // <script src="//code.tidio.co/dafzjbzxsdhkf0s2bvuqsiuutw6bwos8.js" async></script>
    script.src = '//code.tidio.co/dafzjbzxsdhkf0s2bvuqsiuutw6bwos8.js'; // 
    script.async = true;
    document.body.appendChild(script);
  };
  
  export default loadTidioScript;
  