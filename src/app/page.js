import TextAreaComponent from "@/components/TextArea";
import ResponseMessage from "@/components/ResponseMessage";


export default function Home() {
  return (
    <div className="m-36 gap-4">
      <ResponseMessage />
      <TextAreaComponent />
    </div>

  );
}
 