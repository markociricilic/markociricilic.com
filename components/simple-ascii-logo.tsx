"use client"

export function SimpleAsciiLogo() {
  return (
    <pre className="font-mono text-white text-xs sm:text-sm md:text-base whitespace-pre bg-black p-2 overflow-x-auto">
      {`
 __  __    _    ____  _  _____     ____ ___ ____  ___ ____ 
|  \\/  |  / \\  |  _ \\| |/ / _ \\   / ___|_ _|  _ \\|_ _/ ___|
| |\\/| | / _ \\ | |_) | ' / | | | | |    | || |_) || | |    
| |  | |/ ___ \\|  _ <| . \\ |_| | | |___ | ||  _ < | | |___ 
|_|  |_/_/   \\_\\_| \\_\\_|\\_\\___/   \\____|___|_| \\_\\___\\____|
                                                           
`}
    </pre>
  )
}

