import Loader from "@/components/loading";

export default function Loading() {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <Loader />
    </div>
  );
}
