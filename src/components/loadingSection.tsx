import Loading from "react-loading";

export default function LoadingSection() {
  return (
    <section className="flex items-center justify-center h-[80vh]">
      <Loading type="spin" color="#e96f1b" height={80} width={80}  />
    </section>
  );
}

export function LoadingSpinner() {
  return <Loading type="spin" color="#e96f1b" height={20} width={20} />;
}
