import { SectionId } from "../interfaces";
import React from "react";
import useContext from "./StateContextProvider/useContext";

export default function Footer() {
  const { goToPage, activeLink } = useContext();
  return (
    <footer className="fixed bottom-0 left-0 right-0  text-center w-full">
      <div className="w-full bg-kimwhite flex justify-between items-center text-kimred p-4 md:hidden">
        {
          navigator.map(({text, icon}) => (
            <div key={text} className={`text-xs border border-kimred border-opacity-30 rounded-full h-14 w-14 font-medium cursor-pointer ${activeLink === text && "bg-kimred text-kimwhite "}`} onClick={() => goToPage(text)}>
              <span className="inline-flex">{ icon }</span>
              <h3>{ text }</h3>
            </div>
          ))
        }
      </div>
    </footer>
  )
}

export const navigator : Array<{text: SectionId, icon: React.ReactNode}> = [
  {
    text: "Home",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>,
  },
  {
    text: "Sell",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>    
  },
  {
    text: "Profile",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>    
  },
]
  