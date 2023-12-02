"use client";
import { useEffect, useState } from "react"

export default function Clock() {
    const [seconds, setSeconds] = useState(0o0)
    const [minutes, setMinutes] = useState(0o0)
    const [hours, setHours] = useState(0o0)
    const updateTime=()=>{
    let  time =  new Date()
    setSeconds(time.getSeconds())
    setMinutes(time.getMinutes())
    setHours(time.getHours())
  }
    setInterval(updateTime, 1000)
    return (
        <p className="absolute lg:static top-5  lg:translate-y-1 text-xl flex items-center z-50 font-semibold">
            <span className="text-white mr-1">{`${hours < 10 ? "0" + hours : hours}`}</span>
            <span className="-translate-y-[2px] text-white">:</span>
            <span className="text-white mx-1">{`${minutes < 10 ? "0" + minutes : minutes}`}</span>
            <span className="-translate-y-[2px] text-white">:</span>
            <span className="ml-1 text-orange-400 font-bold">{ `${seconds < 10 ? "0" + seconds : seconds}`}</span>

        </p>
    )
}
