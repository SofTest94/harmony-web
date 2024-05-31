// src/components/atoms/TidioScriptLoader.ts

const loadTidioScript = () => {
    const script = document.createElement('script');
    // <script src="//code.tidio.co/dafzjbzxsdhkf0s2bvuqsiuutw6bwos8.js" async></script>
    script.src = '//code.tidio.co/dafzjbzxsdhkf0s2bvuqsiuutw6bwos8.js'; // Reemplaza 'TU_ID_DE_TIDIO' con tu ID de Tidio
    script.async = true;
    document.body.appendChild(script);
  };
  
  export default loadTidioScript;
  