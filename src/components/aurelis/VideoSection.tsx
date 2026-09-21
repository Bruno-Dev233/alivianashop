import video from "@/assets/video-cream345.mp4.asset.json";

export function VideoSection() {
  return (
    <section className="mt-10">
      <h2 className="text-center font-display text-2xl font-bold leading-tight sm:text-3xl">
        Cansada de manchas e marcas de acne?
        <br />
        <span className="text-primary">Conheça o Cream 345 da Aurelis.</span>
      </h2>

      <div className="mx-auto mt-5 w-full max-w-[26rem] overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <video
          className="block h-auto w-full"
          src={video.url}
          controls
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
}
