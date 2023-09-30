import React, { useState, useEffect, useRef } from "react";

function App() {
  const pi =
    "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989    ";
  const canvasRef = useRef(null);
  let _x = 0;
  let _y = 0;
  let piIndex = 0;
  const [active, setActive] = useState(false);
  let isTouch = false;

  function MouseMoveHandler(e) {
    console.log(e);
    if (isTouch && !e.touches) return;

    let x = e.clientX;
    let y = e.clientY;
    if (e.touches) {
      isTouch = true;
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }

    console.log(x, y, active);
    if (!active) return;

    if (Math.pow(Math.abs(x - _x), 2) + Math.pow(Math.abs(y - _y), 2) > 500) {
      _x = x;
      _y = y;
      const canvas = canvasRef.current;
      var ctx = canvas.getContext("2d");
      // write pi digit
      ctx.font = "16px Inter";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(pi[piIndex], x, y);
      piIndex = (piIndex + 1) % pi.length;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, false);
  }, []);

  function handleClick() {
    console.log(!active);
    setActive(!active);
    if (!active) {
      const canvas = canvasRef.current;
      var ctx = canvas.getContext("2d");
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  }

  return (
    <div
      className="absolute w-screen h-screen select-none"
      onMouseMove={MouseMoveHandler}
      onTouchMove={MouseMoveHandler}
      onClick={handleClick}
    >
      <div
        className={
          "relative flex flex-col min-h-screen items-center justify-center" +
          (active ? " z-0" : " z-40")
        }
      >
        <div
          className={
            "text-5xl p-4 rounded-lg cursor-pointer text-center text-black z-30" +
            (active
              ? " bg-gray-100 opacity-20 text-opacity-20"
              : " shadow-2xl bg-white opacity-100 text-opacity-100")
          }
          style={{
            transitionTimingFunction: "ease-in-out",
            transitionDuration: "1s",
            transitionProperty: "all",
            // transform: active ? "translateY(100%)" : "translateY(0)",
          }}
        >
          <h1>Cursor Pi</h1>
        </div>
        <div
          className={
            "p-2 m-10 text-base rounded-lg bg-white z-20 active:shadow-inner" +
            (active ? " opacity-0" : " opacity-100")
          }
          style={{
            transitionTimingFunction: "ease-out",
            transitionDuration: "1s",
            transitionProperty: "all",
            transform: active ? "translateY(-200%)" : "translateY(0)",
          }}
        >
          by{" "}
          <a
            href="https://github.com/dnhuan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
            onClick={(e) => e.stopPropagation()}
          >
            <i class="fab fa-github"></i> dnhuan
          </a>{" "}
          |{" "}
          <a
            href="https://linkedin.com/in/huand"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fab fa-linkedin"></i> huand
          </a>
        </div>
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block">
          Your browser does not support the HTML canvas tag.
        </canvas>
      </div>
    </div>
  );
}

export default App;
