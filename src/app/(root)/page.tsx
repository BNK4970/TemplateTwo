
export default async function Home() {
  return (
    <section className="grid grid-rows-[100vh_auto] h-fit">
      <main className="relative flex-1 flex flex-col items-center justify-center">
        <div className="absolute top-0 inset-0 z-[-2] h-full w-full bg-transparent bg-[radial-gradient(rgb(var(--color-primary),1)_1px,transparent_1px)] bg-[size:5rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_60vw_at_10%_-40%,rgb(var(--color-primary),0.1),#000)] px-[15%] py-40">
            <div className="z-10">
              {/* hero */}
              <h1 className="text-4xl font-bold">Discover your technology</h1>
            </div>
          </div>
        </div>
      </main>
      <section className="w-full h-fit px-[15%]">{/* after hero */}</section>
    </section>
  );
}
