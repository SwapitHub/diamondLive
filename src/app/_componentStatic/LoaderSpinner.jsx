
function LoaderSpinner() {
  return (
    <div className="sweet-loading">
       <div className="loader">
      <object
        type="image/svg+xml"
        data={`https://assets.rocksama.com/public/Animated-Loader.svg`}
        width="100"
        height="100"
      >
       
      </object>
    </div>
      {/* <img src='./images/loader.gif' alt="loading-icon"/> */}
    </div>
  );
}

export default LoaderSpinner;
