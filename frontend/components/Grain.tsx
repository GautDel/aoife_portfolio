"use client";
import {useRef, useEffect} from 'react'

export default function Grain() {
    let canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = canvas.height = 128

    resize();
    window.onresize = resize;

    function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio
    canvas.height = window.innerHeight * window.devicePixelRatio
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    }

    let delta = 50;
    let  oldTime = 0;
    



    function loop(currentTime) {
        if(oldTime === 0) {
            oldTime = currentTime;
        }

        if((currentTime - oldTime) >= delta){
            oldTime = currentTime;
        }

        requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

  }, []);

function setMouseCoords(e) {
        const mouse = {
            x: e.clientX,
            y: e.clientY
        } 
        console.log(mouse.x, mouse,y)
    }


    return(
        <canvas ref={canvasRef} onMouseMove={e => setMouseCoords(e)} width="900" height="700" className='border bg-black absolute left-0 top-0'></canvas>
    )
}
