import { LoremIpsum } from "react-lorem-ipsum";

export default function About() {
  return (
    <>
      <div className="flex flex-col justify-center items-center mx-auto mt-4 mb-4 w-full sm:w-3/4 lg:w-1/2 px-4">
        <p className="mb-4">
          Hey there! I'm Joseph, I'm the developer behind GPT-Buddy. I created
          this tool out of my fascination with AI and a desire to make the
          incredible language models from OpenAI more accessible to everyone.{" "}
        </p>

        <p className="mb-4">
          In a nutshell, GPT-Buddy is a simple interface that lets you send
          prompts to OpenAI's language models. The current version uses
          GPT-3.5-Turbo You type in your text input, send off the request, and
          the AI will return with a generated output.
        </p>
        <p className="mb-4">
          The goal here is to keep things straightforward and user-friendly,
          letting you interact with AI technology without any fuss. So go ahead,
          give GPT-Buddy a try and explore the intriguing world of AI!
        </p>
      </div>
    </>
  );
}
