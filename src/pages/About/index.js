import { LoremIpsum } from "react-lorem-ipsum";

export default function About(){
  return <>
    <div className="flex flex-col justify-center items-center mx-auto mt-4 mb-4 w-full sm:w-3/4 lg:w-1/2 px-4">
    <h2><LoremIpsum/></h2>
    </div>
  </>;
}